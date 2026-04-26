import { useState } from "react";
import * as S from "../../styles/ImageModalComponent.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

export default function ImageModalComponent({
  isOpen,
  onClose,
  images,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClose = () => {
    setCurrentIndex(0);
    onClose();
  };

  if (!isOpen || images.length === 0) return null;

  const handleNextImage = () => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <S.Overlay onClick={handleClose}>
      <S.Counter>
        {currentIndex + 1}/{images.length}
      </S.Counter>

      <S.ImageBox
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNextImage();
        }}
      >
        <S.Image src={images[currentIndex]} alt="가게 이미지" />
      </S.ImageBox>

      <S.CloseButton type="button" onClick={handleClose}>
        닫기
      </S.CloseButton>
    </S.Overlay>
  );
}
