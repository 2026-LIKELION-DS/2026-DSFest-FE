import * as S from "./Header.style";
import chevronLeft from "../../assets/ChevronLeft.svg";

import { useEffect, useState } from "react";
import axios from "axios";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function Header({
  title,
  subtitle,
  showBackButton = false,
  onBack,
}: HeaderProps) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [contestStatus, setContestStatus] = useState<
    "ACCEPTING" | "VOTING" | "ENDED" | null
  >(null);

  useEffect(() => {
    if (title !== "청춘 한 컷") return;
    axios
      .get(`${baseUrl}/api/photo-contest/status`)
      .then((res) => {
        if (res.data.isSuccess) setContestStatus(res.data.result.status);
      })
      .catch((err) => console.error("콘테스트 상태 에러:", err));
  }, [title, baseUrl]);

  const getContestStatusBubble = () => {
    if (contestStatus === "ACCEPTING") return "사진 응모 중!";
    if (contestStatus === "VOTING") return "사진 투표 중!";
    return null;
  };

  // const getContestStatusBubble = () => {
  //   const now = new Date();
  //   const month = now.getMonth() + 1;
  //   const date = now.getDate();
  //   // const time = now.getHours() * 100 + now.getMinutes();
  //   //응모 기간
  //   if (month === 4 && date >= 28) return "사진 응모 중!";
  //   // 투표 기간
  //   if (month === 5 && date >= 1 && date <= 15) return "사진 투표 중!";
  // };

  return (
    <S.Container>
      <S.Left $show={showBackButton}>
        {showBackButton && (
          <img src={chevronLeft} alt="뒤로 가기" onClick={onBack} />
        )}
      </S.Left>
      <S.TitleWrapper>
        <S.Title>{title}</S.Title>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.TitleWrapper>
      {title === "청춘 한 컷" && getContestStatusBubble() && (
        <S.StatusBubble>{getContestStatusBubble()}</S.StatusBubble>
      )}
    </S.Container>
  );
}
