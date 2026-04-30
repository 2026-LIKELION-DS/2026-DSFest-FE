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

export const PageWrapper = styled.div`
  max-width: 767px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.bg.neutral};

  height: 100dvh;
  overflow-y: auto;

  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const DayNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 24px 24px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.oliveLight};
`;

export const DayTab = styled.div<{ $active: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.bg.brandLight : theme.colors.fg.subtle};
`;

export const Label = styled.span`
  ${setTypo("h1")};
  margin-bottom: 8px;
  line-height: 1;
`;

export const DateText = styled.span`
  ${setTypo("bodyMd")};
  display: flex;
  gap: 3px;
  margin-bottom: 10px;
`;

export const ListSection = styled.div`
  padding: 20px;
  h2 {
    ${setTypo("h2")};
    color: ${({ theme }) => theme.colors.fg.primary};
    margin-bottom: 16px;
  }
`;

export const MapInfoText = styled.p`
  ${setTypo("bodySm")};
  color: ${({ theme }) => theme.colors.fg.subtle};
  text-align: center;
`;

export const BoothList = styled.div`
  ${setTypo("h1")};
  margin: 10px 0;
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const BoothCur = styled.div`
  ${setTypo("bodyLg")};
  margin: 20px 0;
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const BoothAmount = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.bg.brand};
`;

export const MapHugger = styled.div`
  width: 100%;
  height: 402px;
  overflow: hidden;
  position: relative;
  touch-action: none;
  background-color: ${({ theme }) => theme.colors.bg.oliveLight};
`;

export const RandomFloatBtn = styled.button`
  position: absolute;
  bottom: 40px;
  right: 16px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.bg.brand};
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 0 4px 0 rgba(113, 122, 114, 0.4);

  img {
    width: 25px;
    height: 25px;
  }

  span {
    ${setTypo("bodySm")};
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.bg.brand};
    position: absolute;
    bottom: -20px;
    text-shadow: 0 0 4px rgba(113, 122, 114, 0.4);
  }
`;

export const TimeText = styled.div`
  ${setTypo("bodySm")};
  color: ${({ theme }) => theme.colors.bg.brand};
  font-weight: 500;
  text-align: left;
  padding-left: 4px;
`;

export const TimeButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const FloatingCircleBtn = styled.button<{ $isVisible?: boolean }>`
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

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;
`;

export const EmptyMessage = styled.div`
  ${setTypo("h2")};
  color: ${({ theme }) => theme.colors.fg.subtle};
  margin-bottom: 8px;
  white-space: pre-wrap;
`;

export const NextTimeText = styled.div`
  ${setTypo("bodyMd")};
  color: ${({ theme }) => theme.colors.fg.subtle};
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  ${setTypo("buttonMd")};

  background: ${({ $active, theme }) =>
    $active ? theme.colors.bg.brand : theme.colors.bg.neutral};

  color: ${({ $active, theme }) =>
    $active ? theme.colors.fg.primaryInverted : theme.colors.fg.primary};

  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.bg.brand : theme.colors.stroke.subtle};

  padding: 8px 15px;

  border-radius: 999px;

  cursor: pointer;

  margin-bottom: 10px;

  transition: all 0.1s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const TimeTextContainer = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
`;

export const HeaderToggleOverlay = styled.div`
  gap: 3px;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));

  position: fixed;
  right: 10px;
  top: 20px;

  display: flex;

  z-index: 999;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    right: calc((100vw - 402px) / 2 + 10px);
    top: 15px;
  }

  @media (min-width: 768px) and (min-height: 874px),
    (hover: hover) and (pointer: fine) and (min-height: 874px) {
    right: calc((100vw - 402px) / 2 + 20px);
    top: calc((100dvh - 898px) / 2 + 36px);
  }
`;

