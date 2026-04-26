import * as S from "../../styles/ContestPhotoCard.style";

import VoteOff from "../../assets/Contest/VoteOff.svg";
import VoteOn from "../../assets/Contest/VoteON.svg";
import Zoom from "../../assets/Contest/ZoomIcon.svg";

interface ContestPhotoCardProps {
  photo: { id: number; title: string; src: string };
  isSelected: boolean;
  onSelect: () => void;
}

export default function ContestPhotoCard({
  photo,
  isSelected,
  onSelect,
}: ContestPhotoCardProps) {
  return (
    <S.PhotoCardWrapper>
      <S.PhotoCard>
        <S.PhotoImgWrapper>
          <S.Photo src={photo.src} />
          <S.ZoomIcon src={Zoom} />
        </S.PhotoImgWrapper>
        <S.PhotoTitle>{photo.title}</S.PhotoTitle>
      </S.PhotoCard>
      <S.VoteIcon src={isSelected ? VoteOn : VoteOff} onClick={onSelect} />
    </S.PhotoCardWrapper>
  );
}
