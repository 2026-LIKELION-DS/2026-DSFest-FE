import styled from "styled-components";
import { theme } from "../styles/theme";
const HEADER_HEIGHT = "60px";
const NAV_HEIGHT = "60px";
const INPUT_HEIGHT = "68px";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT} - ${NAV_HEIGHT});

  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bg.olive};
  overflow: hidden;

  position: relative;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    @media (min-height: 874px) {
      height: calc(874px - 24px - ${HEADER_HEIGHT} - ${NAV_HEIGHT});
    }
  }
`;

export const TopBanner = styled.div<{ $isCollapsed: boolean }>`
  position: absolute;
  top: 10px;
  left: 10px;

  width: ${({ $isCollapsed }) => ($isCollapsed ? "44px" : "calc(100% - 20px)")};
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
  cursor: pointer;
  touch-action: pan-y;

  transition: width 0.2s ease, height 0.2s ease, border-radius 0.2s ease,
    padding 0.2s ease;
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

  font-family: ${theme.typography.bodySm.fontFamily};
  font-weight: ${theme.typography.bodySm.fontWeight};
  font-size: ${theme.typography.bodySm.fontSize};
  line-height: ${theme.typography.bodySm.lineHeight};

  color: ${({ theme }) => theme.colors.fg.subtle};
`;

export const BannerTitle = styled.p`
  margin: 0;

  font-family: ${theme.typography.h3.fontFamily};
  font-weight: ${theme.typography.h3.fontWeight};
  font-size: ${theme.typography.h3.fontSize};
  line-height: ${theme.typography.h3.lineHeight};

  color: ${({ theme }) => theme.colors.bg.brand};
`;

export const BannerArrow = styled.span`
  color: ${({ theme }) => theme.colors.fg.subtle};
  font-size: 24px;
  line-height: 24px;
`;

export const ChatArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  padding: 110px 20px 20px;
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

  font-family: ${theme.typography.h4.fontFamily};
  font-weight: ${theme.typography.h4.fontWeight};
  font-size: ${theme.typography.h4.fontSize};
  line-height: ${theme.typography.h4.lineHeight};

  color: ${({ theme }) => theme.colors.bg.brand};
`;

export const InputWrapper = styled.div`
  flex-shrink: 0;
  height: ${INPUT_HEIGHT};

  width: 100%;

  background: ${({ theme }) => theme.colors.bg.neutral};

  display: flex;
  align-items: center;
  justify-content: center;
`;
