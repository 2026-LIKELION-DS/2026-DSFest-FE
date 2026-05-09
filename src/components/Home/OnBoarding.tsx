import { useEffect } from "react";
import * as S from "../../styles/OnBoard.style";
import onBoarding from "../../assets/home/Onboarding3.png";

interface OnBoardingProps {
  onClose: () => void;
}

export default function OnBoarding({ onClose }: OnBoardingProps) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = onBoarding;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    console.log("useEffect 실행됨");
    const initGuestUser = async () => {
      const BaseUrl = import.meta.env.VITE_API_URL;

      const savedUuid = localStorage.getItem("guest_uuid");

      if (savedUuid) {
        console.log("기존 게스트 접속:", savedUuid);
        return;
      }

      try {
        console.log("신규 게스트 UUID 발급 요청...");
        const response = await fetch(`${BaseUrl}/api/users/guest`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.isSuccess && data.result?.uuid) {
          localStorage.setItem("guest_uuid", data.result.uuid);
          console.log("신규 UUID 저장 완료:", data.result.uuid);
        } else {
          console.error("발급 실패:", data.message);
        }
      } catch (error) {
        console.error("서버 통신 에러:", error);
      }
    };

    initGuestUser();
  }, []);

  return (
    <S.OnBoardWrapper>
      <S.OnBoardBlurArea />
      <S.OnBoardImg src={onBoarding} loading="eager" fetchPriority="high" />

      <S.OnBoardBtnBox>
        <S.Close onClick={onClose}>닫기</S.Close>
      </S.OnBoardBtnBox>
    </S.OnBoardWrapper>
  );
}
