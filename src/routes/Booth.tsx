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
  // 운영 중 필터 상태
  const [isOperatingOnly, setIsOperatingOnly] = useState(false);

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
        <BoothMapComponent />
      </S.MapHugger>

      <S.MapInfoText>
        지도 위에서 부스를 클릭하면 자세한 정보를 볼 수 있습니다.
      </S.MapInfoText>

      <S.ListSection>
        <S.BoothList>부스 리스트</S.BoothList>
        <S.BoothCur>
          <S.BoothAmount>총 52개</S.BoothAmount>의 부스
        </S.BoothCur>

        {/* 필터 버튼 추가 */}
        <S.FilterButton
          $active={isOperatingOnly}
          onClick={() => setIsOperatingOnly(!isOperatingOnly)}
        >
          운영 중
        </S.FilterButton>

        {/* 필터 로직 예시: 운영 중만 보기 활성화 시 "운영 중"인 부스만 렌더링 */}
        <BoothInfoComponent
          booth={{
            id: 1,
            name: "오세요 잡화점",
            category: "판매",
            operator: "부스운영진 이름",
            description:
              "부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게",
            status: "운영 중",
          }}
        />

        {/* 필터가 꺼져있을 때만 보여줌 (예시용 조건부 렌더링) */}
        {!isOperatingOnly && (
          <>
            <BoothInfoComponent
              booth={{
                id: 2,
                name: "가세요 잡화점",
                category: "판매",
                operator: "부스운영진 이름",
                description:
                  "부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게",
                status: "운영 예정",
              }}
            />
            <BoothInfoComponent
              booth={{
                id: 3,
                name: "다시오세요 잡화점",
                category: "판매",
                operator: "부스운영진 이름",
                description:
                  "부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게 부스에 관한 설명이 들어가는 텍스트 자리입니다 텍스트가 이렇게",
                status: "운영 종료",
              }}
            />
          </>
        )}
      </S.ListSection>
    </S.PageWrapper>
  );
};

export default BoothPage;
