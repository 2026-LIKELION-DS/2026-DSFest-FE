import React, { useState } from "react";
import * as S from "../styles/BoothInfoComponent.style";

interface Booth {
  id: number;
  name: string;
  category: string;
  operator: string;
  description: string;
  status: S.StatusType;
}

const BoothInfoComponent: React.FC<{ booth: Booth }> = ({ booth }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <S.Card>
      <S.StatusBadge $status={booth.status}>{booth.status}</S.StatusBadge>
      <S.Title>
        {booth.id}. {booth.name}
      </S.Title>
      <S.InfoRow>
        <S.CategoryTag>{booth.category}</S.CategoryTag>
        <S.BoothName>{booth.operator}</S.BoothName>
      </S.InfoRow>
      <S.ImageRow>
        <S.PhotoPlaceholder />
        <S.PhotoPlaceholder />
        <S.PhotoPlaceholder />
      </S.ImageRow>

      <S.DescriptionContainer onClick={toggleExpand}>
        <S.Description $isExpanded={isExpanded}>
          {booth.description}
        </S.Description>
        {!isExpanded && <S.MoreButton>자세히 보기</S.MoreButton>}
      </S.DescriptionContainer>
    </S.Card>
  );
};

export default BoothInfoComponent;
