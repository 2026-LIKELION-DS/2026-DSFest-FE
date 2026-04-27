import styled from "styled-components";
import { theme } from "./theme";

export const Page = styled.div`
  width: 100%;

  height: calc(100vh - 60px);
  min-height: calc(100vh - 60px);

  background: ${({ theme }) => theme.colors.bg.neutral};

  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    @media (min-height: 874px) {
      height: calc(874px - 24px - 60px);
      min-height: calc(874px - 24px - 60px);
    }
  }
`;

export const Content = styled.div`
  flex: 1;
  min-height: 0;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  padding: 20px 18px 0;
`;

export const FixedTopArea = styled.div`
  flex-shrink: 0;
`;

export const Title = styled.h1`
  margin: 0 0 20px;

  font-family: ${theme.typography.h1.fontFamily};
  font-weight: ${theme.typography.h1.fontWeight};
  font-size: ${theme.typography.h1.fontSize};
  line-height: ${theme.typography.h1.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const ImageScrollArea = styled.div`
  display: flex;
  gap: 12px;

  overflow-x: auto;
  margin-bottom: 20px;
  padding-bottom: 4px;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const AddImageBox = styled.button`
  flex: 0 0 144px;
  height: 180px;

  border: 1px solid ${({ theme }) => theme.colors.stroke.oliveLight};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.bg.neutral};

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  font-family: ${theme.typography.h3.fontFamily};
  font-weight: ${theme.typography.h3.fontWeight};
  font-size: ${theme.typography.h3.fontSize};
  line-height: ${theme.typography.h3.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const ImageBox = styled.div`
  flex: 0 0 144px;
  height: 180px;

  border-radius: 4px;
  background: ${({ theme }) => theme.colors.grey[100]};
`;

export const BodyText = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  padding-bottom: 16px;

  font-family: ${theme.typography.bodyMd.fontFamily};
  font-weight: ${theme.typography.bodyMd.fontWeight};
  font-size: ${theme.typography.bodyMd.fontSize};
  line-height: ${theme.typography.bodyMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
  white-space: pre-line;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const BottomButtonArea = styled.div`
  position: sticky;
  bottom: 10px;
  z-index: 50;

  display: flex;
  gap: 12px;

  margin-top: 24px;
  padding: 0 18px 10px;

  background: ${({ theme }) => theme.colors.bg.neutral};
`;

export const BaseButton = styled.button`
  flex: 1;
  height: 44px;

  border-radius: 999px;
  background: ${({ theme }) => theme.colors.bg.offWhite};

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: ${theme.typography.buttonMd.fontFamily};
  font-weight: ${theme.typography.buttonMd.fontWeight};
  font-size: ${theme.typography.buttonMd.fontSize};
  line-height: ${theme.typography.buttonMd.lineHeight};
`;

export const EditButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.stroke.subtle};
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const DeleteButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.fg.critical};
  color: ${({ theme }) => theme.colors.fg.critical};
`;
