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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 10px;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 340px;
  max-height: 610px;
  background: ${({ theme }) => theme.colors.bg.neutral};
  border-radius: 4px;
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 0;
  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;

export const StatusBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 24px;
  background: ${({ theme }) => theme.colors.bg.olive};
  color: ${({ theme }) => theme.colors.bg.brand};
  padding: 6px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.bg.brand};
  font-weight: 700;
  ${setTypo("bodySm")};
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
  opacity: 0.2;
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

  span {
    font-size: 16px;
  }
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

export const PlaceholderImg = styled.div`
  aspect-ratio: 1/1;
  background: ${({ theme }) => theme.colors.bg.disabled};
  border-radius: 4px;
`;

export const Description = styled.p`
  ${setTypo("bodyMd")};
  color: ${({ theme }) => theme.colors.fg.primary};
  word-break: keep-all;
  line-height: 1.5;
`;

export const LinkSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 4px;
`;

export const LinkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 18px;
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
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.bg.oliveLight};
  }
`;

export const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 10px;
  padding-top: 8px;
  background: ${({ theme }) => theme.colors.bg.neutral};
`;

export const CloseButton = styled.button`
  padding: 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.subtle};
  background: ${({ theme }) => theme.colors.bg.neutral};
  color: ${({ theme }) => theme.colors.fg.primary};
  ${setTypo("buttonMd")};
  cursor: pointer;
`;

export const ActionButton = styled.button`
  padding: 12px;
  border-radius: 999px;
  border: none;
  background: ${({ theme }) => theme.colors.bg.brand};
  color: ${({ theme }) => theme.colors.fg.primaryInverted};
  ${setTypo("buttonMd")};
  font-weight: 700;
  cursor: pointer;
`;

export const Icons = styled.img`
  width: 21px;
`;
