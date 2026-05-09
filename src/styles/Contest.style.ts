import styled from "styled-components";
const HEADER_HEIGHT = "60px";

export const ContestImg = styled.img`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-height: 300px;
  margin-top: 18.72px;
`;

export const ContestPage = styled.div`
  background: ${({ theme }) => theme.colors.bg.neutral};
  width: 100%;
  box-sizing: border-box;
  height: calc(100svh - ${HEADER_HEIGHT});
  max-height: calc(100svh - ${HEADER_HEIGHT});
  min-height: 0;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  position: relative;

  @supports not (height: 100svh) {
    height: calc(100vh - ${HEADER_HEIGHT});
    max-height: calc(100vh - ${HEADER_HEIGHT});
  }

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    height: calc(100vh - ${HEADER_HEIGHT});
    max-height: none;

    @media (min-height: 874px) {
      height: calc(874px - 24px - ${HEADER_HEIGHT});
    }
  }
`;

export const VoteButtonWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.bg.neutral};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

export const ChatArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.bg.neutral};

  padding: 0 20px;

  -ms-overflow-style: none;
  scrollbar-width: none;

  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
