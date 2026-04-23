import React, { useRef, useCallback, useLayoutEffect } from "react";
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
  // QuickPinchZoom 인스턴스에 접근하기 위한 Ref (타입은 any로 지정하거나 라이브러리 내부 타입을 사용)
  const pinchZoomRef = useRef<any>(null);

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

  // 컴포넌트가 마운트된 직후 초기 배율을 설정합니다.
  useLayoutEffect(() => {
    if (pinchZoomRef.current && mapRef.current) {
      // 1. 컨테이너(부모)와 캔버스(자식)의 높이 가져오기
      const containerHeight = mapRef.current.parentElement?.clientHeight || 400;
      const canvasHeight = 1000; // S.MapCanvas에서 설정한 height

      // 2. 높이에 딱 맞게 들어갈 배율 계산 (약 0.4 정도 나오겠지만 화면에 따라 가변적)
      const initialScale = containerHeight / canvasHeight;

      pinchZoomRef.current.scaleTo({
        x: 0,
        y: 0,
        scale: initialScale,
      });
    }
  }, []);

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
        ref={pinchZoomRef}
        onUpdate={onUpdate}
        wheelScaleFactor={500}
        draggableUnZoomed={true}
        containerProps={{
          style: {
            width: "100%",
            height: "100%",
          },
        }}
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
          <S.Section $top="150px" $left="20px" $width="100px" $height="350px">
            <S.BuildingLabel $top="0" $left="0" $width="50px" $height="100%">
              도서관
            </S.BuildingLabel>
            <S.GreenZone $top="0" $right="0" $width="50px" $height="100%">
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
          <S.Section $top="150px" $left="300px" $width="320px" $height="330px">
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
    </S.MapWrapper>
  );
};

export default BoothMapComponent;
