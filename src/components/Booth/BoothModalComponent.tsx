import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// @ts-expect-error: Swiper CSS modules are not recognized by TS
import "swiper/css";
// @ts-expect-error: Swiper CSS modules are not recognized by TS
import "swiper/css/pagination";

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
  const [selectedImgIdx, setSelectedImgIdx] = useState<number | null>(null);

  if (!booth) return null;

  const images =
    booth.images && booth.images.length > 0
      ? booth.images
      : [examplePhoto, examplePhoto, examplePhoto];

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
                  onClick={() => setSelectedImgIdx(idx)}
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

      {/* 이미지 상세 모달 (Swipe 활성 버전) */}
      {selectedImgIdx !== null && (
        <S.FullImageOverlay onClick={() => setSelectedImgIdx(null)}>
          <S.SwiperWrapper onClick={(e) => e.stopPropagation()}>
            <Swiper
              modules={[Pagination]}
              initialSlide={selectedImgIdx}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ type: "fraction" }}
              observer={true}
              observeParents={true}
              touchEventsTarget="container"
              className="mySwiper"
            >
              {images.map((src: string, index: number) => (
                <SwiperSlide key={index}>
                  <S.FullImage src={src} draggable={false} />
                </SwiperSlide>
              ))}
            </Swiper>
          </S.SwiperWrapper>

          <S.FullCloseButton onClick={() => setSelectedImgIdx(null)}>
            닫기
          </S.FullCloseButton>
        </S.FullImageOverlay>
      )}
    </>
  );
};

export default BoothModalComponent;
