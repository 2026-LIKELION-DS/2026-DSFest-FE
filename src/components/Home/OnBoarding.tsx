import { useEffect } from "react";
import * as S from "../../styles/OnBoard.style";
import { useNavigate } from "react-router-dom";

interface OnBoardingProps {
  onClose: () => void;
}

export default function OnBoarding({ onClose }: OnBoardingProps) {
  const navigate = useNavigate();
  

  useEffect(() => {
    const initGuestUser = async () => {
      const savedUuid = localStorage.getItem("guest_uuid");

      if (savedUuid) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/guest`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.isSuccess && data.result?.uuid) {
          localStorage.setItem("guest_uuid", data.result.uuid);
        } else {
          console.error("게스트 UUID 발급 실패:", data.message);
        }
      } catch (error) {
        console.error("게스트 사용자 생성 요청 실패:", error);
      }
    };

    initGuestUser();
  }, []);

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