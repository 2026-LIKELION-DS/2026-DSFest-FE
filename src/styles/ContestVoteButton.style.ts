import styled from "styled-components";
import { theme } from "./theme";

type ContestPhase = "before" | "entry" | "vote";

export const ContestVoteButtonPage = styled.div``;

export const ContestTab = styled.div`
  margin-top: auto;
  padding-top: 16px;
`;

export const TimeLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${theme.typography.h4};
  margin-bottom: 5px;
  gap: 4px;
`;
export const voteButton = styled.button<{ $phase: ContestPhase }>`
  background: ${({ $phase, theme }) =>
    $phase === "before" ? theme.colors.bg.disabled : theme.colors.bg.brand};
  color: ${({ $phase, theme }) =>
    $phase === "before" ? theme.colors.fg.disabled : "#fff"};
  font-family: ${theme.typography.buttonMd};
  width: 100%;
  height: 44px;
  padding: 0 24px;
  border-radius: 100px;
  cursor: ${({ $phase }) => ($phase === "before" ? "default" : "pointer")};
`;

export const span = styled.div`
  color: ${({ theme }) => theme.colors.fg.subtle};
  font-family: ${theme.typography.h4};
`;
