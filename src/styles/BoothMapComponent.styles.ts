import styled, { css } from "styled-components";
import { typography } from "./theme";

const setTypo = (key: keyof typeof typography) => {
  const typo = typography[key];
  return css`
    font-family: ${typo.fontFamily};
    font-weight: ${typo.fontWeight};
    font-size: ${typo.fontSize};
    line-height: ${typo.lineHeight};
  `;
};

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg.oliveLight};
  touch-action: none;
`;

export const MapCanvas = styled.div`
  position: relative;
  width: 1200px;
  height: 1000px;
  background-color: ${({ theme }) => theme.colors.bg.oliveLight};
  transform-origin: 0 0;
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
  border: 1px solid ${({ theme }) => theme.colors.bg.brand};
  background-color: ${({ theme }) => theme.colors.bg.neutral};
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.bg.brand};
  ${(props) => css`
    top: ${props.$top};
    bottom: ${props.$bottom};
    left: ${props.$left};
    right: ${props.$right};
    width: ${props.$width};
    height: ${props.$height};
  `}
  ${setTypo("bodyMd")};
`;

export const BoothSlot = styled.div<{ $isActive: boolean }>`
  width: 60px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.bg.brandLight};
  display: flex;
  align-items: center;
  justify-content: center;
  ${setTypo("bodySm")};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.bg.brand : theme.colors.bg.yellowLight};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.fg.primaryInverted : theme.colors.bg.brandLight};
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
  background-color: ${({ theme }) => theme.colors.bg.olive};
  color: ${({ theme }) => theme.colors.bg.brandLight};
  ${setTypo("bodySm")};
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.bg.brandLight};
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
  color: ${({ theme }) => theme.colors.bg.brand};
  border: 1px solid ${({ theme }) => theme.colors.bg.brand};
  background: ${({ theme }) => theme.colors.bg.neutral};
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.brand};
  display: flex;
  align-items: center;
  justify-content: center;
  ${setTypo("bodySm")};
  height: 85px;
`;

export const UnitStage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid ${({ theme }) => theme.colors.bg.brand};
  ${setTypo("bodyMd")};
`;

export const UnitB = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${setTypo("bodySm")};
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
  background-color: ${({ theme }) => theme.colors.bg.oliveLight};
  border-left: 1px solid ${({ theme }) => theme.colors.bg.brandLight};
  display: flex;
  align-items: center;
  justify-content: center;
  ${setTypo("bodySm")};
  color: ${({ theme }) => theme.colors.bg.brandLight};
`;

export const BuildingLabel = styled.div<{ $left?: string; $width?: string }>`
  ${setTypo("bodyMd")};
  color: ${({ theme }) => theme.colors.bg.brand};
  position: absolute;
  left: ${(props) => props.$left};
  width: ${(props) => props.$width};
  text-align: center;
`;

export const SubLabel = styled.div<{ $align?: string }>`
  ${setTypo("bodySm")};
  font-size: 10px;
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
