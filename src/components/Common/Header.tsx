import * as S from "./Header.style";
import chevronLeft from "../../assets/ChevronLeft.svg";

import axios from "axios";
import { useEffect, useState } from "react";

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
  const ENTRY_START = new Date("2026-05-13T00:00:00");
  const ENTRY_END = new Date("2026-05-14T20:00:00");

  const [contestStatus, setContestStatus] = useState<{
    status: "ACCEPTING" | "VOTING" | "ENDED";
    startTime: string;
    endTime: string;
  } | null>(null);

  useEffect(() => {
    if (title !== "청춘 한 컷") return;
    axios
      .get(`${baseUrl}/api/photo-contest/status`)
      .then((res) => {
        if (res.data.isSuccess) setContestStatus(res.data.result);
      })
      .catch((err) => console.error("콘테스트 상태 에러:", err));
  }, [title, baseUrl]);

  const getContestStatusBubble = () => {
    const now = new Date();
    const voteStart = contestStatus ? new Date(contestStatus.startTime) : null;
    const voteEnd = contestStatus ? new Date(contestStatus.endTime) : null;

    if (now >= ENTRY_START && now < ENTRY_END) return "사진 응모 중!";
    if (voteStart && voteEnd && now >= voteStart && now < voteEnd)
      return "사진 투표 중!";
    return null;
  };

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
