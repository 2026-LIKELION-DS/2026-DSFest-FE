import React, { useRef, useCallback } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import * as S from "../styles/BoothMapComponent.styles";

interface MapProps {
  selectedId?: number;
  onBoothClick?: (id: number) => void;
}

const BoothMapComponent: React.FC<MapProps> = ({
  selectedId,
  onBoothClick,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // 줌/드래그 시 실시간 스타일 적용
  const onUpdate = useCallback(
    ({ x, y, scale }: { x: number; y: number; scale: number }) => {
      if (mapRef.current) {
        const value = make3dTransformValue({ x, y, scale });
        mapRef.current.style.setProperty("transform", value);
      }
    },
    [],
  );

  const renderBooth = (id: number) => (
    <S.BoothSlot
      key={id}
      $isActive={selectedId === id}
      onClick={() => onBoothClick?.(id)}
    >
      {id}
    </S.BoothSlot>
  );

  return (
    <S.MapWrapper>
      <QuickPinchZoom
        onUpdate={onUpdate}
        wheelScaleFactor={500}
        draggableUnZoomed={true}
      >
        <S.MapCanvas ref={mapRef}>
          {/* 학생회관 */}
          <S.Section $top="20px" $left="20px" $width="220px" $height="100px">
            <S.BuildingLabel>학생회관</S.BuildingLabel>
            <S.SubLabel $bottom="5px" $left="40px">
              포토부스
            </S.SubLabel>
            <S.AbsoluteBooth $bottom="5px" $right="10px">
              {renderBooth(1)}
            </S.AbsoluteBooth>
          </S.Section>

          {/* 소영근터 */}
          <S.Section $top="20px" $left="260px" $width="130px" $height="100px">
            <S.BuildingLabel>소영근터</S.BuildingLabel>
            <S.BoothList $top="5px" $right="5px" $direction="column">
              {[2, 3, 4].map(renderBooth)}
            </S.BoothList>
          </S.Section>

          {/* 도서관 & 푸드트럭 */}
          <S.Section $top="150px" $left="20px" $width="90px" $height="350px">
            <S.BuildingLabel $rotate>도서관</S.BuildingLabel>
            <S.GreenZone $top="0" $right="0" $width="35px" $height="100%">
              푸드트럭
            </S.GreenZone>
          </S.Section>

          {/* 민주동산 */}
          <S.Section $top="150px" $left="130px" $width="140px" $height="330px">
            <S.BuildingLabel>민주동산</S.BuildingLabel>
            <S.BoothList $top="5px" $right="5px" $direction="column">
              {[5, 6, 7, 8, 9, 10, 11, 12, 13].map(renderBooth)}
            </S.BoothList>
          </S.Section>

          {/* 영근터 */}
          <S.Section
            $top="150px"
            $left="300px"
            $width="320px"
            $height="330px"
            $noBorder
          >
            <S.BuildingLabel>영근터</S.BuildingLabel>
            <S.BoothList $top="5px" $right="5px" $direction="row-reverse">
              {[18, 17, 16, 15, 14].map(renderBooth)}
            </S.BoothList>
            <S.BoothList $top="55px" $left="5px" $direction="column">
              {[19, 20, 21, 22, 23, 24, 25].map(renderBooth)}
            </S.BoothList>
            <S.InnerBlock
              $top="120px"
              $right="10px"
              $width="60px"
              $height="80px"
            >
              <div className="unit">덕우존</div>
              <div className="unit">배리어프리</div>
            </S.InnerBlock>
            <S.BoothList $bottom="5px" $left="60px" $direction="row">
              {[26, 27, 28, 29, 30].map(renderBooth)}
            </S.BoothList>
          </S.Section>

          {/* 정문 */}
          <S.Section $bottom="20px" $left="320px" $width="100px" $height="40px">
            정문
          </S.Section>
        </S.MapCanvas>
      </QuickPinchZoom>
      <S.MapInfoText>↕ 손가락으로 지도를 밀거나 확대해서 보세요</S.MapInfoText>
    </S.MapWrapper>
  );
};

export default BoothMapComponent;
