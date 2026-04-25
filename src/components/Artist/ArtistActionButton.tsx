import type { PerformanceStatus } from "../../utils/artist";

import chat from "../../assets/ChatCircleFill.svg";
import megaphone from "../../assets/MegaphoneFill.svg";
import chevronRight from "../../assets/ChevronRight.svg";

import * as S from "../../styles/ArtistComponent.style";

type ArtistActionButtonsProps = {
  status: PerformanceStatus;
  statusText: string;
  onLiveClick: () => void;
  onGuideClick: () => void;
};

function ArtistActionButtons({
  status,
  statusText,
  onGuideClick,
  onLiveClick,
}: ArtistActionButtonsProps) {
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
