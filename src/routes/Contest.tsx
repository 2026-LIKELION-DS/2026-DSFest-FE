import { useEffect, useState } from "react";
import * as S from "../styles/Contest.style";
import ContestNotice from "../components/Contest/ContestNotice";
// import ContestImg from "../assets/Contest/favicon-512w.png";
import ContestImg from "../assets/Contest/Contest.png";
import ContestVoteButton from "../components/Contest/ContestVoteButton";
import axios from "axios";

type ContestPhase = "before" | "entry" | "vote";

interface ContestStatus {
  status: "ACCEPTING" | "VOTING" | "ENDED";
  startTime: string;
  endTime: string;
}

function formatRemaining(targetTime: string): string {
  const diff = new Date(targetTime).getTime() - Date.now();
  if (diff <= 0) return "00:00:00";
  const h = Math.floor(diff / 3600000)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((diff % 3600000) / 60000)
    .toString()
    .padStart(2, "0");
  const s = Math.floor((diff % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${h}:${m}:${s}`;
}

const STATUS_TO_PHASE: Record<ContestStatus["status"], ContestPhase> = {
  ACCEPTING: "entry",
  VOTING: "vote",
  ENDED: "before",
};

export default function ContestPag() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [contestStatus, setContestStatus] = useState<ContestStatus | null>(
    null,
  );
  const [remainingTime, setRemainingTime] = useState("00:00:00");

  useEffect(() => {
    if (!baseUrl) return;
    axios
      .get(`${baseUrl}/api/photo-contest/status`)
      .then((res) => {
        if (res.data.isSuccess) {
          setContestStatus(res.data.result);
        }
      })
      .catch((err) => console.error("콘테스트 상태 에러:", err));
  }, [baseUrl]);

  // 타이머
  useEffect(() => {
    if (!contestStatus) return;
    const tick = () => setRemainingTime(formatRemaining(contestStatus.endTime));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [contestStatus]);

  const phase: ContestPhase = contestStatus
    ? STATUS_TO_PHASE[contestStatus.status]
    : "before";

  return (
    <S.ContestPage>
      <S.ContestImg src={ContestImg} />
      <ContestNotice />
      <S.VoteButtonWrapper>
        <ContestVoteButton
          phase={phase}
          remainingTime={remainingTime}
          kakaoLink="https://pf.kakao.com/_gUyQn"
        />
      </S.VoteButtonWrapper>
    </S.ContestPage>
  );
}
