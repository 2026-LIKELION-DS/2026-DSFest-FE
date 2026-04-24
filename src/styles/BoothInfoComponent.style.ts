import styled, { css } from "styled-components";

export type StatusType = "운영 중" | "운영 예정" | "운영 종료";

export const Card = styled.div`
  border: 0.5px solid ${({ theme }) => theme.colors.bg.brand};
  border-radius: 4px;
  padding: 30px 20px;
  background: ${({ theme }) => theme.colors.bg.neutral};
  margin: 30px 0;
  position: relative;
`;

export const StatusBadge = styled.span<{ $status: StatusType }>`
  position: absolute;
  top: -20px;
  padding: 8px 15px;
  border-radius: 2px;
  font-size: 16px;
  font-weight: 700;
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
  font-size: 20px;
  font-weight: 700;
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
  font-size: 14px;
  padding: 10px 15px;
  border-radius: 9999px;
  font-weight: 700;
`;

export const ImageRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

export const PhotoPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.grey[50]};
  border-radius: 6px;
`;

export const DescriptionContainer = styled.div`
  cursor: pointer;
  position: relative;
`;

export const Description = styled.p<{ $isExpanded: boolean }>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey.black};
  line-height: 21px;
  margin: 0;

  ${({ $isExpanded }) =>
    !$isExpanded &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

export const MoreButton = styled.span`
  display: block;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.fg.subtle};
  margin-top: 4px;
  font-weight: 500;
`;

export const BoothName = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fg.primary};
`;
