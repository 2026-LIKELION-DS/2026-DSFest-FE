import React, { useState, useMemo, useRef, useEffect } from "react";
import { trackEvent } from "../utils/analytics";
import { useSearchParams } from "react-router-dom";

import * as S from "../styles/Booth.style";
import BoothMapComponent from "../components/Booth/BoothMapComponent";
import BoothInfoComponent from "../components/Booth/BoothInfoComponent";
import BoothModalComponent from "../components/Booth/BoothModalComponent";
import Modal from "../components/Common/ModalComponent";

import noticeListData from "../data/NoticeJson/NoticesDetail.json";
import boothMapData from "../data/BoothJson/boothMap.json";
import boothsDetailData from "../data/BoothJson/boothsDetail.json";

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

interface MapBoothItem {
  boothId: number;
  boothNumber: number;
  name: string;
  positionNumber: number;
  operatingSubject: string;
  thumbnailUrl: string | null;
  boothTypes: string[];
}

interface BoothMapData {
  [key: string]: {
    DAY: MapBoothItem[];
    NIGHT: MapBoothItem[];
  };
}

interface Booth {
  id: number;
  boothId?: number;
  boothNumber: number;
  positionNumber: number;
  name: string;
  boothTypes: string[];
  operatingSubject: string;
  thumbnailUrl?: string | null;
  tags: string[];
  operatingTimes?: string[];
  description: string;
  categories?: string[];
  imageUrls?: (string | null)[];
  openKakaoUrl?: string | null;
  everytimeUrl?: string | null;
  instagramUrl?: string | null;
  status?: "운영 중" | "운영 예정" | "운영 종료";

  category?: string;
  operator?: string;
  images?: (string | null)[];
}

interface Notice {
  id: number;
  title: string;
  content: string;
  imageUrls: string[];
}

