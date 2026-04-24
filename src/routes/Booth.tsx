import React, { useState, useMemo } from "react";
import * as S from "../styles/Booth.style";
import BoothMapComponent from "../components/BoothMapComponent";
import BoothInfoComponent from "../components/BoothInfoComponent";

import daySelected from "../assets/DaySelected.svg";
import dayUnselected from "../assets/DayUnselected.svg";
import nightSelected from "../assets/NightSelected.svg";
import nightUnselected from "../assets/NightUnselected.svg";
import randomIcon from "../assets/RandomBooth.svg";

const DAYS_DATA = [
  { id: 1, date: "13일", dayOfWeek: "수" },
  { id: 2, date: "14일", dayOfWeek: "목" },
  { id: 3, date: "15일", dayOfWeek: "금" },
];

const BOOTH_DATA = [
  {
    id: 1,
    name: "오세요 잡화점",
    category: "판매",
    operator: "부스운영진 이름",
    description:
      "부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게",
    status: "운영 중" as const,
  },
  {
    id: 2,
    name: "가세요 잡화점",
    category: "판매",
    operator: "부스운영진 이름",
    description:
      "부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게",
    status: "운영 예정" as const,
  },
  {
    id: 3,
    name: "다시오세요 잡화점",
    category: "판매",
    operator: "부스운영진 이름",
    description:
      "부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게",
    status: "운영 종료" as const,
  },
];

const BoothPage: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [isOperatingOnly, setIsOperatingOnly] = useState(false);
  const [isNight, setIsNight] = useState(false); // 낮/밤 상태

  const filteredBooths = useMemo(() => {
    if (isOperatingOnly) {
      return BOOTH_DATA.filter((booth) => booth.status === "운영 중");
    }
    return BOOTH_DATA;
  }, [isOperatingOnly]);

  // 랜덤 추천 핸들러, 이후 모달 받아 구현 예정
  const handleRandomRecommend = () => {};

  return (
    <S.PageWrapper>
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
              <div>({d.dayOfWeek})</div>
            </S.DateText>
          </S.DayTab>
        ))}
      </S.DayNav>

      <S.MapHugger>
        <S.TimeFilter>
          <S.TimeOption $active={!isNight} onClick={() => setIsNight(false)}>
            <img src={!isNight ? daySelected : dayUnselected} alt="day" />
            <span>낮</span>
          </S.TimeOption>
          <S.TimeOption $active={isNight} onClick={() => setIsNight(true)}>
            <img src={isNight ? nightSelected : nightUnselected} alt="night" />
            <span>밤</span>
          </S.TimeOption>
        </S.TimeFilter>

        {/* 랜덤 추천 버튼 */}
        <S.RandomFloatBtn onClick={handleRandomRecommend}>
          <img src={randomIcon} alt="random" />
          <span>랜덤 추천</span>
        </S.RandomFloatBtn>

        <BoothMapComponent day={activeDay} />
      </S.MapHugger>

      <S.MapInfoText>
        지도 위에서 부스를 클릭하면 자세한 정보를 볼 수 있습니다.
      </S.MapInfoText>

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
          <BoothInfoComponent key={booth.id} booth={booth} />
        ))}
      </S.ListSection>
    </S.PageWrapper>
  );
};

export default BoothPage;
