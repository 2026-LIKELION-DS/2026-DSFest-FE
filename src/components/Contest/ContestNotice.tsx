import * as S from "../../styles/ContestNotice.style";

import bubble1 from "../../assets/bubble01.svg";
import bubble2 from "../../assets/bubble02.svg";
import bubble3 from "../../assets/bubble03.svg";

function ContestNotice() {
  return (
    <S.ContestNotice>
      <img src={bubble1} className="bubble bubble1" />
      <img src={bubble2} className="bubble bubble2" />
      <img src={bubble3} className="bubble bubble3" />

      <S.NoticeTitle>청춘 한 컷</S.NoticeTitle>

      <S.NoticeList>
        <div>
          청춘 한 컷, 당신의 순간을 남겨보세요!
          <br />
          축제와 나의 청춘을 담은 사진으로 콘테스트에 참여하고, 투표로 최고의
          순간을 함께 만들어보세요.
        </div>
        <div>지금 바로 제출하고 무대 위 주인공이 될 기회를 잡으세요!</div>
      </S.NoticeList>

      {/* <S.NoticeCaption>*뭔가 총학의 안내...</S.NoticeCaption> */}
    </S.ContestNotice>
  );
}

export default ContestNotice;
