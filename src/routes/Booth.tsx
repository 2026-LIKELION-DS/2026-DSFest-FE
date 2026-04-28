import React, { useState, useMemo, useRef, useEffect } from "react";
import { trackEvent } from "../utils/analytics";

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
import examplePhoto from "../assets/hahyunsang_sample.svg";

const DAYS_DATA = [
  { id: 1, date: "13일", dayOfWeek: "수" },
  { id: 2, date: "14일", dayOfWeek: "목" },
  { id: 3, date: "15일", dayOfWeek: "금" },
];

type BoothStatus = "운영 중" | "운영 예정" | "운영 종료";

interface Booth {
  id: number;
  name: string;
  category: string;
  operator: string;
  description: string;
  status: BoothStatus;
}

const BOOTH_DATA: Booth[] = [
  {
    id: 1,
    name: "오세요 잡화점오세요 잡화점오세요 잡화점오세요 잡화점",
    category: "판매",
    operator: "운영진",
    description:
      "부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게",
    status: "운영 예정" as const,
  },
  {
    id: 2,
    name: "가세요 잡화점",
    category: "판매",
    operator: "운영진",
    description:
      "부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게",
    status: "운영 예정" as const,
  },
  {
    id: 3,
    name: "다시오세요 잡화점",
    category: "판매",
    operator: "운영진",
    description:
      "부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게",
    status: "운영 종료" as const,
  },
];

const BoothPage: React.FC = () => {
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const [activeDay, setActiveDay] = useState(1);
  const [isOperatingOnly, setIsOperatingOnly] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetBooth, setTargetBooth] = useState<Booth | null>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  // GA 부스 지도 -> 체류 시간 계산용
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const duration = Math.floor((Date.now() - startTime) / 1000);

      trackEvent("time_on_booth_page", {
        duration_seconds: duration,
      });
    };
  }, []);

  useEffect(() => {
    if (!showGuide) return;

    const handleGlobalClick = () => {
      setShowGuide(false);
    };

    window.addEventListener("click", handleGlobalClick, {
      once: true,
      capture: true,
    });

    return () => {
      window.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, [showGuide]);

  const noticeData = {
    title: "부스 관련 공지 제목",
    content: `공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게공지 본문이 들어가는 자리입니다. 
    
    공지 텍스트가 들어가고 이렇게공지 본문이 들어가는 자리입니다. 공지 텍스트가 들어가고 이렇게`,
    images: [examplePhoto, examplePhoto], // 공지사항용 이미지가 있다면 여기에 추가
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 0) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 0) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };

  const handleScrollToTop = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleOpenModal = (booth: Booth) => {
    setTargetBooth(booth);
    setIsModalOpen(true);
  };

  const handleNavigateToMap = (id: number) => {
    setIsModalOpen(false);
    setSelectedId(id);
    setTimeout(() => {
      if (mapSectionRef.current) {
        mapSectionRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }, 10);
  };

  const currentPeriodBooths = useMemo(() => {
    return BOOTH_DATA;
  }, []);

  const operatingBooths = useMemo(() => {
    return currentPeriodBooths.filter((b) => b.status === "운영 중");
  }, [currentPeriodBooths]);

  const displayBooths = useMemo(() => {
    const baseList = isOperatingOnly
      ? BOOTH_DATA.filter((b) => b.status === "운영 중")
      : BOOTH_DATA;

    return baseList;
  }, [isOperatingOnly]);

  const isOffHours = useMemo(() => {
    return (
      operatingBooths.length === 0 &&
      currentPeriodBooths.some((b) => b.status === "운영 예정")
    );
  }, [operatingBooths, currentPeriodBooths]);

  const handleBoothClick = (id: number | null) => {
    setSelectedId(id);
    if (id == null) return;

    trackEvent("booth_numbering_used");
    trackEvent("booth_detail_view");

    setSelectedId(id);

    const clickedBooth = BOOTH_DATA.find((b) => b.id === id);

    if (clickedBooth) {
      handleOpenModal(clickedBooth);
    }
  };
  return (
    <>
      <S.OnboardingOverlay $isVisible={showGuide}>
        <S.GuideContainer onClick={() => setShowGuide(false)}>
          <S.GuideText>
            <span>원하는 시간대의{"\n"}부스를 확인해 보세요!</span>
          </S.GuideText>
        </S.GuideContainer>
      </S.OnboardingOverlay>
      <S.HeaderToggleOverlay>
        <S.HeaderTimeOption
          $active={!isNight}
          onClick={() => {
            trackEvent("booth_filter_used");
            setIsNight(false);
            setSelectedId(null);
          }}
        >
          <img src={!isNight ? daySelected : dayUnselected} alt="낮" />
          <span>낮</span>
        </S.HeaderTimeOption>
        <S.HeaderTimeOption
          $active={isNight}
          onClick={() => {
            trackEvent("booth_filter_used");
            setIsNight(true);
            setSelectedId(null);
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

        <S.FloatingCircleBtn onClick={() => setIsNoticeOpen(true)}>
          <img src={announceIcon} alt="announce" />
        </S.FloatingCircleBtn>
      </S.FloatingButtonGroup>
      <S.PageWrapper ref={mapSectionRef} onScroll={handleScroll}>
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
                <div>{d.date}</div>
                <div>{d.dayOfWeek}</div>
              </S.DateText>
            </S.DayTab>
          ))}
        </S.DayNav>
        <S.MapHugger>
          <S.RandomFloatBtn
            onClick={() => {
              trackEvent("booth_random_navigate");
            }}
          >
            <img src={randomIcon} alt="random" />
            <span>랜덤 추천</span>
          </S.RandomFloatBtn>

          <BoothMapComponent
            day={activeDay}
            time={isNight ? "night" : "day"}
            selectedId={selectedId}
            onBoothClick={handleBoothClick}
            booths={BOOTH_DATA}
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
          {displayBooths.length > 0 ? (
            displayBooths.map((booth) => (
              <BoothInfoComponent
                key={booth.id}
                booth={booth}
                onDetailClick={() => {
                  trackEvent("booth_detail_view");
                  handleOpenModal(booth);
                }}
              />
            ))
          ) : (
            <S.EmptyStateWrapper>
              {isOffHours ? (
                <>
                  <S.EmptyMessage>
                    지금은 부스 운영시간이 아닙니다
                  </S.EmptyMessage>
                  <S.NextTimeText>
                    다음 부스 시간 : {isNight ? "11:00~14:30" : "11:00~14:30"}
                  </S.NextTimeText>
                </>
              ) : (
                <S.EmptyMessage>
                  DAY {activeDay}의 부스가 모두 종료되었습니다
                </S.EmptyMessage>
              )}
            </S.EmptyStateWrapper>
          )}
        </S.ListSection>
        {isModalOpen && targetBooth && (
          <BoothModalComponent
            booth={targetBooth}
            onClose={() => setIsModalOpen(false)}
            onNavigateToMap={handleNavigateToMap}
          />
        )}
        <Modal
          isOpen={isNoticeOpen}
          onClose={() => setIsNoticeOpen(false)}
          title={noticeData.title}
          content={noticeData.content}
          images={noticeData.images}
        />
      </S.PageWrapper>
    </>
  );
};

export default BoothPage;
