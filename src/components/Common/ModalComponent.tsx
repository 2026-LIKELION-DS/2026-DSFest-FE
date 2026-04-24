import { useEffect } from "react";
import * as S from "../../styles/ModalComponent.styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images?: string[];
  content: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  images,
  content,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Container onClick={(e) => e.stopPropagation()}>
        <S.Title>{title}</S.Title>
        <S.Divider />
        {images && images.length > 0 && (
          <S.ImageRow>
            {images.map((src, index) => (
              <S.Image key={index} src={src} alt={`이미지 ${index + 1}`} />
            ))}
          </S.ImageRow>
        )}
        <S.Content>{content}</S.Content>
        <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
      </S.Container>
    </S.Overlay>
  );
}
