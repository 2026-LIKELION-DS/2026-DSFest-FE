import styled from "styled-components";
import { theme } from "./theme";

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 24px;
  width: 344px;
  margin: 24px;
  max-width: 480px;
  max-height: 610px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h2`
  font-family: ${theme.typography.h1};
  text-align: center;
  color: ${({ theme }) => theme.colors.bg.brandLight};
  margin: 0;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 0.5px solid var(--brand, #0b4112);
  margin: 0;
`;

export const ImageRow = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Image = styled.img`
  flex: 1px;
  height: 180px;
  width: 144px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
`;

export const Content = styled.p`
  font-family: ${theme.typography.bodyMd};
  margin: 0;
  white-space: pre-wrap;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 243px;
`;

export const CloseButton = styled.button`
  width: 100%;
  padding: 14px 0 14px 0;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 44px;
  border-radius: 100px;
  border: 0.5px solid var(--Stroke-subtle, #9e9e9e);
  font-family: ${theme.typography.buttonMd};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const CommonModalOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100dvh;
  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    border: 12px solid ${({ theme }) => theme.colors.olive[50]};
    height: 874px;
    border-radius: 24px;
    max-width: 402px;
  }
  @media (max-height: 910px) {
    border-radius: 0;
    border: none;
  }

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

export const CommonModalContainer = styled.div`
  width: 100%;
  max-width: 354px;
  max-height: 90%;
  border-radius: 4px;
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
