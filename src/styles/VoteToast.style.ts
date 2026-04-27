// import styled from "styled-components";
// import { theme } from "./theme";

// export const VoteToastWrapper = styled.div`
//   display: flex;
//   height: 48px;
//   padding: 12px 24px;
//   gap: 10px;
//   border-radius: 4px;
//   background-color: ${theme.colors.bg.neutral};
//   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
// `;

// export const GoodIcon = styled.img`
//   width: 24px;
// `;
// export const ToastText = styled.div`
//   color: ${theme.colors.fg.primary};
//   font-family: ${theme.typography.bodyMd};
// `;

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

export const VoteToastWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${slideUp} 0.4s ease forwards;
`;

export const GoodIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const ToastText = styled.span`
  font-size: 14px;
`;
