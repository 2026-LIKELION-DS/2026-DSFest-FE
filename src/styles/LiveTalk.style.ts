import styled from "styled-components";
import { theme } from "../styles/theme";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bg.olive};
  position: relative;
`;

export const TopBanner = styled.div<{ $isCollapsed: boolean }>`
  position: absolute;
  top: 12px;
  left: ${({ $isCollapsed }) => ($isCollapsed ? "20px" : "50%")};
  transform: ${({ $isCollapsed }) =>
    $isCollapsed ? "none" : "translateX(-50%)"};

  width: ${({ $isCollapsed }) => ($isCollapsed ? "44px" : "90%")};
  height: ${({ $isCollapsed }) => ($isCollapsed ? "44px" : "66px")};

  background: ${({ theme }) => theme.colors.bg.neutral};
  border-radius: ${({ $isCollapsed }) => ($isCollapsed ? "50%" : "4px")};

  display: flex;
  align-items: center;
  justify-content: ${({ $isCollapsed }) =>
    $isCollapsed ? "center" : "flex-start"};
  gap: 12px;
  padding: ${({ $isCollapsed }) => ($isCollapsed ? "0" : "0 20px")};

  z-index: 10;
`;

export const BannerIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const BannerTextBox = styled.div`
  flex: 1;
  padding-left: 10px;
`;

export const BannerSubText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.fg.subtle};

  font-family: ${theme.typography.bodySm.fontFamily};
  font-weight: ${theme.typography.bodySm.fontWeight};
  font-size: ${theme.typography.bodySm.fontSize};
  line-height: ${theme.typography.bodySm.lineHeight};
`;

export const BannerTitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.fg.primary};

  font-family: ${theme.typography.bodyMd.fontFamily};
  font-weight: ${theme.typography.bodyMd.fontWeight};
  font-size: ${theme.typography.bodyMd.fontSize};
  line-height: ${theme.typography.bodyMd.lineHeight};
`;

export const BannerArrow = styled.span`
  color: ${({ theme }) => theme.colors.fg.subtle};
  font-size: 24px;
  line-height: 24px;
`;

export const ChatArea = styled.div`
  height: 660px;
  overflow-y: auto;
  padding: 110px 20px 0;
  background: ${({ theme }) => theme.colors.bg.olive};

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DateText = styled.p`
  margin: 0 0 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.fg.primary};

  font-family: ${theme.typography.bodySm.fontFamily};
  font-weight: 700;
  font-size: ${theme.typography.bodySm.fontSize};
  line-height: ${theme.typography.bodySm.lineHeight};
`;

export const InputWrapper = styled.div`
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.bg.olive};
`;
