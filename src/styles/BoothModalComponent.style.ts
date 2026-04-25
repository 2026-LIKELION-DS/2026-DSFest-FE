import styled, { css } from "styled-components";
import { typography } from "./theme";

const setTypo = (key: keyof typeof typography) => {
  const typo = typography[key];
  return css`
    font-family: ${typo.fontFamily};
    font-weight: ${typo.fontWeight};
    font-size: ${typo.fontSize};
    line-height: ${typo.lineHeight};
  `;
};

export const ModalOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 402px;
  height: 100dvh;
  @media (min-height: 874px) {
    border: 12px solid ${({ theme }) => theme.colors.olive[50]};
    height: 874px;
    border-radius: 24px;
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

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 340px;
  max-height: 90%;
  background: ${({ theme }) => theme.colors.bg.neutral};
  border-radius: 4px;
  position: relative;

  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

export const StatusBadge = styled.div<{ $status?: string }>`
  position: absolute;
  top: -15px;
  left: 24px;
  padding: 6px 16px;
  border-radius: 4px;
  ${setTypo("h3")};
  ${({ $status, theme }) => {
    switch ($status) {
      case "운영 중":
        return css`
          background: ${theme.colors.bg.olive};
          color: ${theme.colors.bg.brand};
          border: 1px solid ${theme.colors.bg.brand};
        `;
      case "운영 예정":
        return css`
          background: #fff;
          color: ${theme.colors.bg.brand};
          border: 1px solid ${theme.colors.bg.brand};
        `;
      default:
        return css`
          background: ${theme.colors.bg.disabled};
          color: ${theme.colors.fg.disabled};
          border: 1px solid ${theme.colors.bg.disabled};
        `;
    }
  }}
`;

export const Title = styled.h2`
  ${setTypo("h1")};
  color: ${({ theme }) => theme.colors.bg.brandLight};
  text-align: center;
  margin-bottom: 0px;
`;
export const Divider = styled.hr`
  border: none;
  border-top: 0.5px solid ${({ theme }) => theme.colors.bg.brand};
  margin: 0;
`;
export const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  ${setTypo("bodySm")};
  color: ${({ theme }) => theme.colors.fg.primary};
`;
export const Icons = styled.img`
  width: 21px;
`;
export const ImageRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;
export const BoothImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.bg.oliveLight};
  cursor: pointer;
`;
export const Description = styled.div`
  ${setTypo("bodyMd")};
  color: ${({ theme }) => theme.colors.fg.primary};
  word-break: keep-all;
  line-height: 1.5;
`;
export const LinkSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 0 4px;
`;
export const LinkIcon = styled.img`
  width: 21px;
  margin-top: 5px;
`;
export const LinkTagGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;
export const LinkTag = styled.a`
  display: inline-flex;
  align-items: center;
  width: max-content;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.subtle};
  background: ${({ theme }) => theme.colors.bg.neutral};
  color: ${({ theme }) => theme.colors.fg.primary};
  text-decoration: none;
  ${setTypo("bodySm")};
  cursor: pointer;
`;
export const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 10px;
  padding-top: 8px;
`;
export const CloseButton = styled.button`
  padding: 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.subtle};
  background: ${({ theme }) => theme.colors.bg.neutral};
  ${setTypo("buttonMd")};
  cursor: pointer;
`;
export const ActionButton = styled.button`
  padding: 12px;
  border-radius: 999px;
  border: none;
  background: ${({ theme }) => theme.colors.bg.brand};
  color: ${({ theme }) => theme.colors.bg.neutral};
  ${setTypo("buttonMd")};
  font-weight: 700;
  cursor: pointer;
`;

export const FullImageOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 402px;
  height: 100dvh;
  @media (min-height: 874px) {
    border: 12px solid ${({ theme }) => theme.colors.olive[50]};
    height: 874px;
    border-radius: 24px;
  }

  background: ${({ theme }) => theme.colors.fg.primary};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
`;

export const SwiperWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    user-select: none;
  }

  .swiper-pagination-fraction {
    top: 20px;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    pointer-events: none;
  }
`;

export const FullImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

export const FullCloseButton = styled.button`
  width: 90%;
  padding: 8px;
  background: #fff;
  border-radius: 999px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  z-index: 2100;
  ${setTypo("buttonMd")};
`;
