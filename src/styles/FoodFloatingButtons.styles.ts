import styled from "styled-components";

export const ButtonWrapper = styled.div`
  position: fixed;
  right: 10px;
  bottom: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  z-index: 9999;

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

export const FloatingButton = styled.button`
  width: 52px;
  height: 52px;

  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.bg.brand};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
