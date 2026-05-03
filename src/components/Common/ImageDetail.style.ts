import styled from "styled-components";

export const ImageDetailPage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100dvh;
  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    border: 12px solid ${({ theme }) => theme.colors.olive[50]};
    max-height: 874px;
    border-radius: 24px;
    max-width: 402px;
  }
  @media (max-height: 910px) {
    border-radius: 0;
    border: none;
  }

  background: ${({ theme }) => theme.colors.fg.primary};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ImageContent = styled.div`
  width: 100%;
  max-width: 402px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px 0;
  box-sizing: border-box;
`;

export const ImageModalCount = styled.p`
  color: ${({ theme }) => theme.colors.fg.primaryInverted};
  font-size: 24px;
  font-weight: 700;
`;

export const ImageModalImage = styled.img`
  width: 100%;
  height: 500px;
  max-height: 70vh;
  object-fit: contain;
`;

export const ImageModalCloseButton = styled.button`
  width: 354px;
  height: 44px;
  border: none;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.bg.neutral};
  color: ${({ theme }) => theme.colors.fg.primary};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;
