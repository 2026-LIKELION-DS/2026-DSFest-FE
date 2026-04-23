import styled from "styled-components";

export type StatusType = "운영 중" | "운영 예정" | "운영 종료";

export const Card = styled.div`
  border: 0.5px solid #0b4112;
  border-radius: 4px;
  padding: 30px 20px;
  background: white;
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
  border: 0.5px solid;

  ${({ $status }) => {
    if ($status === "운영 중")
      return `background: #E5EBCF; color: #0B4112; border-color: #0B4112;`;
    if ($status === "운영 예정")
      return `background: #ffffff; color: #0B4112; border-color: #0B4112;`;
    return `background: #D6D6D6; color: #828282; border-color: #0B4112;`;
  }}
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #0b4112;
  margin: 3px 0;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const CategoryTag = styled.span`
  background: #e5ebcf;
  color: #0b4112;
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
  background: #eee;
  border-radius: 6px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #161716;
  line-height: 21px;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const BoothName = styled.span`
  font-size: 14px;
  font-weight: 700;
`;
