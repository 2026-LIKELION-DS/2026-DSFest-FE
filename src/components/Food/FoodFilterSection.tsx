import * as S from "../../styles/FoodFilter.styles";

import grayLeaf from "../../assets/Food/Grayleaf.svg";
import greenLeaf from "../../assets/Food/Greenleaf.svg";

interface Props {
  isVeganSelected: boolean;
  setIsVeganSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FoodFilterSection({
  isVeganSelected,
  setIsVeganSelected,
}: Props) {
  return (
    <S.FilterWrapper>
      <S.CountText>
        <strong>13개</strong>의 푸드트럭
      </S.CountText>

      <S.VeganLabel $isSelected={isVeganSelected}>
        <S.RadioInput
          type="radio"
          checked={isVeganSelected}
          onClick={() => setIsVeganSelected((prev) => !prev)}
          readOnly
        />

        <S.LeafIcon
          src={isVeganSelected ? greenLeaf : grayLeaf}
          alt="비건 잎사귀"
        />

        <S.VeganText $isSelected={isVeganSelected}>
          비건 메뉴가 있는 푸드트럭
        </S.VeganText>
      </S.VeganLabel>
    </S.FilterWrapper>
  );
}