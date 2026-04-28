import styled from "styled-components";
import { theme } from "./theme";

export const ScheduleButton = styled.div`
  /* position: sticky; */
  display: flex;
  justify-content: center;
  z-index: 100;
`;

export const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 100px;
  padding: 0 24px;
  height: 44px;
  background: ${({ theme }) => theme.colors.bg.brand};
  box-shadow: 0 0 4px 0 rgba(113, 122, 114, 0.4);
`;

export const ButtonIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const ButtonContent = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.fg.primaryInverted};
  font-family: ${theme.typography.buttonMd};
`;
