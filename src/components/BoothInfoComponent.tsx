import React, { useState, useRef, useLayoutEffect } from "react";
import * as S from "../styles/BoothInfoComponent.style";
import examplePhoto from "../assets/hahyunsang_sample.svg";

interface Booth {
  id: number;
  name: string;
  category: string;
  operator: string;
  description: string;
  status: S.StatusType;
  images?: string[];
}

const BoothInfoComponent: React.FC<{ booth: Booth }> = ({ booth }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const toggleExpand = () => setIsExpanded(!isExpanded);

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
        {[1, 2, 3].map((idx) => (
          <S.BoothImage
            key={idx}
            src={booth.images?.[idx] || examplePhoto}
            alt={`${booth.name} 사진 ${idx + 1}`}
          />
        ))}
      </S.ImageRow>

      <S.DescriptionContainer onClick={showMoreBtn ? toggleExpand : undefined}>
        <S.Description ref={descriptionRef} $isExpanded={isExpanded}>
          {booth.description}
        </S.Description>

        {(showMoreBtn || isExpanded) && (
          <S.MoreButton>{isExpanded ? "접기" : "자세히 보기"}</S.MoreButton>
        )}
      </S.DescriptionContainer>
    </S.Card>
  );
};

export default BoothInfoComponent;
