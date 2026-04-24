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
  max-width: 480px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.bg.neutral};
  min-height: 100vh;
`;

export const DayNav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.oliveLight};
`;

export const DayTab = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.bg.brandLight : theme.colors.fg.subtle};
`;

export const Label = styled.span`
  ${setTypo("h1")};
  margin: 10px 0;
`;

export const DateText = styled.span`
  ${setTypo("bodyMd")};
  display: flex;
  gap: 5px;
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

export const TimeFilter = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  z-index: 10;
  gap: 3px;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
`;

export const TimeOption = styled.button<{ $active: boolean }>`
  ${setTypo("bodySm")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 7px 15px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  background: ${({ $active, theme }) =>
    $active ? theme.colors.bg.brand : "#E3E9D2"};
  color: ${({ $active, theme }) =>
    $active ? "#FFFFFF" : theme.colors.bg.brand};

  &:first-child {
    border-top-left-radius: 999px;
    border-bottom-left-radius: 999px;
    border-top-right-radius: ${({ $active }) => ($active ? "999px" : "4px")};
    border-bottom-right-radius: ${({ $active }) => ($active ? "999px" : "4px")};
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
