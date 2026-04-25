import React, { useState, useMemo, useRef, useEffect } from "react";
import * as S from "../styles/Booth.style";
import BoothMapComponent from "../components/Booth/BoothMapComponent";
import BoothInfoComponent from "../components/Booth/BoothInfoComponent";
import BoothModalComponent from "../components/Booth/BoothModalComponent";

import daySelected from "../assets/Booth/DaySelected.svg";
import dayUnselected from "../assets/Booth/DayUnselected.svg";
import nightSelected from "../assets/Booth/NightSelected.svg";
import nightUnselected from "../assets/Booth/NightUnselected.svg";
import randomIcon from "../assets/Booth/RandomBooth.svg";

const DAYS_DATA = [
  { id: 1, date: "13일", dayOfWeek: "수" },
  { id: 2, date: "14일", dayOfWeek: "목" },
  { id: 3, date: "15일", dayOfWeek: "금" },
];

const BOOTH_DATA = [
  {
    id: 1,
    name: "오세요 잡화점오세요 잡화점오세요 잡화점오세요 잡화점",
    category: "판매",
    operator: "운영진",
    description:
      "부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게",
    status: "운영 중" as const,
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
  const [targetBooth, setTargetBooth] = useState<any | null>(null);

  const handleOpenModal = (booth: any) => {
    setTargetBooth(booth);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setSelectedId(null);
  }, [activeDay]);

  const handleNavigateToMap = (id: number) => {
    setIsModalOpen(false);
    setSelectedId(id);
    setTimeout(() => {
      if (mapSectionRef.current) {
        mapSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 10);
  };

  const filteredBooths = useMemo(() => {
    return isOperatingOnly
      ? BOOTH_DATA.filter((b) => b.status === "운영 중")
      : BOOTH_DATA;
  }, [isOperatingOnly]);

  return (
    <S.PageWrapper ref={mapSectionRef}>
      <S.DayNav>
        {DAYS_DATA.map((d) => (
          <S.DayTab
            key={d.id}
            $active={activeDay === d.id}
            onClick={() => setActiveDay(d.id)}
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
        <S.TimeFilter>
          <S.TimeButtonGroup>
            <S.TimeOption $active={!isNight} onClick={() => setIsNight(false)}>
              <img src={!isNight ? daySelected : dayUnselected} alt="day" />
              <span>낮</span>
            </S.TimeOption>
            <S.TimeOption $active={isNight} onClick={() => setIsNight(true)}>
              <img
                src={isNight ? nightSelected : nightUnselected}
                alt="night"
              />
              <span>밤</span>
            </S.TimeOption>
          </S.TimeButtonGroup>
          <S.TimeText>{isNight ? "15:00~17:30" : "11:00~14:30"}</S.TimeText>
        </S.TimeFilter>

        <S.RandomFloatBtn onClick={() => {}}>
          <img src={randomIcon} alt="random" />
          <span>랜덤 추천</span>
        </S.RandomFloatBtn>

        <BoothMapComponent
          day={activeDay}
          selectedId={selectedId}
          onBoothClick={setSelectedId}
          booths={BOOTH_DATA}
        />
      </S.MapHugger>

      <S.ListSection>
        <S.BoothList>부스 리스트</S.BoothList>
        <S.BoothCur>
          <S.BoothAmount>총 {filteredBooths.length}개</S.BoothAmount>의 부스
        </S.BoothCur>
        <S.FilterButton
          $active={isOperatingOnly}
          onClick={() => setIsOperatingOnly(!isOperatingOnly)}
        >
          운영 중
        </S.FilterButton>
        {filteredBooths.map((booth) => (
          <BoothInfoComponent
            key={booth.id}
            booth={booth}
            onDetailClick={() => handleOpenModal(booth)} // 자세히보기 클릭 핸들러 전달
          />
        ))}
      </S.ListSection>
      {isModalOpen && (
        <BoothModalComponent
          booth={targetBooth}
          onClose={() => setIsModalOpen(false)}
          onNavigateToMap={handleNavigateToMap}
        />
      )}
    </S.PageWrapper>
  );
};

export default BoothPage;