const BoothPage: React.FC = () => {
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollTo(0, 0);
    }
    const appContainer = document.querySelector(
      "[data-app-container]",
    ) as HTMLElement;
    if (appContainer) {
      appContainer.scrollTo(0, 0);
    }
  }, []);

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
  const [isRandomSelection, setIsRandomSelection] = useState(false);

  const handleOpenNotice = () => {
    try {
      const targetNotice = noticeListData.find((n) => n.id === 5);

      if (targetNotice) {
        setNoticeData({
          id: targetNotice.id,
          title: targetNotice.title,
          content: targetNotice.content,
          imageUrls: targetNotice.imageUrls,
        });
        setIsNoticeOpen(true);
      } else {
        console.error("5번 공지사항을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("공지사항 로드 실패", error);
    }
  };

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();

    if (year >= 2026 && month >= 5 && date > 15) {
      setActiveDay(1);
      setIsNight(false);
      return;
    }

    const dayParam = searchParams.get("day");
    if (dayParam) {
      setActiveDay(Number(dayParam));
    } else {
      if (year === 2026 && month === 5) {
        if (date <= 13) setActiveDay(1);
        else if (date === 14) setActiveDay(2);
        else if (date === 15) setActiveDay(3);
      }
    }
    const timeParam = searchParams.get("time");
    if (!timeParam) {
      if (hours >= 15) setIsNight(true);
      else setIsNight(false);
    } else {
      setIsNight(timeParam === "night");
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    try {
      const timeKey = isNight ? "NIGHT" : "DAY";
      const dayKey = String(activeDay) as "1" | "2" | "3";

      const typedMapData = boothMapData as unknown as BoothMapData;
      const currentMapList = typedMapData[dayKey]?.[timeKey] || [];
      const detailPool = boothsDetailData.DAY || [];

      const integratedBooths = currentMapList
        .map((mapBooth) => {
          const detailItem = detailPool.find(
            (d) => d.result.id === mapBooth.boothId,
          );
          if (!detailItem) return null;

          const res = detailItem.result;
          return {
            ...res,
            id: res.id,
            positionNumber: mapBooth.positionNumber,
            status: res.tags?.includes("운영중") ? "운영 중" : "운영 종료",
          } as Booth;
        })
        .filter((b): b is Booth => b !== null);

      setBooths(integratedBooths);
    } catch (error) {
      console.error("로컬 데이터 로드 실패", error);
    } finally {
      setLoading(false);
    }
  }, [activeDay, isNight]);

  const { operatingBooths, upcomingBooths, allBoothsForList } = useMemo(() => {
    const baseList = [...booths].sort(
      (a, b) => (a.positionNumber || 999) - (b.positionNumber || 999),
    );

    return {
      operatingBooths: baseList.filter((booth) =>
        booth.tags?.includes("운영중"),
      ),
      upcomingBooths: baseList.filter((booth) =>
        booth.tags?.includes("운영 예정"),
      ),
      allBoothsForList: baseList,
    };
  }, [booths]);

  const displayBooths = isOperatingOnly ? operatingBooths : allBoothsForList;

  const boothCounts = useMemo(() => {
    const counts = { 예정: 0, 운영중: 0, 종료: 0 };
    booths.forEach((booth) => {
      const tags = booth.tags || [];
      if (tags.includes("운영중")) counts.운영중++;
      else if (tags.includes("운영 예정")) counts.예정++;
      else counts.종료++;
    });
    return counts;
  }, [booths]);

  const handleOpenModal = (boothId: number, posNum: number) => {
    const detailPool = boothsDetailData.DAY || [];
    const detailItem = detailPool.find((d) => d.result.id === boothId);

    if (detailItem) {
      const detailData = detailItem.result;
      const statusFromTags = detailData.tags?.includes("운영중")
        ? "운영 중"
        : detailData.tags?.includes("운영 예정")
          ? "운영 예정"
          : "운영 종료";

      const updatedBooth: Booth = {
        ...detailData,
        positionNumber: posNum,
        status: statusFromTags as "운영 중" | "운영 예정" | "운영 종료",
        category:
          detailData.categories?.join(", ") ||
          detailData.boothTypes?.join(", "),
        operator: detailData.operatingSubject,
        images: detailData.imageUrls,
        description: detailData.description,
        thumbnailUrl: detailData.imageUrls?.[0] || null,
      };

      setTargetBooth(updatedBooth);
      setIsModalOpen(true);
    } else {
      console.error("해당 부스의 상세 정보 정보를 찾을 수 없습니다.");
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
    setIsRandomSelection(false);
    setSelectedId(id);
    if (id === null) return;
    trackEvent("booth_numbering_used");
    const target = booths.find((b) => (b.boothId || b.id) === id);
    handleOpenModal(id, target?.positionNumber || 0);
  };

  const handleRandomRecommend = () => {
    alert("현재 운영 중인 추천 부스가 없습니다.");
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
    const getCategory = () => {
      const source = booth.categories?.length
        ? booth.categories
        : booth.boothTypes;
      const cat = source?.find((c) => c !== "DAY" && c !== "NIGHT");
      return cat || "체험";
    };

    const getStatusFromTags = (tags?: string[]) => {
      if (!tags) return "운영 종료";
      if (tags.includes("운영중")) return "운영 중";
      if (tags.includes("운영 예정")) return "운영 예정";
      return "운영 종료";
    };

    const mappedBooth = {
      id: booth.id,
      boothNumber: booth.boothNumber,
      positionNumber: booth.positionNumber,
      name: booth.name,
      category: getCategory(),
      operator: booth.operatingSubject,
      status: getStatusFromTags(booth.tags) as
        | "운영 중"
        | "운영 예정"
        | "운영 종료",
      description: booth.description || "상세 설명이 없습니다.",
      images: (booth.imageUrls || []).filter(
        (img): img is string => img !== null,
      ),
    };

    return (
      <BoothInfoComponent
        key={`${booth.boothId || booth.id}-${booth.positionNumber}`}
        booth={mappedBooth}
        onDetailClick={() => {
          setIsRandomSelection(false);
          handleOpenModal(booth.boothId || booth.id, booth.positionNumber);
        }}
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
      </S.PageWrapper>
      {isModalOpen && targetBooth && (
        <BoothModalComponent
          isNight={isNight}
          isRandom={isRandomSelection}
          booth={{
            ...targetBooth,
            positionNumber: targetBooth.positionNumber,
            boothNumber: targetBooth.boothNumber,
            category: targetBooth.category || "기타",
            operator: targetBooth.operator || "운영진",
            status: targetBooth.status || "운영 종료",
            everytimeUrl: targetBooth.everytimeUrl ?? undefined,
            instagramUrl: targetBooth.instagramUrl ?? undefined,
            openKakaoUrl: targetBooth.openKakaoUrl ?? undefined,
            images: (targetBooth.imageUrls || []).filter(
              (img): img is string => img !== null,
            ),
            imageUrls: (targetBooth.imageUrls || []).filter(
              (img): img is string => img !== null,
            ),
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
    </>
  );
};

export default BoothPage;
