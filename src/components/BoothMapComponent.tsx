import React, { useRef, useCallback, useLayoutEffect } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import * as S from "../styles/BoothMapComponent.styles";

interface MapProps {
  day: number;
  selectedId?: number | null;
  onBoothClick?: (id: number) => void;
  booths: any[]; // 부모로부터 부스 데이터를 받음
}

const BOOTH_LAYOUT_BY_DAY: Record<number, any> = {
  1: {
    studentHall: [1],
    soyoung: [2, 3, 4],
    minju: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    youngTop: [18, 17, 16, 15, 14],
    youngLeft: [19, 20, 21, 22, 23, 24, 25],
    youngBottom: [26, 27, 28, 29, 30],
  },
  2: {
    studentHall: [1],
    soyoung: [2, 3, 4],
    minju: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    youngTop: [18, 17, 16, 15, 14],
    youngLeft: [19, 20, 21, 22, 23, 24, 25],
    youngBottom: [26, 27, 28, 29, 30],
  },
  3: {
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
  selectedId,
  onBoothClick,
  booths,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const pinchZoomRef = useRef<any>(null);

  const onUpdate = useCallback(({ x, y, scale }: any) => {
    if (mapRef.current) {
      const value = make3dTransformValue({ x, y, scale });
      mapRef.current.style.setProperty("transform", value);
    }
  }, []);

  useLayoutEffect(() => {
    if (pinchZoomRef.current && mapRef.current) {
      const containerHeight = mapRef.current.parentElement?.clientHeight || 400;
      const initialScale = (containerHeight / 700) * 3;
      pinchZoomRef.current.scaleTo({ x: 100, y: 100, scale: initialScale });
    }
  }, []);

  const renderBooth = (id: number) => {
    const isActive = selectedId === id;
    // 넘겨받은 booths 프롭스에서 해당 ID의 이름을 찾음
    const boothName = booths?.find((b) => b.id === id)?.name || `부스 ${id}`;

    return (
      <S.BoothContainer key={id}>
        {isActive && <S.BoothNameBubble>{boothName}</S.BoothNameBubble>}
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
      >
        <S.MapCanvas ref={mapRef}>
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
            <S.BoothList $bottom="-37px" $right="3px" $direction="row">
              {BOOTH_LAYOUT_BY_DAY[day]?.studentHall?.map(renderBooth)}
            </S.BoothList>
          </S.Section>

          <S.Section $top="131px" $left="420px" $width="242px" $height="118px">
            <S.BuildingLabel>
              <S.SmallParkVoid>소영근터</S.SmallParkVoid>
            </S.BuildingLabel>
            <S.BoothList $top="-1px" $right="32px" $direction="column">
              {BOOTH_LAYOUT_BY_DAY[day]?.soyoung?.map(renderBooth)}
            </S.BoothList>
          </S.Section>

          <S.Section $top="325px" $left="297px" $width="182px" $height="350px">
            <S.BuildingLabel>민주동산</S.BuildingLabel>
            <S.BoothList $top="-1px" $right="-57px" $direction="column">
              {BOOTH_LAYOUT_BY_DAY[day === 2 ? 2 : day]?.minju?.map(
                renderBooth,
              )}
            </S.BoothList>
          </S.Section>

          <S.Section $top="322px" $left="689px" $width="455px" $height="403px">
            <S.BuildingLabel>영근터</S.BuildingLabel>
            <S.BoothList $top="-1px" $right="50px" $direction="row">
              {BOOTH_LAYOUT_BY_DAY[day]?.youngTop?.map(renderBooth)}
            </S.BoothList>
            <S.BoothList $top="65px" $left="-1px" $direction="column">
              {BOOTH_LAYOUT_BY_DAY[day]?.youngLeft?.map(renderBooth)}
            </S.BoothList>
            <S.BoothList $bottom="3.5px" $right="50px" $direction="row">
              {BOOTH_LAYOUT_BY_DAY[day]?.youngBottom?.map(renderBooth)}
            </S.BoothList>
          </S.Section>

          <S.Section $top="804px" $left="539px" $width="123px" $height="64px">
            정문
          </S.Section>
        </S.MapCanvas>
      </QuickPinchZoom>
    </S.MapWrapper>
  );
};

export default BoothMapComponent;