export const FloatingButtonGroup = styled.div<{ $hasTopBtn: boolean }>`
  gap: ${({ $hasTopBtn }) => ($hasTopBtn ? "8px" : "0px")};
  position: fixed;
  right: 10px;
  bottom: 20px;

  display: flex;
  flex-direction: column-reverse;
  gap: 10px;

  z-index: 999;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    right: calc((100vw - 402px) / 2 + 10px);
    bottom: 20px;
  }

  @media (min-width: 768px) and (min-height: 874px),
    (hover: hover) and (pointer: fine) and (min-height: 874px) {
    right: calc((100vw - 402px) / 2 + 20px);
    bottom: calc((100dvh - 898px) / 2 + 32px);
  }
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const HeaderTimeOption = styled.button<{ $active: boolean }>`
  ${setTypo("buttonSm")};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 7px 15px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  background: ${({ $active, theme }) =>
    $active ? theme.colors.bg.brand : theme.colors.bg.olive};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.fg.primaryInverted : theme.colors.bg.brand};

  &:first-child {
    border-top-left-radius: 999px;
    border-bottom-left-radius: 999px;
    border-top-right-radius: ${({ $active }) => ($active ? "999px" : "24px")};
    border-bottom-right-radius: ${({ $active }) =>
      $active ? "999px" : "24px"};
    z-index: ${({ $active }) => ($active ? 2 : 1)};
  }

  &:last-child {
    border-top-right-radius: 999px;
    border-bottom-right-radius: 999px;
    border-top-left-radius: ${({ $active }) => ($active ? "999px" : "24px")};
    border-bottom-left-radius: ${({ $active }) => ($active ? "999px" : "24px")};
    z-index: ${({ $active }) => ($active ? 2 : 1)};
  }

  ${({ $active }) =>
    !$active &&
    css`
      box-shadow: 0 0 4px 0 rgba(113, 122, 114, 0.4);
    `}

  img {
    width: 18px;
    height: 18px;
    ${({ $active }) =>
      !$active &&
      css`
        filter: brightness(0) saturate(100%) invert(18%) sepia(50%)
          saturate(1000%) hue-rotate(80deg);
      `}
  }
`;
export const OnboardingOverlay = styled.div<{ $isVisible: boolean }>`
  transition:
    opacity 0.5s ease-in-out,
    visibility 0.5s;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  pointer-events: none;
  position: fixed;
  right: 10px;
  top: 20px;

  display: flex;

  z-index: 999;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    right: calc((100vw - 402px) / 2 + 10px);
    top: 15px;
  }

  @media (min-width: 768px) and (min-height: 874px),
    (hover: hover) and (pointer: fine) and (min-height: 874px) {
    right: calc((100vw - 402px) / 2 + 20px);
    top: calc((100dvh - 898px) / 2 + 36px);
  }
`;

export const GuideContainer = styled.div`
  transition:
    opacity 0.5s ease-in-out,
    visibility 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GuideText = styled.div`
  margin-top: 45px;
  color: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  span {
    ${setTypo("buttonSm")};
    font-weight: 500;
    white-space: pre-line;
    line-height: 1.4;
    letter-spacing: -0.02em;
  }

  background-color: ${({ theme }) => theme.colors.bg.brand};
  color: ${({ theme }) => theme.colors.fg.primaryInverted};

  padding: 3px 16px 5px 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.fg.primaryInverted};
  border-radius: 999px;

  width: max-content;

  text-align: center;
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
    top: calc(100% - 54px);
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    width: 10px;
    height: 10px;

    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 16 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 10L1 1H15L8 10Z' fill='%23064112'/%3E%3Cpath d='M1 1L8 10L15 1' stroke='%23F2F2F2' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }
`;

export const CloseGuideBtn = styled.button`
  margin-top: 15px;
  padding: 8px 18px;
  border-radius: 999px;
  background: #ffffff;
  border: none;
  ${setTypo("buttonSm")};
  color: ${({ theme }) => theme.colors.fg.primary};
  cursor: pointer;

  position: relative;
  left: 50%;
  transform: translateX(calc(201px - 100% - 120px));
`;
