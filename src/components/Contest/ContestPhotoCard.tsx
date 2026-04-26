import * as S from "../../styles/ContestPhotoCard.style";

import VoteOff from "../../assets/Contest/VoteOff.svg";
// import VoteOn from "../../assets/Contest/VoteON.svg";
import Zoom from "../../assets/Contest/ZoomIcon.svg";
import examplePhoto from "../../assets/hahyunsang_sample.svg";

export default function ContestPhotoCard() {
  return (
    <S.PhotoCardWrapper>
      <S.PhotoCard>
        <S.PhotoImgWrapper>
          <S.Photo src={examplePhoto} />
          <S.ZoomIcon src={Zoom} />
        </S.PhotoImgWrapper>
        <S.PhotoTitle>사진 제목</S.PhotoTitle>
      </S.PhotoCard>
      <S.VoteIcon src={VoteOff}></S.VoteIcon>
    </S.PhotoCardWrapper>
  );
}
