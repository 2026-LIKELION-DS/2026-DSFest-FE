import styled from "styled-components";
import { theme } from "./theme";

export const ContestVotePage = styled.div`
  margin: 0 auto;
  padding: 0 24px 24px;
  background: #fff;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
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
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;
