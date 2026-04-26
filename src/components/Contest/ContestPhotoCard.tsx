import { useState } from "react";
import * as S from "../../styles/ContestPhotoCard.style";
import ContestDetail from "./ContestDetail";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <S.PhotoCardWrapper>
        <S.PhotoCard onClick={() => setIsModalOpen(true)}>
          <S.PhotoImgWrapper>
            <S.Photo src={photo.src} />
            <S.ZoomIcon src={Zoom} />
          </S.PhotoImgWrapper>
          <S.PhotoTitle>{photo.title}</S.PhotoTitle>
        </S.PhotoCard>
        <S.VoteIcon src={isSelected ? VoteOn : VoteOff} onClick={onSelect} />
      </S.PhotoCardWrapper>

      <ContestDetail
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name="김덕우" // photo.name
        description="사진에 관한 설명이 들어가는 자리입니다 사진에 관한 설명이 들어가는 자리입니다 사진에 관한 설명이 들어가는 자리입니다 사진에 관한 설명이 들어가는 자리입니다 " //photo.description
        title={photo.title}
        images={[photo.src]}
        content=""
      />
    </>
  );
}
