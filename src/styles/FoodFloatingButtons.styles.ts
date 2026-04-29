import styled, { css } from "styled-components";

export const ButtonWrapper = styled.div<{ $hasTopBtn: boolean }>`
  position: fixed;
  right: 10px;
  bottom: 20px;

  display: flex;
  flex-direction: column;
  gap: ${({ $hasTopBtn }) => ($hasTopBtn ? "10px" : "0px")};

  z-index: 999;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    right: calc((100vw - 402px) / 2 + 10px);
    bottom: 20px;
  }

  @media (min-width: 768px) and (min-height: 874px),
    (hover: hover) and (pointer: fine) and (min-height: 874px) {
    right: calc((100vw - 402px) / 2 + 20px);
    bottom: calc((100dvh - 898px) / 2 + 32px);
  }
`;

export const FloatingButton = styled.button<{ $isVisible?: boolean }>`
  width: 52px;
  height: 52px;

  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.bg.brand};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $isVisible }) =>
    $isVisible === false &&
    css`
      width: 0;
      height: 0;
      margin: 0;
      padding: 0;
      opacity: 0;
      visibility: hidden;
      transform: scale(0);
      pointer-events: none;
    `}

  &:active {
    transform: scale(0.9);
  }
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;