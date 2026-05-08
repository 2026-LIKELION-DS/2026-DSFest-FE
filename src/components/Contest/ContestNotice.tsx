import * as S from "../../styles/ContestNotice.style";

import bubble1 from "../../assets/bubble01.svg";
import bubble2 from "../../assets/bubble02.svg";
import bubble3 from "../../assets/Contest/Bubble03.svg";

function ContestNotice() {
  return (
    <S.ContestNotice>
      <img src={bubble1} className="bubble bubble1" />
      <img src={bubble2} className="bubble bubble2" />
      <img src={bubble3} className="bubble bubble3" />

      <S.NoticeTitle>
        근화제의 순간을 담은 사진,
        <br />
        당신의 한 표로 최고의 ‘청춘’을 선택해주세요!
      </S.NoticeTitle>

      <S.NoticeList>
        <S.ListTitle>📸사진 주제</S.ListTitle>
        <div>자신의 ‘청춘’을 가장 잘 담은 사진</div>
        <div>2026 근화제 현장을 가장 잘 담은 사진</div>
        <div>2026 근화제 드레스코드를 가장 잘 살려 입은 사진</div>
      </S.NoticeList>
      <S.NoticeList>
        <S.ListTitle>🗳️ 투표 방법</S.ListTitle>
        <div>투표 기간: 5월 15일(금) 00:00 ~ 17:00</div>
        <div> 투표 대상: 덕성여자대학교 재학생/휴학생</div>
      </S.NoticeList>
      <S.NoticeList>
        <S.ListTitle>🗳️참여 방법</S.ListTitle>
        <div>1. 후보 사진 확인</div>
        <div>
          2. 사진 주제 3가지를 가장 ‘잘 담았다고 생각하는 사진' 1개 선택
        </div>
        <div>3. 투표 완료</div>
        <div>※ 1인 1표만 가능</div>
      </S.NoticeList>
      <S.NoticeList>
        <S.ListTitle>🏆 결과 발표</S.ListTitle>
        <div>일시: 5월 15일(금) 18:20 ~ 18:50</div>
        <div>장소: 영근터 무대</div>
        <div>여러분의 투표 결과를 바탕으로 최종 수상작이 발표됩니다!</div>
      </S.NoticeList>

      <S.NoticeCaption>
        - 타인의 초상권 보호를 위해 사진 및 화면 캡처는 삼가주시기 바랍니다.
        <br />- 후보에 선정된 사진은 축제 영상 및 사진에 활용될 수 있습니다.
        <br />- 사진 후보에 선정된 참여자 중 현장 미참여 시, 수상 및 상품 수령이
        불가합니다.
      </S.NoticeCaption>
    </S.ContestNotice>
  );
}

export default ContestNotice;
