import * as S from "../styles/Contest.style";
import ContestNotice from "../components/Contest/ContestNotice";
import ContestImg from "../assets/Contest/favicon-512w.png";

export default function ContestPag() {
  return (
    <S.ContestPage>
      <S.ContestImg src={ContestImg} />
      <ContestNotice />
      <S.ContestTab>
        <S.TimeLine>
          <S.span>응모 시작 까지</S.span>
          <S.span>0000000</S.span>
          <S.span>남음</S.span>
        </S.TimeLine>
        <S.voteButton>청춘 한 컷 응모하기</S.voteButton>
      </S.ContestTab>
    </S.ContestPage>
  );
}
