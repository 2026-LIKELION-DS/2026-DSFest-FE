import React, { useState } from "react";

// @ts-expect-error: Swiper CSS modules are not recognized by TS
import "swiper/css";
// @ts-expect-error: Swiper CSS modules are not recognized by TS
import "swiper/css/pagination";

import ImageDetailComponent from "../Common/ImageDetail";

import * as S from "../../styles/BoothModalComponent.style";
import Phone from "../../assets/Booth/Phone.svg";
import Users from "../../assets/Booth/Users.svg";
import Store from "../../assets/Booth/Store.svg";
import Clock from "../../assets/Booth/Clock.svg";
import Link from "../../assets/Booth/Link.svg";
import examplePhoto from "../../assets/hahyunsang_sample.svg";

interface ModalProps {
  booth: any;
  onClose: () => void;
  onNavigateToMap: (id: number) => void;
}

const BoothModalComponent: React.FC<ModalProps> = ({
  booth,
  onClose,
  onNavigateToMap,
}) => {
  const [detailConfig, setDetailConfig] = useState({
    isOpen: false,
    initialIndex: 0,
  });

  if (!booth) return null;

  const images =
    booth.images && booth.images.length > 0
      ? booth.images
      : [examplePhoto, examplePhoto, examplePhoto];

  const openImageDetail = (idx: number) => {
    setDetailConfig({ isOpen: true, initialIndex: idx });
  };

  const closeImageDetail = () => {
    setDetailConfig({ ...detailConfig, isOpen: false });
  };
  return (
    <>
      <S.ModalOverlay onClick={onClose}>
        <S.ModalContainer onClick={(e) => e.stopPropagation()}>
          <S.StatusBadge $status={booth.status}>{booth.status}</S.StatusBadge>

          <S.ContentArea>
            <S.Title>
              {booth.id}. {booth.name}
            </S.Title>
            <S.Divider />

            <S.InfoList>
              <S.InfoItem>
                <S.Icons src={Users} /> {booth.operator || "운영진"}
              </S.InfoItem>
              <S.InfoItem>
                <S.Icons src={Clock} /> 13일(수) 13:00 - 20:00
              </S.InfoItem>
              <S.InfoItem>
                <S.Icons src={Store} /> {booth.category || "판매"} 부스
              </S.InfoItem>
              <S.InfoItem>
                <S.Icons src={Phone} /> open.kakao.com
              </S.InfoItem>
            </S.InfoList>

            <S.ImageRow>
              {images.map((src: string, idx: number) => (
                <S.BoothImage
                  key={idx}
                  src={src}
                  onClick={() => openImageDetail(idx)}
                  alt={`부스 이미지 ${idx + 1}`}
                />
              ))}
            </S.ImageRow>

            <S.Description>{booth.description}</S.Description>

            <S.LinkSection>
              <S.LinkIcon src={Link} />
              <S.LinkTagGroup>
                <S.LinkTag
                  href={booth.everytimeUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  에브리타임 게시글
                </S.LinkTag>
                <S.LinkTag
                  href={booth.instagramUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  인스타그램
                </S.LinkTag>
              </S.LinkTagGroup>
            </S.LinkSection>
          </S.ContentArea>

          <S.ButtonGroup>
            <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
            <S.ActionButton
              onClick={() => {
                onNavigateToMap(booth.id);
                onClose();
              }}
            >
              지도에서 위치보기
            </S.ActionButton>
          </S.ButtonGroup>
        </S.ModalContainer>
      </S.ModalOverlay>
      <ImageDetailComponent
        isOpen={detailConfig.isOpen}
        initialIndex={detailConfig.initialIndex}
        images={images}
        onClose={closeImageDetail}
      />
    </>
  );
};

export default BoothModalComponent;
