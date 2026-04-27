import { useNavigate, useLocation } from "react-router-dom";
// import { useState } from "react";
import * as S from "../../styles/ContestVoteButton.style";
import VoteToast from "./VoteToast";

type ContestPhase = "before" | "entry" | "vote";

interface Props {
  phase: ContestPhase;
  remainingTime: string;
  kakaoLink?: string;
}

const TIMER_LABEL: Record<ContestPhase, string> = {
  before: "응모 시작까지",
  entry: "응모 마감까지",
  vote: "투표 마감까지",
};

const BUTTON_LABEL: Record<ContestPhase, string> = {
  before: "청춘 한 컷 응모하기",
  entry: "청춘 한 컷 응모하기",
  vote: "청춘 한 컷 투표하기",
};

export default function ContestVoteButton({
  phase,
  remainingTime,
  kakaoLink,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  // const [voted, setVoted] = useState(false);
  const voted = location.state?.voted ?? false;
  // const [voted, setVoted] = useState(location.state?.voted ?? false);

  const handleClick = () => {
    if (phase === "before") return;
    if (phase === "entry" && kakaoLink) {
      window.open(kakaoLink, "_blank");
    }
    if (phase === "vote") {
      navigate("/contest/vote"); //투표페이지 이동
      // setVoted(true);
    }
  };

  return (
    <S.ContestVoteButtonPage>
      <S.ContestTab>
        {voted ? (
          <VoteToast />
        ) : (
          <S.TimeLine>
            <S.span>{TIMER_LABEL[phase]}</S.span>
            <S.span>{remainingTime}</S.span>
            <S.span>남음</S.span>
          </S.TimeLine>
        )}
        <S.voteButton
          $phase={phase}
          onClick={handleClick}
          disabled={phase === "before" || voted}
        >
          {voted ? "투표 완료!" : BUTTON_LABEL[phase]}
        </S.voteButton>
      </S.ContestTab>
    </S.ContestVoteButtonPage>
  );
}
