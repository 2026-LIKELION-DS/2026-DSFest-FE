import { useEffect, useState } from "react";
import * as S from "../styles/Contest.style";
import ContestNotice from "../components/Contest/ContestNotice";
import ContestImg from "../assets/Contest/Contest.png";
import ContestVoteButton from "../components/Contest/ContestVoteButton";
import axios from "axios";

const ENTRY_START = new Date("2026-05-13T10:00:00");
const ENTRY_END = new Date("2026-05-14T20:00:00");

type ContestPhase = "before" | "entry" | "waiting" | "vote" | "ended";

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
    const tick = () => {
      const now = new Date();
      const voteStart = new Date(contestStatus.startTime);
      const voteEnd = new Date(contestStatus.endTime);

      if (now < ENTRY_START) {
        setRemainingTime(formatRemaining(ENTRY_START.toISOString()));
      } else if (now >= ENTRY_START && now < ENTRY_END) {
        setRemainingTime(formatRemaining(ENTRY_END.toISOString()));
      } else if (now >= ENTRY_END && now < voteStart) {
        setRemainingTime(formatRemaining(contestStatus.startTime));
      } else if (now >= voteStart && now < voteEnd) {
        setRemainingTime(formatRemaining(contestStatus.endTime));
      } else {
        setRemainingTime("00:00:00");
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [contestStatus]);

  const phase: ContestPhase = (() => {
    if (!contestStatus) return "before";
    const now = new Date();
    const voteStart = new Date(contestStatus.startTime);
    const voteEnd = new Date(contestStatus.endTime);

    if (now < ENTRY_START) return "before";
    if (now >= ENTRY_START && now < ENTRY_END) return "entry";
    if (now >= ENTRY_END && now < voteStart) return "waiting";
    if (now >= voteStart && now < voteEnd) return "vote";
    return "ended";
  })();

  return (
    <S.ContestPage>
      <S.ChatArea>
        <S.ContestImg src={ContestImg} />
        <ContestNotice />
      </S.ChatArea>
      <S.VoteButtonWrapper>
        <ContestVoteButton
          phase={phase}
          remainingTime={remainingTime}
          kakaoLink="https://open.kakao.com/o/sIiNPesi"
        />
      </S.VoteButtonWrapper>
    </S.ContestPage>
  );
}
