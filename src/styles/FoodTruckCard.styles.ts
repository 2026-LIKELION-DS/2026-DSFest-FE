import styled from "styled-components";
import { theme } from "./theme";

export const Card = styled.article`
  background: ${({ theme }) => theme.colors.bg.offWhite};
  border: 1px solid ${({ theme }) => theme.colors.bg.brand};
  border-radius: 4px;
  cursor: pointer;
  padding: 16px 16px 12px;
  margin: 0 20px 12px;
`;

export const TopArea = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
`;
export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
export const PreparingText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: white;
  font-family: ${theme.typography.h4.fontFamily};
  font-weight: ${theme.typography.h4.fontWeight};
  font-size: ${theme.typography.h4.fontSize};
  line-height: ${theme.typography.h4.lineHeight};

  white-space: nowrap;
`;
export const StoreImageButton = styled.button`
  width: 80px;
  height: 80px;
  flex-shrink: 0;

  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.bg.oliveLight};
  background: ${({ theme }) => theme.colors.grey[100]};
  border-radius: 4px;

  overflow: hidden;

  position: relative;
`;
export const DarkOverlay = styled.div`
  position: absolute;
  inset: 0;

  background: rgba(0, 0, 0, 0.6);
`;

export const StoreImage = styled.img<{ $isOperating: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;

  filter: ${({ $isOperating }) => ($isOperating ? "none" : "brightness(0.55)")};
`;
export const InfoArea = styled.div`
  flex: 1;
  padding-top: 4px;
  cursor: pointer;
`;

export const StoreName = styled.h2`
  margin: 0 0 10px;

  font-family: ${theme.typography.h2.fontFamily};
  font-weight: ${theme.typography.h2.fontWeight};
  font-size: ${theme.typography.h2.fontSize};
  line-height: ${theme.typography.h2.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Tag = styled.span`
  height: 28px;
  padding: 0 6px;

  display: flex;
  align-items: center;

  border-radius: 999px;
  background: ${({ theme }) => theme.colors.bg.olive};

  font-family: ${theme.typography.buttonSm.fontFamily};
  font-weight: ${theme.typography.buttonSm.fontWeight};
  font-size: ${theme.typography.buttonSm.fontSize};
  line-height: ${theme.typography.buttonSm.lineHeight};

  color: ${({ theme }) => theme.colors.bg.brand};
`;

export const LikeArea = styled.div<{ $isLiked: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${({ theme, $isLiked }) =>
    $isLiked ? theme.colors.bg.brand : theme.colors.fg.subtle};
`;

export const LikeIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const LikeCount = styled.span`
  margin-top: 2px;

  font-size: 12px;
  line-height: 18px;
`;

export const DetailArea = styled.div`
  margin-top: 16px;
  cursor: pointer;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 8px;

  font-family: ${theme.typography.h3.fontFamily};
  font-weight: ${theme.typography.h3.fontWeight};
  font-size: ${theme.typography.h3.fontSize};
  line-height: ${theme.typography.h3.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  margin-bottom: 12px;
`;

export const ClockIcon = styled.img`
  width: 21px;
  height: 21px;
`;

export const TimeText = styled.span`
  font-family: ${theme.typography.bodyMd.fontFamily};
  font-weight: ${theme.typography.bodyMd.fontWeight};
  font-size: ${theme.typography.bodyMd.fontSize};
  line-height: ${theme.typography.bodyMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MenuRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const MenuNameBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

export const MenuLeafIcon = styled.img`
  width: 14px;
  height: 14px;
`;

export const MenuName = styled.span`
  font-family: ${theme.typography.bodyMd.fontFamily};
  font-weight: ${theme.typography.bodyMd.fontWeight};
  font-size: ${theme.typography.bodyMd.fontSize};
  line-height: ${theme.typography.bodyMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const DotLine = styled.div`
  flex: 1;
  border-bottom: 1px dotted ${({ theme }) => theme.colors.fg.subtle};
  transform: translateY(4px);
`;

export const MenuPrice = styled.span`
  flex-shrink: 0;

  font-family: ${theme.typography.bodyMd.fontFamily};
  font-weight: ${theme.typography.bodyMd.fontWeight};
  font-size: ${theme.typography.bodyMd.fontSize};
  line-height: ${theme.typography.bodyMd.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const ChevronButton = styled.button`
  width: 100%;
  margin-top: 8px;

  display: flex;
  justify-content: center;

  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const ChevronIcon = styled.img`
  width: 20px;
  height: 20px;
`;
