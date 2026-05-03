import styled from "styled-components";
import { theme } from "./theme";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.9);
  z-index: 10000;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    left: 50%;
    right: auto;
    width: 402px;
    transform: translateX(-50%);
  }

  @media (min-width: 768px) and (min-height: 874px),
    (hover: hover) and (pointer: fine) and (min-height: 874px) {
    top: calc((100dvh - 874px) / 2 + 12px);
    bottom: auto;

    width: calc(402px - 22px);
    height: calc(874px - 24px);

    border-radius: 12px;
    overflow: hidden;
  }
`;

export const Counter = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;

  text-align: center;

  font-family: ${theme.typography.h1.fontFamily};
  font-weight: ${theme.typography.h1.fontWeight};
  font-size: ${theme.typography.h1.fontSize};
  line-height: ${theme.typography.h1.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primaryInverted};
`;

export const ImageBox = styled.button`
  width: 100%;
  height: 431px;

  padding: 0;
  background: #d9d9d9;

  display: flex;
  align-items: center;
  justify-content: center;

  touch-action: pan-y;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const CloseButton = styled.button`
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 24px;

  height: 44px;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.bg.neutral};

  font-family: ${theme.typography.buttonMd.fontFamily};
  font-weight: ${theme.typography.buttonMd.fontWeight};
  font-size: ${theme.typography.buttonMd.fontSize};
  line-height: ${theme.typography.buttonMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;
