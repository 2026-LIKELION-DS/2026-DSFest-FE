import React, { useState } from "react";
import * as S from "../styles/Booth.style";
import BoothMapComponent from "../components/BoothMapComponent";
import BoothInfoComponent from "../components/BoothInfoComponent";

const BoothPage: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <S.PageWrapper>
      <S.DayNav>
        {[1, 2, 3].map((d) => (
          <S.DayTab
            key={d}
            $active={activeDay === d}
            onClick={() => setActiveDay(d)}
          >
            <span className="label">DAY {d}</span>
            <span className="date">{12 + d}일</span>
          </S.DayTab>
        ))}
      </S.DayNav>

      <BoothMapComponent />

      <div style={{ padding: "20px" }}>
        <h2 style={{ fontSize: "20px" }}>부스 리스트</h2>
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
      </div>
    </S.PageWrapper>
  );
};

export default BoothPage;

// 모든 인라인 스타일들 다 스타일시트로 옮기기
