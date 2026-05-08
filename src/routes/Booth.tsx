import React, { useState, useMemo, useRef, useEffect } from "react";
import axios from "axios";
import { trackEvent } from "../utils/analytics";
// useSearchParams 추가
import { useSearchParams } from "react-router-dom";

import * as S from "../styles/Booth.style";
import BoothMapComponent from "../components/Booth/BoothMapComponent";
import BoothInfoComponent from "../components/Booth/BoothInfoComponent";
import BoothModalComponent from "../components/Booth/BoothModalComponent";
import Modal from "../components/Common/ModalComponent";

import daySelected from "../assets/Booth/DaySelected.svg";
import dayUnselected from "../assets/Booth/DayUnselected.svg";
import nightSelected from "../assets/Booth/NightSelected.svg";
import nightUnselected from "../assets/Booth/NightUnselected.svg";
import randomIcon from "../assets/Booth/RandomBooth.svg";
import announceIcon from "../assets/Booth/BoothAnnounce.svg";
import upIcon from "../assets/Booth/BoothUp.svg";

const DAYS_DATA = [
  { id: 1, date: "13일", dayOfWeek: "수" },
  { id: 2, date: "14일", dayOfWeek: "목" },
  { id: 3, date: "15일", dayOfWeek: "금" },
];

interface Booth {
  id: number;
  boothId?: number;
  boothNumber: number;
  positionNumber: number;
  name: string;
  boothTypes: string[];
  operatingSubject: string;
  thumbnailUrl: string;
  tags: string[];
  operatingTimes: string[];
  description: string;
  categories?: string[];
  imageUrls?: string[];
  openKakaoUrl?: string;
  everytimeUrl?: string;
  instagramUrl?: string;
  status?: "운영 중" | "운영 예정" | "운영 종료";
}

interface MapBoothResponse {
  boothId: number;
  positionNumber: number;
}

interface Notice {
  id: number;
  title: string;
  content: string;
  imageUrls: string[];
}

const calculateBoothStatus = (
  day: number,
  nightMode: boolean,
): "운영 중" | "운영 예정" | "운영 종료" => {
  // const now = new Date(); // 테스트 시 아래 줄 주석 해제하여 확인
  const now = new Date("2026-05-14T17:00:00");
  const festivalDates: { [key: number]: string } = {
    1: "2026-05-13",
    2: "2026-05-14",
    3: "2026-05-15",
  };

  const currentDateStr = festivalDates[day];
  if (!currentDateStr) return "운영 종료";

  const startTimeStr = nightMode ? "16:00" : "11:00";
  const endTimeStr = nightMode ? "19:30" : "14:30";

  const startTime = new Date(`${currentDateStr}T${startTimeStr}:00`);
  const endTime = new Date(`${currentDateStr}T${endTimeStr}:00`);

  if (now < startTime) return "운영 예정";
  if (now >= startTime && now <= endTime) return "운영 중";
  return "운영 종료";
};

