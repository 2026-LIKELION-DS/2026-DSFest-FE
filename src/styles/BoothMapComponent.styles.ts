import styled, { css, keyframes } from "styled-components";
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

export const MapCanvas = styled.div<{ $isNight: boolean }>`
  position: relative;
  width: 1200px;
  height: 1000px;
  background-color: ${({ theme }) => theme.colors.bg.oliveLight};

  padding: 200px;
  box-sizing: border-box;
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
  height: 41.5px;
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
  margin-bottom: -4px;
  margin-right: -4.5px;
  z-index: ${({ $isActive }) => ($isActive ? 10 : 1)};
`;

export const AbsoluteBooth = styled.div<{
  $isActive?: boolean;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $width?: string;
  $height?: string;
}>`
  cursor: default;
  ${setTypo("buttonSm")};
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
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.bg.brand : theme.colors.bg.olive};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.fg.primaryInverted : theme.colors.bg.brandLight};
`;

export const AbsoluteFoodTruck = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $width?: string;
  $height?: string;
}>`
  background-color: ${({ theme }) => theme.colors.bg.neutralDeep};
  color: ${({ theme }) => theme.colors.bg.brandLight};
  ${setTypo("bodyMd")};
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
  background-color: ${({ theme }) => theme.colors.bg.neutralDeep};
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

export const BoothContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const jumpIn = keyframes`
  0% {
    opacity: 0;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const BoothNameBubble = styled.div`
  position: absolute;
  bottom: calc(100% - 4px);
  left: calc(50% + 2px);
  transform: translateX(-50%);

  background-color: ${({ theme }) => theme.colors.bg.brand};
  color: ${({ theme }) => theme.colors.fg.primaryInverted};

  padding: 5px 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.fg.primaryInverted};
  border-radius: 9999px;

  width: max-content;

  animation: ${jumpIn} 0.1s forwards;
  opacity: 0;

  text-align: center;
  ${setTypo("buttonSm")};
  line-height: 1.2;
  z-index: 21;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;

  &::after {
    z-index: 22;
    content: "";
    position: absolute;
    top: calc(100% - 2.5px);
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;

    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 16 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 10L1 1H15L8 10Z' fill='%23064112'/%3E%3Cpath d='M1 1L8 10L15 1' stroke='%23F2F2F2' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }
`;
export const BoothNameText = styled.span`
  ${setTypo("buttonSm")};
  font-size: 11px;
  line-height: 1.2;
  text-align: center;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  max-height: 2.4em;
  max-width: 80px;
`;
