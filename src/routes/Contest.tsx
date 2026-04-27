import * as S from "../styles/Contest.style";
import ContestNotice from "../components/Contest/ContestNotice";
import ContestImg from "../assets/Contest/favicon-512w.png";
import ContestVoteButton from "../components/Contest/ContestVoteButton";

export default function ContestPag() {
  return (
    <S.ContestPage>
      <S.ContestImg src={ContestImg} />
      <ContestNotice />
      <S.VoteButtonWrapper>
        <ContestVoteButton
          // phase="before"
          phase="vote"
          remainingTime="23:59:59"
          kakaoLink="https://pf.kakao.com/_gUyQn"
        />
      </S.VoteButtonWrapper>
    </S.ContestPage>
  );
}