const BoothPage: React.FC = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const mapSectionRef = useRef<HTMLDivElement>(null);
  //searchParams 추가
  const [searchParams] = useSearchParams();

  const [activeDay, setActiveDay] = useState(1);
  const [booths, setBooths] = useState<Booth[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOperatingOnly, setIsOperatingOnly] = useState(false);
  const [isNight, setIsNight] = useState(() => {
    const timeParam = searchParams.get("time");
    if (timeParam === "day") return false;
    if (timeParam === "night") return true;
    return new Date().getHours() >= 16;
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetBooth, setTargetBooth] = useState<Booth | null>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [noticeData, setNoticeData] = useState<Notice | null>(null);
  const [showGuide, setShowGuide] = useState(true);

  const handleOpenNotice = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/notices/5`);
      if (response.data.isSuccess) {
        setNoticeData(response.data.result);
        setIsNoticeOpen(true);
      }
    } catch (error) {
      console.error("공지사항 로드 실패", error);
      alert("공지사항을 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    // const now = new Date(); // 테스트 시 아래 줄 주석 해제하여 확인
    const now = new Date("2026-05-14T17:00:00");
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    // const hours = now.getHours();
    const hours = now.getHours();

    if (year === 2026 && month === 5) {
      if (date <= 13) setActiveDay(1);
      else if (date === 14) setActiveDay(2);
      else setActiveDay(3);
    } else if (year >= 2026 && month >= 5 && date > 15) {
      setActiveDay(3);
    }
    // isNight 설정 부분 제거
    // if (hours >= 16) {
    //   setIsNight(true);
    // } else {
    //   setIsNight(false);
    // }
    const timeParam = searchParams.get("time");
    if (!timeParam) {
      // 파라미터가 없을 때만 실시간 시간 반영
      if (hours >= 16) setIsNight(true);
      else setIsNight(false);
    } else {
      // 파라미터가 있다면 그 값에 맞춰 상태를 한 번 더 강제 동기화 (뒤로가기 등 대응)
      setIsNight(timeParam === "night");
    }
  }, [searchParams]);
  useEffect(() => {
    const fetchBoothsAndPositions = async () => {
      setLoading(true);
      try {
        const mapRes = await axios.get(`${baseUrl}/api/booths/map`, {
          params: { day: activeDay, type: isNight ? "NIGHT" : "DAY" },
        });

        if (mapRes.data.isSuccess) {
          const mapData = mapRes.data.result;

          const detailedBooths = await Promise.all(
            mapData.map(async (m: MapBoothResponse) => {
              try {
                const detailRes = await axios.get(
                  `${baseUrl}/api/booths/${m.boothId}`,
                );
                if (detailRes.data.isSuccess) {
                  return {
                    ...detailRes.data.result,
                    positionNumber: m.positionNumber,
                  };
                }
                return null;
              } catch {
                return null;
              }
            }),
          );

          setBooths(detailedBooths.filter((b) => b !== null));
        }
      } catch (error) {
        console.error("데이터 통합 로드 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoothsAndPositions();
  }, [activeDay, isNight, baseUrl]);

  const { operatingBooths, upcomingBooths, allBoothsForList } = useMemo(() => {
    let baseList = booths.filter((booth) => booth.name !== "총학 운영 본부");
    baseList = [...baseList].sort(
      (a, b) => (a.positionNumber || 999) - (b.positionNumber || 999),
    );

    const currentStatus = calculateBoothStatus(activeDay, isNight);

    return {
      operatingBooths: baseList.filter(() => currentStatus === "운영 중"),
      upcomingBooths: baseList.filter(() => currentStatus === "운영 예정"),
      allBoothsForList: baseList,
    };
  }, [booths, activeDay, isNight]);

  const displayBooths = isOperatingOnly ? operatingBooths : allBoothsForList;

  const boothCounts = useMemo(() => {
    const counts = { 예정: 0, 운영중: 0, 종료: 0 };
    booths.forEach(() => {
      const status = calculateBoothStatus(activeDay, isNight);
      if (status === "운영 예정") counts.예정++;
      else if (status === "운영 중") counts.운영중++;
      else counts.종료++;
    });
    return counts;
  }, [booths, activeDay, isNight]);

  const handleOpenModal = async (boothId: number, posNum: number) => {
    try {
      const response = await axios.get(`${baseUrl}/api/booths/${boothId}`);
      if (response.data.isSuccess) {
        const detailData = response.data.result;
        const currentStatus = calculateBoothStatus(activeDay, isNight);

        setTargetBooth({
          ...detailData,
          positionNumber: posNum,
          status: currentStatus,
          category:
            detailData.categories?.join(", ") ||
            detailData.boothTypes?.join(", "),
          operator: detailData.operatingSubject,
          images: detailData.imageUrls,
          description: detailData.description,
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("상세 정보 로드 실패", error);
    }
  };

  const handleNavigateToMap = (id: number) => {
    setIsModalOpen(false);
    setSelectedId(id);
    setTimeout(() => {
      mapSectionRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 10);
  };

  const handleBoothClick = (id: number | null) => {
    setSelectedId(id);
    if (id === null) return;
    trackEvent("booth_numbering_used");
    const target = booths.find((b) => (b.boothId || b.id) === id);
    handleOpenModal(id, target?.positionNumber || 0);
  };

  const handleRandomRecommend = async () => {
    trackEvent("booth_random_recommend_click");

    try {
      const response = await axios.get(`${baseUrl}/api/booths/random`, {
        params: { day: activeDay },
      });

      if (response.data.isSuccess && response.data.result) {
        const randomBooth = response.data.result;

        setSelectedId(randomBooth.id);
        handleOpenModal(randomBooth.id, randomBooth.positionNumber);

        if (mapSectionRef.current) {
          mapSectionRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      } else {
        alert("현재 운영 중인 추천 부스가 없습니다.");
      }
    } catch (error) {
      console.error("랜덤 부스 추천 로드 실패", error);
      alert("추천 정보를 가져오는 중 오류가 발생했습니다.");
    }
  };

  const handleScrollToTop = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (showGuide) {
      const handleFirstClick = () => {
        setShowGuide(false);
        window.removeEventListener("click", handleFirstClick);
        window.removeEventListener("touchstart", handleFirstClick);
      };

      window.addEventListener("click", handleFirstClick, true);
      window.addEventListener("touchstart", handleFirstClick, true);

      return () => {
        window.removeEventListener("click", handleFirstClick);
        window.removeEventListener("touchstart", handleFirstClick);
      };
    }
  }, [showGuide]);

  const renderBoothItem = (booth: Booth) => {
    const currentStatus = calculateBoothStatus(activeDay, isNight);
    const getCategory = () => {
      const source = booth.categories?.length
        ? booth.categories
        : booth.boothTypes;
      const cat = source?.find((c) => c !== "DAY" && c !== "NIGHT");
      return cat || "체험";
    };

    const mappedBooth = {
      id: booth.id,
      boothNumber: booth.boothNumber,
      positionNumber: booth.positionNumber,
      name: booth.name,
      category: getCategory(),
      operator: booth.operatingSubject,
      status: currentStatus,
      description: booth.description || "상세 설명이 없습니다.",
      images: booth.imageUrls || [booth.thumbnailUrl],
    };

    return (
      <BoothInfoComponent
        key={`${booth.boothId || booth.id}-${booth.positionNumber}`}
        booth={mappedBooth}
        onDetailClick={() =>
          handleOpenModal(booth.boothId || booth.id, booth.positionNumber)
        }
      />
    );
  };

  return (
    <>
      <S.OnboardingOverlay
        $isVisible={showGuide}
        onClick={() => setShowGuide(false)}
      >
        <S.GuideContainer>
          <S.GuideText>
            <span>원하는 시간대의{"\n"}부스를 확인해 보세요!</span>
          </S.GuideText>
        </S.GuideContainer>
      </S.OnboardingOverlay>
      <S.HeaderToggleOverlay>
        <S.HeaderTimeOption
          $active={!isNight}
          onClick={() => {
            setIsNight(false);
            setSelectedId(null);
            trackEvent("booth_filter_used", { type: "DAY" });
          }}
        >
          <img src={!isNight ? daySelected : dayUnselected} alt="낮" />
          <span>낮</span>
        </S.HeaderTimeOption>
        <S.HeaderTimeOption
          $active={isNight}
          onClick={() => {
            setIsNight(true);
            setBooths([]);
            setSelectedId(null);
            trackEvent("booth_filter_used", { type: "NIGHT" });
          }}
        >
          <img src={isNight ? nightSelected : nightUnselected} alt="밤" />
          <span>밤</span>
        </S.HeaderTimeOption>
      </S.HeaderToggleOverlay>
      <S.FloatingButtonGroup $hasTopBtn={showTopBtn}>
        <S.FloatingCircleBtn
          onClick={handleScrollToTop}
          $isVisible={showTopBtn}
        >
          <img src={upIcon} alt="scroll to top" />
        </S.FloatingCircleBtn>
        <S.FloatingCircleBtn onClick={handleOpenNotice}>
          <img src={announceIcon} alt="announce" />
        </S.FloatingCircleBtn>
      </S.FloatingButtonGroup>
      <S.PageWrapper
        ref={mapSectionRef}
        onScroll={(e) => setShowTopBtn(e.currentTarget.scrollTop > 0)}
      >
        <S.DayNav>
          {DAYS_DATA.map((d) => (
            <S.DayTab
              key={d.id}
              $active={activeDay === d.id}
              onClick={() => {
                setActiveDay(d.id);
                setSelectedId(null);
              }}
            >
              <S.Label>DAY {d.id}</S.Label>
              <S.DateText>
                <div>{d.date}</div> <div>{d.dayOfWeek}</div>
              </S.DateText>
            </S.DayTab>
          ))}
        </S.DayNav>
        <S.MapHugger>
          <S.RandomFloatBtn onClick={handleRandomRecommend}>
            <img src={randomIcon} alt="random" /> <span>랜덤 추천</span>
          </S.RandomFloatBtn>
          <BoothMapComponent
            day={activeDay}
            time={isNight ? "night" : "day"}
            selectedId={selectedId}
            onBoothClick={handleBoothClick}
          />
        </S.MapHugger>
        <S.ListSection>
          <S.BoothList>부스 리스트</S.BoothList>
          <S.BoothCur>
            <S.BoothAmount>총 {displayBooths.length}개</S.BoothAmount>의 부스
          </S.BoothCur>
          <S.FilterButton
            $active={isOperatingOnly}
            onClick={() => setIsOperatingOnly(!isOperatingOnly)}
          >
            운영 중
          </S.FilterButton>
          {loading ? (
            <S.EmptyMessage>로딩 중...</S.EmptyMessage>
          ) : (
            <>
              {displayBooths.length > 0 ? (
                displayBooths.map(renderBoothItem)
              ) : (
                <S.EmptyStateWrapper>
                  {boothCounts.예정 > 0 ? (
                    <>
                      <S.EmptyMessage>
                        지금은 부스 운영시간이 아닙니다
                      </S.EmptyMessage>
                      <S.NextTimeText>
                        다음 부스 시간 :{" "}
                        {isNight ? "16:00~19:30" : "11:00~14:30"}
                      </S.NextTimeText>

                      <div
                        style={{
                          marginTop: "40px",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        <S.WillBoothList>운영 예정 부스</S.WillBoothList>
                        {upcomingBooths.map(renderBoothItem)}
                      </div>
                    </>
                  ) : (
                    <S.EmptyMessage>
                      DAY {activeDay}의 부스가 모두 종료되었습니다
                    </S.EmptyMessage>
                  )}
                </S.EmptyStateWrapper>
              )}
            </>
          )}
        </S.ListSection>
        {isModalOpen && targetBooth && (
          <BoothModalComponent
            isNight={isNight}
            booth={{
              ...targetBooth,
              positionNumber: targetBooth.positionNumber,
              boothNumber: targetBooth.boothNumber,
              category: targetBooth.boothTypes?.join(", ") || "기타",
              operator: targetBooth.operatingSubject || "운영진",
              images: targetBooth.imageUrls || [],
              status: calculateBoothStatus(activeDay, isNight) || "운영 종료",
            }}
            onClose={() => setIsModalOpen(false)}
            onNavigateToMap={handleNavigateToMap}
          />
        )}
        <Modal
          isOpen={isNoticeOpen}
          onClose={() => setIsNoticeOpen(false)}
          title={noticeData?.title || "부스 공지사항"}
          content={noticeData?.content || "공지사항 내용을 불러오는 중입니다."}
          images={noticeData?.imageUrls || []}
        />
      </S.PageWrapper>
    </>
  );
};

export default BoothPage;
