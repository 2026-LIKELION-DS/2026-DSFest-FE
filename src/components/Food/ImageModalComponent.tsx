import { useRef, useState } from "react";
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

  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handleClose = () => {
    setCurrentIndex(0);
    onClose();
  };

  if (!isOpen || images.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const diff = e.clientX - startXRef.current;

    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    isDraggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <S.Overlay onClick={handleClose}>
      <S.Counter>
        {currentIndex + 1}/{images.length}
      </S.Counter>

      <S.ImageBox
        type="button"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <S.Image src={images[currentIndex]} alt="가게 이미지" />
      </S.ImageBox>

      <S.CloseButton type="button" onClick={handleClose}>
        닫기
      </S.CloseButton>
    </S.Overlay>
  );
}
