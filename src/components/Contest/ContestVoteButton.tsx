import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import * as S from "../../styles/ContestVoteButton.style";
import VoteToast from "./VoteToast";

type ContestPhase = "before" | "entry" | "waiting" | "vote" | "ended";

interface Props {
  phase: ContestPhase;
  remainingTime: string;
  kakaoLink?: string;
}

const TIMER_LABEL: Record<ContestPhase, string> = {
  before: "응모 시작까지",
  entry: "응모 마감까지",
  waiting: "투표 시작까지",
  vote: "투표 마감까지",
  ended: "",
};

const BUTTON_LABEL: Record<ContestPhase, string> = {
  before: "청춘 한 컷 응모하기",
  entry: "청춘 한 컷 응모하기",
  waiting: "청춘 한 컷 투표하기",
  vote: "청춘 한 컷 투표하기",
  ended: "청춘 한 컷 종료",
};

export default function ContestVoteButton({
  phase,
  remainingTime,
  kakaoLink,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const voted = location.state?.voted ?? false;

  const [showToast, setShowToast] = useState(voted);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (!showToast) return;

    const resetHiding = setTimeout(() => setHiding(false), 0);
    const hideTimer = setTimeout(() => setHiding(true), 3000);
    const removeTimer = setTimeout(() => setShowToast(false), 3400);

    return () => {
      clearTimeout(resetHiding);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [showToast]);

  const handleClick = () => {
    if (phase === "entry" && kakaoLink) {
      window.open(kakaoLink, "_blank");
    }
    if (phase === "vote") {
      navigate("/contest/vote");
    }
  };

  const isDisabled =
    phase === "before" || phase === "waiting" || phase === "ended" || voted;

  return (
    <S.ContestVoteButtonPage>
      <S.ContestTab>
        {showToast ? (
          <VoteToast $hiding={hiding} />
        ) : phase !== "ended" ? (
          <S.TimeLine>
            <S.span>{TIMER_LABEL[phase]}</S.span>
            <S.span>{remainingTime}</S.span>
            <S.span>남음</S.span>
          </S.TimeLine>
        ) : null}
        <S.voteButton
          $phase={phase}
          $voted={voted}
          onClick={handleClick}
          disabled={isDisabled}
        >
          {voted ? "투표 완료!" : BUTTON_LABEL[phase]}
        </S.voteButton>
      </S.ContestTab>
    </S.ContestVoteButtonPage>
  );
}
