import React, { useState, useRef, useLayoutEffect } from "react";
import * as S from "../../styles/BoothInfoComponent.style";

export interface Booth {
  id: number;
  boothNumber: number;
  positionNumber: number;
  name: string;
  category: string;
  operator: string;
  description: string;
  status: "운영 중" | "운영 예정" | "운영 종료" | "상시";
  images?: string[];
}

interface BoothInfoProps {
  booth: Booth;
  onDetailClick: (booth: Booth) => void;
}

const BoothInfoComponent: React.FC<BoothInfoProps> = ({
  booth,
  onDetailClick,
}) => {
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const checkOverflow = () => {
      const element = descriptionRef.current;
      if (element) {
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setShowMoreBtn(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [booth.description]);

  return (
    <S.Card onClick={() => onDetailClick(booth)} style={{ cursor: "pointer" }}>
      <S.StatusBadge $status={booth.status}>{booth.status}</S.StatusBadge>

      <S.Title>
        {booth.positionNumber}. {booth.name}
      </S.Title>

      <S.InfoRow>
        <S.CategoryTag>{booth.category}</S.CategoryTag>
        <S.BoothName>{booth.operator}</S.BoothName>
      </S.InfoRow>

      {booth.images && booth.images.length > 0 && (
        <S.ImageRow>
          {booth.images.slice(0, 3).map((imgUrl, idx) => (
            <S.BoothImage
              key={idx}
              src={imgUrl}
              alt={`${booth.name} 사진 ${idx + 1}`}
              referrerPolicy="no-referrer"
            />
          ))}
        </S.ImageRow>
      )}

      <S.DescriptionContainer>
        <S.Description ref={descriptionRef} $isExpanded={false}>
          {booth.description || "부스 상세 설명이 없습니다."}
        </S.Description>

        {showMoreBtn && <S.MoreButton>자세히 보기</S.MoreButton>}
      </S.DescriptionContainer>
    </S.Card>
  );
};

export default BoothInfoComponent;
