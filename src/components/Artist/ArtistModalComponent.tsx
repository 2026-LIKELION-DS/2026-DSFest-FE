import React, { useState } from "react";

import ImageDetailComponent from "../../components/Common/ImageDetail";
import * as S from "../../styles/ArtistComponent.style";

interface ArtistModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const images = [
  "/src/assets/hahyunsang_sample.svg",
  "/src/assets/hahyunsang_sample.svg",
  "/src/assets/hahyunsang_sample.svg",
  "/src/assets/hahyunsang_sample.svg",
];

const ArtistModalComponent: React.FC<ArtistModalComponentProps> = ({
  isOpen,
  onClose,
}) => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    initialIndex: 0,
  });

  if (!isOpen) return null;

  const displayImages = images;

  return (
    <>
      <S.ArtistModalOverlay onClick={onClose}>
        <S.ArtistModalContainer onClick={(e) => e.stopPropagation()}>
          <S.ArtistContentArea>
            <S.ArtistModalTitle>스탠딩존 입장 관련 안내</S.ArtistModalTitle>
            <S.ArtistModalDivider />

            <S.ArtistImageRow>
              {displayImages.map((src, idx) => (
                <S.ModalImage
                  key={`${src}-${idx}`}
                  src={src}
                  alt={`안내 이미지 ${idx + 1}`}
                  onClick={() =>
                    setModalConfig({
                      isOpen: true,
                      initialIndex: idx,
                    })
                  }
                />
              ))}
            </S.ArtistImageRow>

            <S.ArtistDescription>
              스탠딩존 입장 관련 안내입니다.
              <br />
              공연장 입장 시 현장 스태프의 안내에 따라 이동해주세요.
              <br />
              안전을 위해 무리한 이동이나 새치기는 삼가주세요.
            </S.ArtistDescription>
          </S.ArtistContentArea>

          <S.ArtistButtonGroup>
            <S.ArtistCloseButton onClick={onClose}>닫기</S.ArtistCloseButton>
          </S.ArtistButtonGroup>
        </S.ArtistModalContainer>
      </S.ArtistModalOverlay>

      <ImageDetailComponent
        isOpen={modalConfig.isOpen}
        initialIndex={modalConfig.initialIndex}
        images={displayImages}
        onClose={() =>
          setModalConfig((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
      />
    </>
  );
};

export default ArtistModalComponent;
