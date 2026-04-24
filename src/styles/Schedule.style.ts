import styled from "styled-components";
import { theme } from "./theme";

export const SchedulePage = styled.div`
  margin: 0 auto;
  padding: 0 24px 24px;
  background: #fff;
  overflow-x: hidden;
`;

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0 0;
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
`;
