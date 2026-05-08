import styled from "styled-components";
import { theme } from "./theme";

export const ContestNotice = styled.article`
  position: relative;
  overflow: hidden;

  margin-top: 22px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.oliveLight};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.olive[50]};

  .bubble {
    position: absolute;
    pointer-events: none;
    z-index: 0;
  }

  .bubble1 {
    top: 0;
    left: 0;
  }

  .bubble2 {
    top: 58px;
    right: 5px;
  }

  .bubble3 {
    top: 112px;
    right: 0px;
  }

  > *:not(img) {
    position: relative;
    z-index: 1;
  }
`;

export const NoticeTitle = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.green[700]};
  font-family: ${theme.typography.h3};
`;

export const NoticeList = styled.ol`
  margin: 15px 0 15;
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  div {
    font-family: ${theme.typography.bodyMd};
  }
`;

export const NoticeCaption = styled.p`
  margin: 10px 0 18px;
  color: ${({ theme }) => theme.colors.fg.subtle};
  font-family: ${theme.typography.bodyMd};
`;

export const NoticeBubble = styled.img<{
  $top?: string;
  $right?: string;
}>;

export const ListTitle = styled.div`
  font-family: ${theme.typography.h3};
  color: ${({ theme }) => theme.colors.fg.primary};
  margin-bottom: 4px;
`;
