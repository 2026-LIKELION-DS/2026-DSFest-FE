import styled from "styled-components";
import { theme } from "./theme";

// export const ContestPage = styled.div`
//   margin: 0 auto;
//   padding: 0 24px 24px;
//   background: ${({ theme }) => theme.colors.bg.neutral};
//   overflow-x: hidden;
// `;

export const ContestImg = styled.img`
  position: relative;
  overflow: hidden;
  width: 100%;
  /* max-height: 172.876px;
  object-fit: contain; */
  max-height: 300px;
  margin-top: 18.72px;
`;

// export const ContestTab = styled.div``;
export const ContestPage = styled.div`
  margin: 0 auto;
  padding: 0 24px 24px;
  background: ${({ theme }) => theme.colors.bg.neutral};
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  min-height: 68.5vh;
`;

export const ContestTab = styled.div`
  margin-top: auto;
  padding-top: 16px;
`;
//
export const TimeLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${theme.typography.h4};
`;
export const voteButton = styled.button`
  background: ${({ theme }) => theme.colors.bg.disabled};
  color: ${({ theme }) => theme.colors.fg.disabled};
  font-family: ${theme.typography.buttonMd};
  width: 100%;
  height: 44px;
  padding: 0 24px;
  border-radius: 100px;
`;

export const span = styled.div`
  color: ${({ theme }) => theme.colors.fg.subtle};
  font-family: ${theme.typography.h4};
`;
