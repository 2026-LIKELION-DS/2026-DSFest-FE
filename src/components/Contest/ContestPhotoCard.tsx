import { useState } from "react";
import axios from "axios";
import * as S from "../../styles/ContestPhotoCard.style";
import ContestDetail from "./ContestDetail";
import VoteOff from "../../assets/Contest/VoteOff.svg";
import VoteOn from "../../assets/Contest/VoteON.svg";
import Zoom from "../../assets/Contest/ZoomIcon.svg";

interface PhotoDetail {
  id: number;
  title: string;
  authorName: string;
  description: string;
  imageUrl: string;
}

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
  const baseUrl = import.meta.env.VITE_API_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState<PhotoDetail | null>(null);

  const handleCardClick = () => {
    axios
      .get(`${baseUrl}/api/photo-contest/${photo.id}`)
      .then((res) => {
        if (res.data.isSuccess) {
          setDetail(res.data.result);
          setIsModalOpen(true);
        }
      })
      .catch((err) => console.error("상세 조회 에러:", err));
  };

  return (
    <>
      <S.PhotoCardWrapper>
        <S.PhotoCard onClick={handleCardClick}>
          <S.PhotoImgWrapper>
            <S.Photo src={photo.src} />
            <S.ZoomIcon src={Zoom} />
          </S.PhotoImgWrapper>
          <S.PhotoTitle>{photo.title}</S.PhotoTitle>
        </S.PhotoCard>
        <S.VoteIcon src={isSelected ? VoteOn : VoteOff} onClick={onSelect} />
      </S.PhotoCardWrapper>

      {detail && (
        <ContestDetail
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={detail.authorName}
          description={detail.description}
          title={detail.title}
          images={[detail.imageUrl]}
          content=""
        />
      )}
    </>
  );
}
