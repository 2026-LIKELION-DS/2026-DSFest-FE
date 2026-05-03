import styled from "styled-components";
import { theme } from "./theme";

const HEADER_HEIGHT = "60px";

export const Page = styled.div`
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT});
  min-height: calc(100vh - ${HEADER_HEIGHT});

  background: ${({ theme }) => theme.colors.bg.neutral};

  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    @media (min-height: 874px) {
      height: calc(874px - 24px - ${HEADER_HEIGHT});
      min-height: calc(874px - 24px - ${HEADER_HEIGHT});
    }
  }
`;

export const FormArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  padding: 20px 18px 20px;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Field = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;

  font-family: ${theme.typography.buttonMd.fontFamily};
  font-weight: ${theme.typography.buttonMd.fontWeight};
  font-size: ${theme.typography.buttonMd.fontSize};
  line-height: ${theme.typography.buttonMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const TitleInput = styled.input`
  width: 100%;
  margin-top: 8px;
  height: 44px;

  padding: 12px 16px;

  border: 1px solid ${({ theme }) => theme.colors.stroke.subtle};
  border-radius: 4px;
  outline: none;

  font-family: ${theme.typography.bodyMd.fontFamily};
  font-weight: ${theme.typography.bodyMd.fontWeight};
  font-size: ${theme.typography.bodyMd.fontSize};
  line-height: ${theme.typography.bodyMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
  background: ${({ theme }) => theme.colors.bg.neutral};

  &::placeholder {
    color: ${({ theme }) => theme.colors.fg.subtle};

    font-family: ${theme.typography.bodyMd.fontFamily};
    font-weight: ${theme.typography.bodyMd.fontWeight};
    font-size: ${theme.typography.bodyMd.fontSize};
    line-height: ${theme.typography.bodyMd.lineHeight};
  }
`;

export const TagButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const TagButton = styled.button<{ $isSelected: boolean }>`
  height: 32px;
  padding: 4px 12px;

  border-radius: 999px;
  border: 1px solid
    ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.bg.brand : theme.colors.stroke.subtle};

  background: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.bg.brand : theme.colors.bg.neutral};

  font-family: ${theme.typography.buttonMd.fontFamily};
  font-weight: ${theme.typography.buttonMd.fontWeight};
  font-size: ${theme.typography.buttonMd.fontSize};
  line-height: ${theme.typography.buttonMd.lineHeight};

  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.fg.primaryInverted : theme.colors.fg.primary};
`;

export const EmergencyField = styled.label<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  width: fit-content;
  margin-bottom: 24px;
  cursor: pointer;

  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.bg.brand : theme.colors.fg.primary};
`;
export const EmergencyText = styled.span`
  font-family: ${theme.typography.buttonMd.fontFamily};
  font-weight: ${theme.typography.buttonMd.fontWeight};
  font-size: ${theme.typography.buttonMd.fontSize};
  line-height: ${theme.typography.buttonMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;
export const RadioInput = styled.input`
  width: 18px;
  height: 18px;
  margin: 0;

  accent-color: ${({ theme }) => theme.colors.bg.brand}; /* 🔥 핵심 */
  cursor: pointer;
`;
export const ContentTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  margin-top: 8px;
  padding: 12px 16px;

  border: 1px solid ${({ theme }) => theme.colors.stroke.subtle};
  border-radius: 4px;
  outline: none;
  resize: vertical;

  font-family: ${theme.typography.bodyMd.fontFamily};
  font-weight: ${theme.typography.bodyMd.fontWeight};
  font-size: ${theme.typography.bodyMd.fontSize};
  line-height: ${theme.typography.bodyMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
  background: ${({ theme }) => theme.colors.bg.neutral};

  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.fg.subtle};
  }
`;
export const ImageScrollArea = styled.div`
  display: flex;
  gap: 12px;

  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  padding-bottom: 4px;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const ImageAddBox = styled.button`
  flex: 0 0 144px;
  min-width: 144px;
  width: 144px;
  height: 180px;
  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.stroke.oliveLight};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.bg.neutral};

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  white-space: nowrap;

  font-family: ${theme.typography.h3.fontFamily};
  font-weight: ${theme.typography.h3.fontWeight};
  font-size: ${theme.typography.h3.fontSize};
  line-height: ${theme.typography.h3.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const BottomButtonArea = styled.div`
  flex-shrink: 0;

  padding: 10px 18px;
  background: ${({ theme }) => theme.colors.bg.neutral};
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 44px;

  border-radius: 999px;
  background: ${({ theme }) => theme.colors.bg.brand};

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: ${theme.typography.buttonMd.fontFamily};
  font-weight: ${theme.typography.buttonMd.fontWeight};
  font-size: ${theme.typography.buttonMd.fontSize};
  line-height: ${theme.typography.buttonMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primaryInverted};
`;
export const ImageBox = styled.div`
  flex: 0 0 144px;
  min-width: 144px;
  width: 144px;
  height: 180px;
  flex-shrink: 0;

  border-radius: 4px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grey[100]};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
