// import { useEffect } from "react";
import * as S from "../../styles/OnBoard.style";
import onBoarding from "../../assets/home/Onboarding3.png";

interface OnBoardingProps {
  onClose: () => void;
}

export default function OnBoarding({ onClose }: OnBoardingProps) {
  // 배포 종료로 아카이빙 처리합니다.
  // useEffect(() => {
  //   const link = document.createElement("link");
  //   link.rel = "preload";
  //   link.as = "image";
  //   link.href = onBoarding;
  //   document.head.appendChild(link);

  //   return () => {
  //     document.head.removeChild(link);
  //   };
  // }, []);

  // useEffect(() => {
  //   const initGuestUser = async () => {
  //     const BaseUrl = import.meta.env.VITE_API_URL;

  //     // 기존 UUID 가져오기
  //     const savedUuid = localStorage.getItem("guest_uuid") || null;

  //     try {
  //       const response = await fetch(`${BaseUrl}/api/users/guest`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           uuid: savedUuid,
  //         }),
  //       });

  //       const data = await response.json();

  //       if (data.isSuccess && data.result?.uuid) {
  //         localStorage.setItem("guest_uuid", data.result.uuid);

  //         if (import.meta.env.DEV) {
  //           console.log("UUID 업데이트 완료");
  //         }
  //       } else {
  //         console.error("게스트 UUID 처리 실패:", data.message);
  //       }
  //     } catch (error) {
  //       console.error("서버 통신 에러:", error);
  //     }
  //   };

  //   initGuestUser();
  // }, []);

  return (
    <S.OnBoardWrapper>
      <S.OnBoardBlurArea onClick={onClose}/>
      <S.OnBoardImg src={onBoarding} loading="eager" fetchPriority="high" />

      <S.OnBoardBtnBox>
        <S.Close onClick={onClose}>닫기</S.Close>
      </S.OnBoardBtnBox>
    </S.OnBoardWrapper>
  );
}
