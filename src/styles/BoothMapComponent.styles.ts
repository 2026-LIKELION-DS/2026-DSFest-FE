import styled, { css } from "styled-components";

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #f5f7ed;
  touch-action: none;
`;

export const MapCanvas = styled.div`
  position: relative;
  width: 1200px;
  height: 1000px;
  background-color: #f5f7ed;
  transform-origin: 0 0;
  will-change: transform;
`;

export const Section = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $width?: string;
  $height?: string;
}>`
  position: absolute;
  border: 1px solid #0b4112;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  ${(props) => css`
    top: ${props.$top};
    bottom: ${props.$bottom};
    left: ${props.$left};
    right: ${props.$right};
    width: ${props.$width};
    height: ${props.$height};
  `}
`;

export const BoothSlot = styled.div<{ $isActive: boolean }>`
  width: 60px;
  height: 40px;
  border: 1px solid #277b31;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  background-color: ${(props) => (props.$isActive ? "#0B4112" : "#FDF7E7")};
  color: ${(props) => (props.$isActive ? "white" : "#277b31")};
  cursor: pointer;
  margin-bottom: -4.5px;
  margin-right: -4.5px;
`;

export const AbsoluteBooth = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $width?: string;
  $height?: string;
}>`
  background-color: #e5ebcf;
  color: #277b31;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #277b31;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => css`
    top: ${props.$top};
    bottom: ${props.$bottom};
    left: ${props.$left};
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
  color: #0b4112;
  border: 1px solid #0b4112;
  background: white;
  display: flex;
  font-size: 11px;
  ${(props) => css`
    top: ${props.$top};
    right: ${props.$right};
    width: ${props.$width};
    height: ${props.$height};
  `}
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;
export const UnitD = styled.div`
  border-bottom: 1px solid #0b4112;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  height: 85px;
`;
export const UnitStage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #0b4112;
  font-size: 14px;
`;
export const UnitB = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

export const GreenZone = styled.div<{
  $width: string;
  $height: string;
  $right: string;
}>`
  position: absolute;
  right: ${(props) => props.$right};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background-color: #e8ede0;
  border-left: 1px solid #277b31;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #277b31;
`;

export const BuildingLabel = styled.div<{ $left?: string; $width?: string }>`
  font-size: 14px;
  color: #0b4112;
  position: absolute;
  left: ${(props) => props.$left};
  width: ${(props) => props.$width};
  text-align: center;
`;

export const SubLabel = styled.div<{ $align?: string }>`
  font-size: 11px;
  text-align: ${(props) => props.$align || "center"};
  line-height: 1.2;
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
  gap: 1px;
  ${(props) => css`
    top: ${props.$top};
    bottom: ${props.$bottom};
    left: ${props.$left};
    right: ${props.$right};
  `}
`;

export const SmallParkVoid = styled.div`
  display: flex;
  width: 120px;
`;
