import styled from "styled-components";
import { theme } from "./theme";
const HEADER_HEIGHT = "60px";

export const ContestVotePage = styled.div`
  margin: 0 auto;
  display: flex;

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

export const VoteHeader = styled.div`
  padding: 14px 0;
`;
export const PhotoPage = styled.div`
  font-family: ${theme.typography.h2};
  color: ${theme.colors.bg.brandLight};
  margin-bottom: 8px;
`;
export const SubjectText = styled.div`
  padding-top: 12px;
  font-family: ${theme.typography.h2};
`;
export const SubText = styled.div`
  padding-bottom: 12px;
  font-family: ${theme.typography.decorationMd};
  color: ${theme.colors.stroke.subtle};
`;

export const ActionButton = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 100px;
  font-family: ${theme.typography.buttonMd};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  background: ${({ disabled }) =>
    disabled ? theme.colors.bg.disabled : theme.colors.bg.brand};
  color: ${({ disabled }) => (disabled ? theme.colors.fg.disabled : "#fff")};
  cursor: pointer;
  margin-top: 24px 0;
  margin: 0 20px;
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 30px;
`;

export const ChatArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  padding: 0 20px;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
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
  margin-top: 20px;
`;
