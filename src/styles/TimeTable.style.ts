import styled from "styled-components";
import { theme } from "./theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;

export const DayHeader = styled.div`
  font-family: ${theme.typography.h2};
  padding: 6px 12px;
  border: 0.5px solid ${({ theme }) => theme.colors.bg.brand};
  color: ${({ theme }) => theme.colors.bg.brand};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.bg.oliveLight};
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

export const Container = styled.div`
  border: 0.5px solid ${({ theme }) => theme.colors.bg.brand};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 24px 10px 24px;
  background-color: ${({ theme }) => theme.colors.bg.offWhite};
`;

export const Guide = styled.p`
  font-family: ${theme.typography.bodySm};
  color: ${({ theme }) => theme.colors.fg.subtle};
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  align-items: stretch;
`;

export const DotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24px;
  margin-top: 10px;
`;

export const DotIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const Line = styled.div`
  width: 1px;
  flex: 1;
  min-height: 24px;
  background-color: ${({ theme }) => theme.colors.bg.brandLight};
  margin-bottom: -10px;
`;

export const Card = styled.div<{ $isActive: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  background: ${({ $isActive }) =>
    $isActive
      ? "linear-gradient(124deg, rgba(255, 235, 104, 0.30) -11.85%, rgba(213, 237, 74, 0.19) 16.19%, rgba(39, 123, 49, 0.00) 84.88%), var(--brand-light, #277B31);"
      : theme.colors.bg.neutralDeep};
  img {
    width: 16px;
    height: 16px;
    margin-left: auto;
    flex-shrink: 0;
  }
`;

export const Title = styled.span<{ $isActive: boolean }>`
  white-space: pre-line;
  font-family: ${theme.typography.h3};
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.fg.primaryInverted : theme.colors.fg.primary};
`;

export const Time = styled.span<{ $isActive: boolean }>`
  font-family: ${theme.typography.bodyMd};

  color: ${({ $isActive }) =>
    $isActive ? theme.colors.fg.primaryInverted : theme.colors.fg.subtle};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
