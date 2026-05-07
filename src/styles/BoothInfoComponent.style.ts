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

export type StatusType = "운영 중" | "운영 예정" | "운영 종료";

export const Card = styled.div`
  border: 0.5px solid ${({ theme }) => theme.colors.bg.brand};
  border-radius: 4px;
  padding: 30px 20px;
  background: ${({ theme }) => theme.colors.bg.offWhite};
  margin: 30px 0;
  position: relative;
`;

export const StatusBadge = styled.span<{ $status: StatusType }>`
  position: absolute;
  top: -20px;
  padding: 4px 15px;
  border-radius: 2px;
  ${setTypo("h3")};
  border: 0.5px solid ${({ theme }) => theme.colors.bg.brand};

  ${({ $status, theme }) => {
    if ($status === "운영 중")
      return css`
        background: ${theme.colors.bg.olive};
        color: ${theme.colors.bg.brand};
      `;
    if ($status === "운영 예정")
      return css`
        background: ${theme.colors.bg.neutral};
        color: ${theme.colors.bg.brand};
      `;
    return css`
      background: ${theme.colors.bg.disabled};
      color: ${theme.colors.fg.disabled};
    `;
  }}
`;

export const Title = styled.div`
  ${setTypo("h2")};
  color: ${({ theme }) => theme.colors.bg.brand};
  margin: 3px 0 10px 0;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const CategoryTag = styled.span`
  background: ${({ theme }) => theme.colors.bg.olive};
  color: ${({ theme }) => theme.colors.bg.brand};
  ${setTypo("buttonMd")};
  padding: 5px 13px;
  border-radius: 9999px;
  text-wrap: nowrap;
`;

export const PhotoPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.grey};
  border-radius: 6px;
`;

export const DescriptionContainer = styled.div`
  cursor: pointer;
  position: relative;
`;

export const Description = styled.p<{ $isExpanded: boolean }>`
  ${setTypo("bodyMd")};
  color: ${({ theme }) => theme.colors.grey.black};
  margin: 0;
  word-break: break-all;

  ${({ $isExpanded }) =>
    !$isExpanded &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      max-height: 42px;
    `}
`;

export const MoreButton = styled.span`
  display: block;
  ${setTypo("bodySm")};
  color: ${({ theme }) => theme.colors.fg.subtle};
  margin-top: 4px;
`;

export const BoothName = styled.span`
  ${setTypo("h4")};
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const ImageRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

export const BoothImage = styled.img`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.grey};
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.bg.oliveLight};
`;
