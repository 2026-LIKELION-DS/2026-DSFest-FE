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
  color: ${({ theme }) => theme.colors.bg.brandLight};
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
