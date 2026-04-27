import styled from "styled-components";
import { theme } from "./theme";

export const Page = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.bg.neutral};

  display: flex;
  flex-direction: column;
  padding: 16px 18px 18px;

  overflow: hidden; /* 중요 */
`;

export const TopArea = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
`;

export const ClearButton = styled.button`
  padding: 12px 24px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.fg.critical};
  background: transparent;
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: center;
  font-family: ${theme.typography.buttonMd.fontFamily};
  font-weight: ${theme.typography.buttonMd.fontWeight};
  font-size: ${theme.typography.buttonMd.fontSize};
  line-height: ${theme.typography.buttonMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.critical};
  cursor: pointer;
`;

export const NoticeList = styled.div`
  flex: 1;
  min-height: 0; /* 중요 */
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const NoticeItem = styled.button`
  width: 100%;
  padding: 0 0 12px;
  margin-bottom: 12px;

  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.oliveLight};
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: space-between;

  text-align: left;
  cursor: pointer;
`;

export const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Category = styled.span`
  font-family: ${theme.typography.h3.fontFamily};
  font-weight: ${theme.typography.h3.fontWeight};
  font-size: ${theme.typography.h3.fontSize};
  line-height: ${theme.typography.h3.lineHeight};

  color: ${({ theme }) => theme.colors.green[700]};
`;

export const Title = styled.span`
  font-family: ${theme.typography.h3.fontFamily};
  font-weight: ${theme.typography.h3.fontWeight};
  font-size: ${theme.typography.h3.fontSize};
  line-height: ${theme.typography.h3.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const Chevron = styled.img`
  width: 24px;
  height: 24px;
`;

export const BottomArea = styled.div`
  flex-shrink: 0;
  width: 100%;
  padding-top: 12px;
`;

export const WriteButton = styled.button`
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.bg.brand};

  font-family: ${theme.typography.buttonMd.fontFamily};
  font-weight: ${theme.typography.buttonMd.fontWeight};
  font-size: ${theme.typography.buttonMd.fontSize};
  line-height: ${theme.typography.buttonMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primaryInverted};
  cursor: pointer;
`;
