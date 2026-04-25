import React, { useState, useRef, useLayoutEffect } from "react";
import * as S from "../../styles/BoothInfoComponent.style";
import examplePhoto from "../../assets/hahyunsang_sample.svg";

export interface Booth {
  id: number;
  name: string;
  category: string;
  operator: string;
  description: string;
  status: "운영 중" | "운영 예정" | "운영 종료";
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
        // 클라이언트 높이보다 스크롤 높이가 크면 말줄임표(...)가 생겼다는 의미
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setShowMoreBtn(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [booth.description]);

  return (
    /** * 1. 최상위 카드(S.Card)에 onClick 이벤트를 연결합니다.
     * 2. 클릭 시 부모로부터 받은 onDetailClick 함수를 호출합니다.
     */
    <S.Card onClick={() => onDetailClick(booth)} style={{ cursor: "pointer" }}>
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

      <S.DescriptionContainer>
        <S.Description ref={descriptionRef} $isExpanded={false}>
          {booth.description}
        </S.Description>

        {showMoreBtn && <S.MoreButton>자세히 보기</S.MoreButton>}
      </S.DescriptionContainer>
    </S.Card>
  );
};

export default BoothInfoComponent;
