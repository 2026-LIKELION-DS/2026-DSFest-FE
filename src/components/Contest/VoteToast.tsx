import * as S from "../../styles/VoteToast.style";

import GoodIcon from "../../assets/Contest/ThumbsUpFill.svg";

export default function VoteToast() {
  return (
    <>
      <S.VoteToastWrapper>
        <S.GoodIcon src={GoodIcon}></S.GoodIcon>
        <S.ToastText>청춘 한 컷 투표 완료!</S.ToastText>
      </S.VoteToastWrapper>
    </>
  );
}
