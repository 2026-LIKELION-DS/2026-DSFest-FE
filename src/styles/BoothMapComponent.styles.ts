import styled, { css } from "styled-components";

const borderColor = "#7daa76";

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
  width: 700px;
  height: 600px;
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
  transition: background-color 0.2s;
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

export const BuildingLabel = styled.span<{
  $rotate?: boolean;
  $top?: string;
  $left?: string;
  $width?: string;
  $height?: string;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  ${(props) => css`
    top: ${props.$top};
    left: ${props.$left};
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
