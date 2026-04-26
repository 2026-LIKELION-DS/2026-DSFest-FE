import styled from "styled-components";

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
    top: calc((100dvh - 874px) / 2);
    bottom: auto;
    height: 874px;

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
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

export const ImageBox = styled.button`
  width: 100%;
  height: 232px;

  padding: 0;
  background: #d9d9d9;

  display: flex;
  align-items: center;
  justify-content: center;
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

  height: 36px;
  border-radius: 999px;
  background: #ffffff;

  color: #000000;
  font-size: 12px;
  font-weight: 500;
`;