import styled from "styled-components";

export type StatusType = "운영 중" | "운영 예정" | "운영 종료";

export const Card = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 16px;
  background: white;
  margin-bottom: 16px;
`;

export const StatusBadge = styled.span<{ $status: StatusType }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
  border: 1px solid;
  margin-bottom: 8px;

  ${({ $status }) => {
    if ($status === "운영 중")
      return `background: #f1f8f1; color: #2d5a27; border-color: #dceddc;`;
    if ($status === "운영 예정")
      return `background: #f8f9fa; color: #6c757d; border-color: #e9ecef;`;
    return `background: #fff5f5; color: #fa5252; border-color: #ffe3e3;`;
  }}
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 8px 0;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const CategoryTag = styled.span`
  background: #eef5ee;
  color: #3a6332;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
`;

export const ImageRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

export const PhotoPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  background: #eee;
  border-radius: 6px;
`;

export const Description = styled.p`
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const BoothName = styled.span`
  fontSize: 13px,
  color: #495057
`;
