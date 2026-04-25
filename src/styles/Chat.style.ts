import styled from "styled-components";
import { theme } from "../styles/theme";

export const Row = styled.div<{ $isMine: boolean }>`
  display: flex;
  justify-content: ${({ $isMine }) => ($isMine ? "flex-end" : "flex-start")};
  margin-bottom: 12px;
`;

export const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
`;

export const Bubble = styled.div<{ $isMine: boolean }>`
  max-width: 260px;
  padding: 12px 16px;
  border-radius: 16px;

  background: ${({ $isMine, theme }) =>
    $isMine ? theme.colors.bg.brand : theme.colors.bg.neutral};

  color: ${({ $isMine, theme }) =>
    $isMine ? theme.colors.fg.primaryInverted : theme.colors.fg.primary};

  font-family: ${theme.typography.bodySm.fontFamily};
  font-weight: ${theme.typography.bodySm.fontWeight};
  font-size: ${theme.typography.bodySm.fontSize};
  line-height: ${theme.typography.bodySm.lineHeight};
`;

export const Time = styled.span`
  color: ${({ theme }) => theme.colors.fg.subtle};

  font-family: ${theme.typography.bodySm.fontFamily};
  font-weight: ${theme.typography.bodySm.fontWeight};
  font-size: ${theme.typography.bodySm.fontSize};
`;
