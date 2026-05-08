import styled, { css } from "styled-components";
import { theme } from "./theme";
import ScheduleBackGround from "../assets/Schedule/Scheduleback.svg";
const HEADER_HEIGHT = "60px";
const NAV_HEIGHT = "60px";

export const SchedulePage = styled.div`
  padding: 0 24px 24px;
  padding-bottom: 80px;
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg.neutral};
  overflow-x: hidden;
  min-height: 100vh;
  background-image: url(${ScheduleBackGround});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  height: 100vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    @media (min-height: 874px) {
      height: calc(874px - 24px - ${HEADER_HEIGHT} - ${NAV_HEIGHT});
    }
  }
`;

export const Bubble = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  pointer-events: none;
`;

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0 0;
  margin-bottom: -18px;
`;

export const DayButton = styled.button<{ $active: boolean }>`
  flex: 1;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.bg.brandLight};
  font-family: ${theme.typography.h1};
  cursor: pointer;

  span {
    display: block;
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.bg.brandLight};
    font-family: ${theme.typography.bodyMd};
  }
`;

export const DaySection = styled.div`
  scroll-margin-top: 80px;
  position: relative;
  &:last-child {
    padding-bottom: 85px;
  }
`;

export const DecoLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
`;

export const Leafs = styled.img`
  position: absolute;
  width: 85px;
  height: 88px;
  top: 135px;
  left: 6px;
  z-index: 2;
  pointer-events: none;
`;

export const Flower = styled.img`
  position: absolute;
  width: 78px;
  height: 74px;
  top: 715px;
  left: 5px;
  z-index: 2;
  pointer-events: none;
`;

export const CamFlower = styled.img`
  position: absolute;
  width: 105px;
  height: 92px;

  top: 715px;
  right: 2px;
  z-index: 2;
  pointer-events: none;
`;

export const CamLeaf = styled.img`
  position: absolute;
  width: 118px;
  height: 103px;
  top: 1407px;
  z-index: 2;
  pointer-events: none;
`;

export const Flowers2 = styled.img`
  position: absolute;
  height: 126px;
  top: 1497px;
  left: -10px;
  z-index: 2;
  pointer-events: none;
`;
export const CamFlower2 = styled.img`
  position: absolute;
  width: 115px;
  top: 1977px;
  right: -12px;
  z-index: 2;
  pointer-events: none;
`;

export const FloatingCircleBtn = styled.div<{ $isVisible?: boolean }>`
  display: flex;
  margin-bottom: 55px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $isVisible }) =>
    $isVisible === false &&
    css`
      height: 0;
      width: 0;
      margin: 0;
      padding: 0;
      opacity: 0;
      visibility: hidden;
      transform: scale(0);
      pointer-events: none;
    `}

  &:active {
    transform: scale(0.9);
  }
`;

export const ScheduleButtonWrapper = styled.div`
  pointer-events: none;
  z-index: 10;
  position: fixed;
  display: flex;
  align-items: center;
  cursor: pointer;

  width: 100%;
  left: 49%;
  transform: translateX(calc(-15%));
  bottom: 20px;

  bottom: 13px;
  @media (min-width: 768px) or (max-height: 973px) {
    bottom: calc(50% - 437px + 13px + 12px);
    max-width: 402px;
  }
  @media (max-height: 910px) {
    bottom: 20px;
    left: 48%;
  }
`;

export const FloatingIcon = styled.button<{ $isVisible?: boolean }>`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.bg.brand};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $isVisible }) =>
    $isVisible === false &&
    css`
      height: 0;
      width: 0;
      margin: 0;
      padding: 0;
      opacity: 0;
      visibility: hidden;
      transform: scale(0);
      pointer-events: none;
    `}

  &:active {
    transform: scale(0.9);
  }

  img {
    width: 26px;
    height: 26px;
  }
`;

export const FloatingButton = styled.div<{ $hasTopBtn: boolean }>`
  gap: ${({ $hasTopBtn }) => ($hasTopBtn ? "8px" : "0px")};
  position: fixed;
  right: 10px;
  bottom: 20px;

  display: flex;
  flex-direction: column-reverse;
  gap: 10px;

  z-index: 999;
  margin-bottom: 55px;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    right: calc((100vw - 402px) / 2 + 10px);
    bottom: 20px;
    margin-bottom: 55px;
  }

  @media (min-width: 768px) and (min-height: 874px),
    (hover: hover) and (pointer: fine) and (min-height: 874px) {
    right: calc((100vw - 402px) / 2 + 20px);
    bottom: calc((100dvh - 898px) / 2 + 32px);
  }
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
