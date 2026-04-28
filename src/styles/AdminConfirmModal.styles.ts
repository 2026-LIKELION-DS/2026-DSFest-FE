import styled from "styled-components";
import { theme } from "./theme";

export const Overlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;

  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    width: 402px;

    @media (min-height: 874px) {
      height: 874px;
      border-radius: 24px;
      overflow: hidden;
    }
  }
`;

export const ModalBox = styled.div`
  width: 263px;
  height: 158px;

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.bg.brand};
  background: ${({ theme }) => theme.colors.bg.offWhite};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.p`
  margin: 0 0 28px;

  font-family: ${theme.typography.h2.fontFamily};
  font-weight: ${theme.typography.h2.fontWeight};
  font-size: ${theme.typography.h2.fontSize};
  line-height: ${theme.typography.h2.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const ButtonArea = styled.div`
  display: flex;
  gap: 12px;
`;

const BaseButton = styled.button`
  width: 88px;
  height: 44px;

  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: ${theme.typography.buttonMd.fontFamily};
  font-weight: ${theme.typography.buttonMd.fontWeight};
  font-size: ${theme.typography.buttonMd.fontSize};
  line-height: ${theme.typography.buttonMd.lineHeight};
`;

export const CancelButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.stroke.subtle};
  background: ${({ theme }) => theme.colors.bg.offWhite};
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const ConfirmButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.bg.brand};
  background: ${({ theme }) => theme.colors.bg.brand};
  color: ${({ theme }) => theme.colors.fg.primaryInverted};
`;

export const DeleteButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.fg.critical};
  background: ${({ theme }) => theme.colors.bg.offWhite};
  color: ${({ theme }) => theme.colors.fg.critical};
`;
