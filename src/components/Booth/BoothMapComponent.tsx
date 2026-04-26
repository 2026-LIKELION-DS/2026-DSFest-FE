import React, { useRef, useCallback, useLayoutEffect, useEffect } from "react";
import type { ElementRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import * as S from "../../styles/BoothMapComponent.styles";

interface Booth {
  id: number;
  name: string;
}

interface MapProps {
  day: number;
  time?: "day" | "night";
  selectedId?: number | null;
  onBoothClick?: (id: number) => void;
  booths: Booth[];
}

const BOOTH_LAYOUTS: Record<string, Record<string, number[]>> = {
  "1_day": {
    studentHall: [1],
    soyoung: [2, 3, 4],
    minju: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    youngTop: [18, 17, 16, 15, 14],
    youngLeft: [19, 20, 21, 22, 23, 24, 25],
    youngBottom: [26, 27, 28, 29, 30],
  },
  "1_night": {
    studentHall: [1],
    soyoung: [2, 3, 4],
    minju: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    youngTop: [18, 17, 16, 15, 14],
    youngLeft: [19, 20, 21, 22, 23, 24, 25],
    youngBottom: [26, 27, 28, 29, 30],
  },
  "2_day": {
    studentHall: [1],
    soyoung: [2, 3, 4],
    minju: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    youngTop: [18, 17, 16, 15, 14],
    youngLeft: [19, 20, 21, 22, 23, 24, 25],
    youngBottom: [26, 27, 28, 29, 30],
  },
  "2_night": {
    studentHall: [1],
    soyoung: [2, 3, 4],
    minju: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    youngTop: [18, 17, 16, 15, 14],
    youngLeft: [19, 20, 21, 22, 23, 24, 25],
    youngBottom: [26, 27, 28, 29, 30],
  },
  "3_day": {
    studentHall: [1],
    soyoung: [2, 3, 4],
    minju: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    youngTop: [18, 17, 16, 15, 14],
    youngLeft: [19, 20, 21, 22, 23, 24, 25],
    youngBottom: [26, 27, 28, 29, 30],
  },
  "3_night": {
    studentHall: [1],
    soyoung: [2, 3, 4],
    minju: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    youngTop: [18, 17, 16, 15, 14],
    youngLeft: [19, 20, 21, 22, 23, 24, 25],
    youngBottom: [26, 27, 28, 29, 30],
  },
};

const BoothMapComponent: React.FC<MapProps> = ({
  day = 1,
  time = "day",
  selectedId,
  onBoothClick,
  booths,
}) => {
  const currentKey = `${day}_${time}`;
  const currentLayout = BOOTH_LAYOUTS[currentKey] || {};
  const mapRef = useRef<HTMLDivElement>(null);
  const pinchZoomRef = useRef<ElementRef<typeof QuickPinchZoom>>(null);

  const onUpdate = useCallback(
    ({ x, y, scale }: { x: number; y: number; scale: number }) => {
      if (mapRef.current) {
        const value = make3dTransformValue({ x, y, scale });
        mapRef.current.style.setProperty("transform", value);
      }
    },
    [],
  );

  useEffect(() => {
    const BOOTH_POSITIONS_13KH: Record<number, { x: number; y: number }> = {
      1: { x: 529, y: 432 },

      2: { x: 805, y: 350 },
      3: { x: 805, y: 418 },
      4: { x: 805, y: 486 },

      5: { x: 711, y: 544 },
      6: { x: 711, y: 592 },
      7: { x: 711, y: 640 },
      8: { x: 711, y: 688 },
      9: { x: 711, y: 736 },
      10: { x: 711, y: 784 },
      11: { x: 711, y: 832 },
      12: { x: 711, y: 880 },
      13: { x: 711, y: 928 },

      14: { x: 1269, y: 541 },
      15: { x: 1221, y: 541 },
      16: { x: 1173, y: 541 },
      17: { x: 1125, y: 541 },
      18: { x: 1077, y: 541 },

      19: { x: 913, y: 607 },
      20: { x: 913, y: 655 },
      21: { x: 913, y: 703 },
      22: { x: 913, y: 751 },
      23: { x: 913, y: 799 },
      24: { x: 913, y: 847 },
      25: { x: 913, y: 895 },

      30: { x: 1269, y: 942 },
      29: { x: 1221, y: 942 },
      28: { x: 1173, y: 942 },
      27: { x: 1125, y: 942 },
      26: { x: 1077, y: 942 },
    };

    if (selectedId && pinchZoomRef.current && mapRef.current) {
      const targetPos = BOOTH_POSITIONS_13KH[selectedId];

      if (targetPos) {
        const container = mapRef.current.parentElement;
        if (!container) return;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const focusScale = (containerHeight / 700) * 5;

        const x =
          ((targetPos.x * focusScale) / 2 - containerWidth) /
          (focusScale - 1) /
          2;
        const y =
          ((targetPos.y * focusScale) / 2 - containerHeight) /
          (focusScale - 1) /
          2;

        pinchZoomRef.current.scaleTo({
          x,
          y,
          scale: focusScale,
          animated: true,
        });
      }
    }
  }, [selectedId, currentKey]);

  useLayoutEffect(() => {
    if (pinchZoomRef.current && mapRef.current) {
      const containerHeight = mapRef.current.parentElement?.clientHeight || 402;

      const initialScale = (containerHeight / 700) * 5;

      pinchZoomRef.current.scaleTo({
        x: 210,
        y: 150,
        scale: initialScale,
      });
    }
  }, [day, time]);

  const renderBooth = (id: number) => {
    const isActive = selectedId === id;
    const boothName = booths?.find((b) => b.id === id)?.name || `부스 ${id}`;

    return (
      <S.BoothContainer key={id}>
        {isActive && (
          <S.BoothNameBubble>
            <S.BoothNameText>{boothName}</S.BoothNameText>
          </S.BoothNameBubble>
        )}
        <S.BoothSlot $isActive={isActive} onClick={() => onBoothClick?.(id)}>
          {id}
        </S.BoothSlot>
      </S.BoothContainer>
    );
  };

  return (
    <S.MapWrapper>
      <QuickPinchZoom
        ref={pinchZoomRef}
        onUpdate={onUpdate}
        draggableUnZoomed={true}
        wheelScaleFactor={500}
        tapZoomFactor={0}
        containerProps={{
          style: {
            width: "100%",
            height: "100%",
          },
        }}
      >
        <S.MapCanvas ref={mapRef} $isNight={time === "night"}>
          {/* 1. 학생회관 구역 */}
          <S.Section $top="131px" $left="115px" $width="242px" $height="118px">
            <S.BuildingLabel>학생회관</S.BuildingLabel>
            <S.AbsoluteBooth
              $top="10px"
              $left="-52px"
              $width="50px"
              $height="40px"
            >
              <S.SubLabel>손목띠 배부</S.SubLabel>
            </S.AbsoluteBooth>
            <S.AbsoluteBooth
              $bottom="-42px"
              $left="50px"
              $width="60px"
              $height="40px"
            >
              <S.SubLabel>포토부스</S.SubLabel>
            </S.AbsoluteBooth>
            <S.BoothList $bottom="-37px" $right="3px" $direction="row">
              {currentLayout.studentHall?.map(renderBooth)}
            </S.BoothList>
          </S.Section>

          {/* 2. 소영근터 구역 */}
          <S.Section $top="131px" $left="420px" $width="242px" $height="118px">
            <S.BuildingLabel>
              <S.SmallParkVoid>소영근터</S.SmallParkVoid>
            </S.BuildingLabel>
            <S.AbsoluteBooth
              $top="-1px"
              $left="60px"
              $width="60px"
              $height="40px"
            >
              <S.SubLabel>포토월& 에어덕새</S.SubLabel>
            </S.AbsoluteBooth>
            <S.AbsoluteBooth
              $bottom="-42px"
              $right="-25px"
              $width="82px"
              $height="40px"
            >
              <S.SubLabel>운영 본부</S.SubLabel>
            </S.AbsoluteBooth>
            <S.BoothList $top="-1px" $right="32px" $direction="column">
              {currentLayout.soyoung?.map(renderBooth)}
            </S.BoothList>
          </S.Section>

          {/* 3. 예술대학 구역 */}
          <S.Section $top="131px" $left="716px" $width="307px" $height="118px">
            <S.BuildingLabel>예술대학</S.BuildingLabel>
            <S.AbsoluteBooth
              $bottom="-42px"
              $left="-0.5px"
              $width="60px"
              $height="40px"
            >
              <S.SubLabel>협찬품 배부</S.SubLabel>
            </S.AbsoluteBooth>
            <S.AbsoluteBooth
              $bottom="-42px"
              $left="60px"
              $width="60px"
              $height="40px"
            >
              <S.SubLabel>포토부스</S.SubLabel>
            </S.AbsoluteBooth>
          </S.Section>

          {/* 4. 도서관 & 푸드트럭 */}
          <S.Section $top="321px" $left="109px" $width="132px" $height="379px">
            <S.BuildingLabel $left="0" $width="66px">
              도서관
            </S.BuildingLabel>
            <S.GreenZone $right="0" $width="66px" $height="100%">
              푸드트럭
            </S.GreenZone>
          </S.Section>

          {/* 5. 민주동산 구역 */}
          <S.Section $top="325px" $left="297px" $width="182px" $height="350px">
            <S.BuildingLabel>민주동산</S.BuildingLabel>
            <S.BoothList $top="-1px" $right="-57px" $direction="column">
              {currentLayout.minju?.map(renderBooth)}
            </S.BoothList>
            <S.AbsoluteBooth
              $bottom="-41px"
              $left="58px"
              $width="121px"
              $height="40px"
            >
              <S.SubLabel>손목띠 배부</S.SubLabel>
            </S.AbsoluteBooth>
          </S.Section>

          {/* 6. 영근터 구역 (무대/덕우존 포함) */}
          <S.Section $top="322px" $left="689px" $width="455px" $height="403px">
            <S.BuildingLabel>영근터</S.BuildingLabel>
            <S.BoothList $top="-1px" $right="50px" $direction="row">
              {currentLayout.youngTop?.map(renderBooth)}
            </S.BoothList>
            <S.BoothList $top="65px" $left="-1px" $direction="column">
              {currentLayout.youngLeft?.map(renderBooth)}
            </S.BoothList>
            <S.InnerBlock
              $top="140px"
              $right="-1px"
              $width="124px"
              $height="111px"
            >
              <S.FlexRow>
                <S.UnitD>덕우존</S.UnitD>
                <S.UnitB>배리어프리</S.UnitB>
              </S.FlexRow>
              <S.UnitStage>무대</S.UnitStage>
            </S.InnerBlock>
            <S.BoothList $bottom="3.5px" $right="50px" $direction="row">
              {currentLayout.youngBottom?.map(renderBooth)}
            </S.BoothList>
          </S.Section>

          {/* 7. 하단 푸드트럭 및 정문 */}
          <S.AbsoluteFoodTruck
            $top="764px"
            $left="176px"
            $width="60px"
            $height="40px"
          >
            <S.SubLabel>푸드트럭</S.SubLabel>
          </S.AbsoluteFoodTruck>
          <S.AbsoluteFoodTruck
            $top="805px"
            $left="237px"
            $width="122px"
            $height="40px"
          >
            <S.SubLabel>푸드트럭</S.SubLabel>
          </S.AbsoluteFoodTruck>
          <S.Section $top="804px" $left="539px" $width="123px" $height="64px">
            정문
          </S.Section>
        </S.MapCanvas>
      </QuickPinchZoom>
    </S.MapWrapper>
  );
};

export default BoothMapComponent;
