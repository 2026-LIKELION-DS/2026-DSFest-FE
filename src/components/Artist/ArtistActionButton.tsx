import { useEffect, useState } from "react";

import chat from "../../assets/ChatCircleFill.svg";
import megaphone from "../../assets/MegaphoneFill.svg";
import chevronRight from "../../assets/ChevronRight.svg";

import * as S from "../../styles/ArtistComponent.style";

export type CountdownStatus = "MORE_THAN_72H" | "WITHIN_72H" | "LIVE" | "ENDED";

type ArtistActionButtonsProps = {
  status: CountdownStatus;
  performanceDate: string;
  startTime: string;
  onLiveClick: () => void;
  onGuideClick: () => void;
};

const formatRemainingTime = (diffMs: number) => {
  if (diffMs <= 0) return "00:00:00";

  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  const timeText = `${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (days > 0) {
    return `${days}일 ${timeText}`;
  }

  return timeText;
};

function ArtistActionButtons({
  status,
  performanceDate,
  startTime,
  onGuideClick,
  onLiveClick,
}: ArtistActionButtonsProps) {
  const [remainingTime, setRemainingTime] = useState("00:00:00");

  useEffect(() => {
    if (status !== "WITHIN_72H") return;

    const performanceStartDateTime = `${performanceDate}T${startTime}`;

    const updateRemainingTime = () => {
      const now = new Date().getTime();
      const target = new Date(performanceStartDateTime).getTime();

      setRemainingTime(formatRemainingTime(target - now));
    };

    updateRemainingTime();

    const timer = window.setInterval(updateRemainingTime, 1000);

    return () => window.clearInterval(timer);
  }, [status, performanceDate, startTime]);

  const getStatusText = () => {
    if (status === "LIVE") return "라이브톡 참여하기";
    if (status === "ENDED") return "공연 종료";
    if (status === "WITHIN_72H") return `시작까지 ${remainingTime} 남음`;

    return "공연 예정";
  };

  const statusText = getStatusText();

  return (
    <S.ActionSection>
      <S.ButtonSet>
        <S.CountdownButton
          type="button"
          $status={status}
          disabled={status === "ENDED"}
          onClick={() => {
            if (status === "LIVE") {
              onLiveClick();
            }
          }}
        >
          <S.CountdownButtonBlock $status={status}>
            <S.LeftContent>
              {status === "LIVE" && <img src={chat} alt="라이브톡" />}
              <p>{statusText}</p>
            </S.LeftContent>

            {status === "LIVE" && <img src={chevronRight} alt="참여하기" />}
          </S.CountdownButtonBlock>
        </S.CountdownButton>

        <S.EntranceButton type="button" onClick={onGuideClick}>
          <S.EntranceButtonBlock>
            <img src={megaphone} alt="무대 입장 방법" />
            <p>무대 입장 방법 확인하기</p>
          </S.EntranceButtonBlock>
        </S.EntranceButton>
      </S.ButtonSet>

      <S.NoticeText>
        축제 실황에 따라 공연 시작 시간에 오차가 생길 수 있습니다.
      </S.NoticeText>
    </S.ActionSection>
  );
}

export default ArtistActionButtons;
