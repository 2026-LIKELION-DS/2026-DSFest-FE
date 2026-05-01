import React, {
  useRef,
  useCallback,
  useLayoutEffect,
  useEffect,
  useState,
} from "react";
import type { ElementRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import axios from "axios";
import * as S from "../../styles/BoothMapComponent.styles";

interface MapBooth {
  boothId: number;
  boothNumber: number;
  name: string;
  positionNumber: number;
  operatingSubject: string;
  thumbnailUrl: string;
  boothTypes: string[];
}

interface MapProps {
  day: number;
  time?: "day" | "night";
  selectedId?: number | null;
  onBoothClick?: (id: number | null, posNum?: number) => void;
}

const BOOTH_LAYOUTS: Record<string, Record<string, number[]>> = {
  common: {
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
}) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [mapData, setMapData] = useState<MapBooth[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const pinchZoomRef = useRef<ElementRef<typeof QuickPinchZoom>>(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/booths/map`, {
          params: { day, type: time.toUpperCase() },
        });
        if (res.data.isSuccess) setMapData(res.data.result);
      } catch (e) {
        console.error("지도 로드 실패", e);
      }
    };
    fetchMapData();
  }, [day, time, baseUrl]);

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
    const BOOTH_POSITIONS: Record<number, { x: number; y: number }> = {
      1: { x: 410, y: 342 },

      2: { x: 765, y: 198 },
      3: { x: 765, y: 248 },
      4: { x: 765, y: 298 },

      5: { x: 645, y: 430 },
      6: { x: 645, y: 480 },
      7: { x: 645, y: 530 },
      8: { x: 645, y: 580 },
      9: { x: 645, y: 630 },
      10: { x: 645, y: 680 },
      11: { x: 645, y: 730 },
      12: { x: 645, y: 780 },
      13: { x: 645, y: 830 },

      14: { x: 1345, y: 440 },
      15: { x: 1275, y: 440 },
      16: { x: 1205, y: 440 },
      17: { x: 1135, y: 440 },
      18: { x: 1065, y: 440 },

      19: { x: 910, y: 500 },
      20: { x: 910, y: 550 },
      21: { x: 910, y: 600 },
      22: { x: 910, y: 650 },
      23: { x: 910, y: 700 },
      24: { x: 910, y: 750 },
      25: { x: 910, y: 800 },

      26: { x: 1065, y: 892 },
      27: { x: 1135, y: 892 },
      28: { x: 1205, y: 892 },
      29: { x: 1275, y: 892 },
      30: { x: 1345, y: 892 },
    };

    if (pinchZoomRef.current && mapRef.current) {
      const container = mapRef.current.parentElement!;
      const selectedBooth = mapData.find((b) => b.boothId === selectedId);
      const posNum = selectedBooth?.positionNumber;

      if (selectedId && posNum && BOOTH_POSITIONS[posNum]) {
        const targetPos = BOOTH_POSITIONS[posNum];
        const focusScale = (container.clientHeight / 700) * 7;
        const x =
          ((targetPos.x * focusScale) / 2 - container.clientWidth) /
          (focusScale - 1) /
          2;
        const y =
          ((targetPos.y * focusScale) / 2 - container.clientHeight) /
          (focusScale - 1) /
          2;

        pinchZoomRef.current.scaleTo({
          x,
          y,
          scale: focusScale,
          animated: true,
        });
      } else if (selectedId === null) {
        const initialScale = (container.clientHeight / 700) * 5;

        pinchZoomRef.current.scaleTo({
          x: 210,
          y: 150,
          scale: initialScale,
          animated: true,
        });
      }
    }
  }, [selectedId, mapData]);

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

  const handleMapBackgroundClick = () => {
    if (selectedId !== null) {
      onBoothClick?.(null);
    }
  };

  const renderBooth = (pos: number) => {
    const booth = mapData.find((b) => b.positionNumber === pos);
    if (!booth) return null;

    const isActive = selectedId === booth.boothId;

    const allSlots = mapData
      .filter((b) => b.boothId === booth.boothId)
      .map((b) => b.positionNumber);
    const isFirstSlot = Math.min(...allSlots) === pos;

    return (
      <S.BoothContainer key={pos}>
        {isActive && isFirstSlot && (
          <S.BoothNameBubble>
            <S.BoothNameText>{booth.name}</S.BoothNameText>
          </S.BoothNameBubble>
        )}
        <S.BoothSlot
          $isActive={isActive}
          onClick={(e) => {
            e.stopPropagation();
            onBoothClick?.(
              isActive ? null : booth.boothId,
              booth.positionNumber,
            );
          }}
        >
          {booth.positionNumber}
        </S.BoothSlot>
      </S.BoothContainer>
    );
  };

  const currentLayout = BOOTH_LAYOUTS.common;

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
        <S.MapCanvas
          ref={mapRef}
          $isNight={time === "night"}
          onClick={handleMapBackgroundClick}
        >
          {/* 1. 학생회관 구역 */}
          <S.Section $top="131px" $left="115px" $width="242px" $height="119px">
            <S.BuildingLabel>학생회관</S.BuildingLabel>
            <S.AbsoluteBooth
              $top="10px"
              $left="-60px"
              $width="60px"
              $height="40px"
            >
              <S.SubLabel>
                손목띠<br></br> 배부
              </S.SubLabel>
            </S.AbsoluteBooth>
            <S.AbsoluteBooth
              $bottom="-40px"
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
          <S.Section $top="131px" $left="420px" $width="242px" $height="119px">
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
                포토월& <br></br>에어덕새
              </S.SubLabel>
            </S.AbsoluteBooth>
            <S.AbsoluteBooth
              $bottom="-40px"
              $right="-20px"
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
          <S.Section $top="131px" $left="716px" $width="307px" $height="119px">
            <S.BuildingLabel>예술대학</S.BuildingLabel>
            <S.AbsoluteBooth
              $bottom="-40px"
              $left="-1px"
              $width="60px"
              $height="40px"
            >
              <S.SubLabel>
                협찬품<br></br>배부
              </S.SubLabel>
            </S.AbsoluteBooth>
            <S.AbsoluteBooth
              $bottom="-40px"
              $left="58px"
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
            <S.BoothList $top="-1px" $right="-55px" $direction="column">
              {currentLayout.minju?.map(renderBooth)}
            </S.BoothList>
            <S.AbsoluteBooth
              $bottom="-40px"
              $left="60px"
              $width="121px"
              $height="40px"
            >
              <S.SubLabel>
                손목띠 <br></br>배부
              </S.SubLabel>
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
              $right="-2px"
              $width="124px"
              $height="111px"
            >
              <S.FlexRow>
                <S.UnitD>덕우존</S.UnitD>
                <S.UnitB>배리어프리</S.UnitB>
              </S.FlexRow>
              <S.UnitStage>무대</S.UnitStage>
            </S.InnerBlock>
            <S.BoothList $bottom="3px" $right="50px" $direction="row">
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
