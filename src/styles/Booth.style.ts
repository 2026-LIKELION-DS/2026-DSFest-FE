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

export const FloatingButtonGroup = styled.div<{ $hasTopBtn: boolean }>`
  bottom: 13px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(calc(-10%), calc(35%));

  width: 100%;
  height: 100dvh;
  @media (min-width: 768px) or (max-height: 973px) {
    height: 874px;
    border-radius: 24px;
    max-width: 402px;
  }
`;

export const FloatingCircleBtn = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.bg.brand};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;

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
  font-size: 14px;
  color: #c0c0c0;
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

  border-radius: 9999px;

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
  position: fixed;
  top: 13px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 3px;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));

  left: 50%;
  transform: translateX(calc(201px - 100% - 25px));
  @media (min-height: 874px) {
    top: calc(50% - 437px + 13px + 12px);
  }
  @media (max-width: 320px) {
    transform: translateX(calc(201px - 100% - 60px));
  }
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
export const OnboardingOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 425px;
  height: 100dvh;

  @media (min-height: 874px) {
    border: 12px solid ${({ theme }) => theme.colors.olive[50]};
    height: 874px;
    border-radius: 24px;
  }

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  overflow: hidden;
`;

export const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  left: 50%;

  transform: translateX(calc(-50% + 85px));

  margin-top: 3px;

  @media (max-width: 320px) {
    transform: translateX(calc(-50% + 50px));
  }
`;

export const WhiteHighlight = styled.div`
  background-color: #ffffff;
  border-radius: 999px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  left: 50%;
  transform: translateX(calc(201px - 100% - 25px));
`;

export const FakeHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GuideText = styled.div`
  margin-top: 20px;
  color: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  position: relative;
  left: 50%;
  transform: translateX(calc(50% - 50px));

  img {
    width: 15px;
    margin-bottom: 10px;
  }

  span {
    ${setTypo("h3")};
    font-weight: 500;
    white-space: pre-line;
    line-height: 1.4;
    letter-spacing: -0.02em;
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
