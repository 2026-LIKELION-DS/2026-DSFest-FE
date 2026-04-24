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
  const pinchZoomRef = useRef<any>(null);

  const onUpdate = useCallback(
    ({ x, y, scale }: { x: number; y: number; scale: number }) => {
      if (mapRef.current) {
        const value = make3dTransformValue({ x, y, scale });
        mapRef.current.style.setProperty("transform", value);
      }
    },
    [],
  );

  useLayoutEffect(() => {
    if (pinchZoomRef.current && mapRef.current) {
      const containerHeight = mapRef.current.parentElement?.clientHeight || 400;
      const canvasHeight = 700; // 맵 높이에 맞춰 조정
      const initialScale = (containerHeight / canvasHeight) * 3;

      pinchZoomRef.current.scaleTo({
        x: 100,
        y: 100,
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
          style: { width: "100%", height: "100%" },
        }}
      >
        <S.MapCanvas ref={mapRef}>
          {/* 상단 라인: 학생회관 - 소영근터 - 예술대학 */}
          <S.Section $top="131px" $left="115px" $width="242px" $height="118px">
            <S.BuildingLabel>학생회관</S.BuildingLabel>
            <S.AbsoluteBooth
              $top="10px"
              $left="-52px"
              $width="50px"
              $height="40px"
            >
              <S.SubLabel $align="center">
                손목띠
                <br />
                배부
              </S.SubLabel>
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
              {renderBooth(1)}
            </S.BoothList>
          </S.Section>

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
              <S.SubLabel>
                포토월&
                <br />
                에어덕새
              </S.SubLabel>
            </S.AbsoluteBooth>
            <S.BoothList $top="-1px" $right="32px" $direction="column">
              {[2, 3, 4].map(renderBooth)}
            </S.BoothList>
            <S.AbsoluteBooth
              $bottom="-42px"
              $right="-25px"
              $width="82px"
              $height="40px"
            >
              <S.SubLabel>운영 본부</S.SubLabel>
            </S.AbsoluteBooth>
          </S.Section>

          <S.Section $top="131px" $left="716px" $width="307px" $height="118px">
            <S.BuildingLabel>예술대학</S.BuildingLabel>
            <S.AbsoluteBooth
              $bottom="-42px"
              $left="-0.5px"
              $width="60px"
              $height="40px"
            >
              <S.SubLabel>
                협찬품
                <br />
                배부
              </S.SubLabel>
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

          {/* 중간 라인: 도서관 & 푸드트럭 - 민주동산 */}
          <S.Section $top="321px" $left="109px" $width="132px" $height="379px">
            <S.BuildingLabel $left="0" $width="66px">
              도서관
            </S.BuildingLabel>
            <S.GreenZone $right="0" $width="66px" $height="100%">
              푸드트럭
            </S.GreenZone>
          </S.Section>

          <S.Section $top="325px" $left="297px" $width="182px" $height="350px">
            <S.BuildingLabel>민주동산</S.BuildingLabel>
            <S.BoothList $top="-1px" $right="-57px" $direction="column">
              {[5, 6, 7, 8, 9, 10, 11, 12, 13].map(renderBooth)}
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

          {/* 영근터 영역 */}
          <S.Section $top="322px" $left="689px" $width="455px" $height="403px">
            <S.BuildingLabel>영근터</S.BuildingLabel>
            {/* 상단 부스 */}
            <S.BoothList $top="-1px" $right="50px" $direction="row">
              {[18, 17, 16, 15, 14].map(renderBooth)}
            </S.BoothList>
            {/* 좌측 부스 */}
            <S.BoothList $top="65px" $left="-1px" $direction="column">
              {[19, 20, 21, 22, 23, 24, 25].map(renderBooth)}
            </S.BoothList>
            {/* 우측 무대/덕우존 */}
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
            {/* 하단 부스 */}
            <S.BoothList $bottom="3.5px" $right="50px" $direction="row">
              {[26, 27, 28, 29, 30].map(renderBooth)}
            </S.BoothList>
          </S.Section>

          {/* 하단 푸드트럭 및 정문 */}
          <S.AbsoluteBooth
            $top="764px"
            $left="176px"
            $width="60px"
            $height="40px"
          >
            <S.SubLabel>푸드트럭</S.SubLabel>
          </S.AbsoluteBooth>
          <S.AbsoluteBooth
            $top="805px"
            $left="237px"
            $width="122px"
            $height="40px"
          >
            <S.SubLabel>푸드트럭</S.SubLabel>
          </S.AbsoluteBooth>

          <S.Section $top="804px" $left="539px" $width="123px" $height="64px">
            정문
          </S.Section>
        </S.MapCanvas>
      </QuickPinchZoom>
    </S.MapWrapper>
  );
};

export default BoothMapComponent;
