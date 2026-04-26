import { useEffect, useState } from "react";
import * as S from "../../styles/ContestDetail.style";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  name?: string;
  images?: string[];
  content: string;
  description?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  name,
  images,
  content,
  description,
}: ModalProps) {
  const [imageDetail, setImageDetail] = useState({
    isOpen: false,
    initialIndex: 0,
  });

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

  if (!isOpen && !imageDetail.isOpen) return null;

  return (
    <>
      {isOpen && (
        <S.CommonModalOverlay onClick={onClose}>
          <S.CommonModalContainer onClick={(e) => e.stopPropagation()}>
            <S.Overlay>
              <S.Container>
                <S.Title>{title}</S.Title>
                <S.Divider />
                {images && images.length > 0 && (
                  <S.ImageRow>
                    {images.map((src, index) => (
                      <S.Image
                        key={index}
                        src={src}
                        alt={`이미지 ${index + 1}`}
                        onClick={() => {
                          onClose();
                          setImageDetail({ isOpen: true, initialIndex: index });
                        }}
                      />
                    ))}
                  </S.ImageRow>
                )}
                {name && <S.Name>{name}</S.Name>}
                {description && <S.Description>{description}</S.Description>}
                <S.Content>{content}</S.Content>
                <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
              </S.Container>
            </S.Overlay>
          </S.CommonModalContainer>
        </S.CommonModalOverlay>
      )}
    </>
  );
}
