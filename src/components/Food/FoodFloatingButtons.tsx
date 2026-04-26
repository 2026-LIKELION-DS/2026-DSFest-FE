import * as S from "../../styles/FoodFloatingButtons.styles";

import megaphone from "../../assets/Food/MegaPhone.svg";
import arrowUp from "../../assets/Food/ArrowUp.svg";

interface Props {
  onNotice: () => void;
  onTop: () => void;
}

export default function FoodFloatingButtons({ onNotice, onTop }: Props) {
  return (
    <S.ButtonWrapper>
      <S.FloatingButton type="button" onClick={onNotice}>
        <S.Icon src={megaphone} alt="공지사항" />
      </S.FloatingButton>

      <S.FloatingButton type="button" onClick={onTop}>
        <S.Icon src={arrowUp} alt="맨 위로" />
      </S.FloatingButton>
    </S.ButtonWrapper>
  );
}
