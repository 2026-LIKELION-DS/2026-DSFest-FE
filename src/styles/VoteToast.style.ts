import { theme } from "./theme";
import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

export const VoteToastWrapper = styled.div<{ $hiding: boolean }>`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 12px 24px;
  gap: 10px;
  border-radius: 4px;
  background-color: ${theme.colors.bg.neutral};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  animation: ${({ $hiding }) => ($hiding ? slideDown : slideUp)} 0.4s ease
    forwards;
`;

export const GoodIcon = styled.img`
  width: 24px;
`;

export const ToastText = styled.span`
  color: ${theme.colors.fg.primary};
  font-family: ${theme.typography.bodyMd};
`;
