import * as S from "../../styles/OnBoard.style";
import { useNavigate } from "react-router-dom";

interface OnBoardingProps {
  onClose: () => void;
}

export default function OnBoarding({ onClose }: OnBoardingProps) {
    const navigate = useNavigate();
  return (
    <S.OnBoardWrapper>
        <S.OnBoardBlurArea />
      <S.OnBoardImg />

      <S.OnBoardBtnBox>
        <S.Close onClick={onClose}>닫기</S.Close>
        <S.ShowMore
          onClick={() => {
            localStorage.setItem("hasSeenOnboarding", "true");
            navigate("/@");
          }}
        >더 알아보기</S.ShowMore>
      </S.OnBoardBtnBox>
    </S.OnBoardWrapper>
  );
}