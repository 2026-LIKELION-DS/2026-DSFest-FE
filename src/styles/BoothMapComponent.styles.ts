import styled, { css } from "styled-components";

// 공통 변수
const borderColor = "#7daa76";

/** BoothPage 전용 스타일 **/
export const PageWrapper = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
`;

export const DayNav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  border-bottom: 1px solid #f1f3f5;
`;

export const DayTab = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#1a4314" : "#adb5bd")};
  .label {
    font-size: 12px;
    font-weight: 800;
  }
  .date {
    font-size: 14px;
    margin-top: 4px;
  }
`;

export const ListContainer = styled.div`
  padding: 20px;
  h2 {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

/** BoothMapComponent 전용 스타일 **/
export const MapWrapper = styled.div`
  width: 100%;
  overflow: hidden; // 지도가 영역 밖으로 나가지 않게 함
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  touch-action: none; // 브라우저 스크롤과 줌 충돌 방지
`;

export const MapCanvas = styled.div`
  position: relative;
  width: 750px; // 지도 원본 가로 크기
  height: 550px; // 지도 원본 세로 크기
  background-color: white;
  transform-origin: 0 0; // 줌 기준점 고정
`;

export const Section = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $width?: string;
  $height?: string;
  $noBorder?: boolean;
}>`
  position: absolute;
  border: ${(props) => (props.$noBorder ? "none" : `1px solid ${borderColor}`)};
  background-color: ${(props) => (props.$noBorder ? "transparent" : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 11px;
  color: #555;

  ${(props) => css`
    top: ${props.$top};
    bottom: ${props.$bottom};
    left: ${props.$left};
    right: ${props.$right};
    width: ${props.$width};
    height: ${props.$height};
  `}
`;

export const BuildingLabel = styled.span<{ $rotate?: boolean }>`
  font-weight: bold;
  font-size: 14px;
  color: #333;
  ${(props) =>
    props.$rotate &&
    css`
      transform: rotate(-90deg);
    `}
`;

export const BoothList = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $direction: string;
}>`
  position: absolute;
  display: flex;
  flex-direction: ${(props) => props.$direction};
  gap: 2px;
  ${(props) => css`
    top: ${props.$top};
    bottom: ${props.$bottom};
    left: ${props.$left};
    right: ${props.$right};
  `}
`;

export const BoothSlot = styled.div<{ $isActive: boolean }>`
  width: 26px;
  height: 26px;
  border: 1px solid ${borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? "#1a4314" : "white")};
  color: ${(props) => (props.$isActive ? "white" : "#495057")};
`;

export const AbsoluteBooth = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}>`
  position: absolute;
  ${(props) => css`
    top: ${props.$top};
    bottom: ${props.$bottom};
    left: ${props.$left};
    right: ${props.$right};
  `}
`;

export const SubLabel = styled.span<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $align?: string;
}>`
  position: absolute;
  font-size: 10px;
  color: #888;
  white-space: nowrap;
  text-align: ${(props) => props.$align || "left"};
  ${(props) => css`
    top: ${props.$top};
    bottom: ${props.$bottom};
    left: ${props.$left};
    right: ${props.$right};
  `}
`;

export const GreenZone = styled.div<{
  $top?: string;
  $right?: string;
  $width?: string;
  $height?: string;
}>`
  position: absolute;
  background-color: #f1f5f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  border-left: 1px solid ${borderColor};
  ${(props) => css`
    top: ${props.$top};
    right: ${props.$right};
    width: ${props.$width};
    height: ${props.$height};
  `}
`;

export const InnerBlock = styled.div<{
  $top?: string;
  $right?: string;
  $width?: string;
  $height?: string;
}>`
  position: absolute;
  border: 1px solid ${borderColor};
  background: white;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  ${(props) => css`
    top: ${props.$top};
    right: ${props.$right};
    width: ${props.$width};
    height: ${props.$height};
  `}
  .unit {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    &:not(:last-child) {
      border-bottom: 1px solid ${borderColor};
    }
  }
`;

export const MapInfoText = styled.p`
  font-size: 11px;
  color: #adb5bd;
  margin-top: 10px;
  text-align: center;
`;
