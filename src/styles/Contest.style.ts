import styled from "styled-components";

export const ContestImg = styled.img`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-height: 300px;
  margin-top: 18.72px;
`;

export const ContestPage = styled.div`
  margin: 0 auto;
  padding: 0 24px 24px;
  background: ${({ theme }) => theme.colors.bg.neutral};
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  min-height: 68.5vh;
`;

export const VoteButtonWrapper = styled.div`
  position: fixed;
  bottom: calc(50% - 400px);
  transform: translateX(85px);
`;
