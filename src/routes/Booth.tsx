import React, { useState } from "react";
import * as S from "../styles/Booth.style";
import BoothMapComponent from "../components/BoothMapComponent";
import BoothInfoComponent from "../components/BoothInfoComponent";

const DAYS_DATA = [
  { id: 1, date: "13일", dayOfWeek: "수" },
  { id: 2, date: "14일", dayOfWeek: "목" },
  { id: 3, date: "15일", dayOfWeek: "금" },
];

const BoothPage: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);

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

      <BoothMapComponent />

      <S.ListSection>
        <h2>부스 리스트</h2>
        <BoothInfoComponent
          booth={{
            id: 1,
            name: "오세요 잡화점",
            category: "판매",
            operator: "부스운영진",
            description: "설명 텍스트입니다...",
            status: "운영 중",
          }}
        />
      </S.ListSection>
    </S.PageWrapper>
  );
};

export default BoothPage;
