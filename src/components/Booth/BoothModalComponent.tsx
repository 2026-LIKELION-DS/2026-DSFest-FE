import React, { useState } from "react";
import { trackEvent } from "../../utils/analytics";

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

interface Booth {
  id: number;
  name: string;
  status: string;
  operator?: string;
  category?: string;
  description?: string;
  images?: string[];
  everytimeUrl?: string;
  instagramUrl?: string;
  openKakaoUrl?: string;
  operatingTimes?: string[];
  boothNumber?: number;
}

interface ModalProps {
  booth: Booth;
  onClose: () => void;
  onNavigateToMap: (id: number) => void;
  isNight: boolean;
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

  const getDisplayStatus = () => {
    if (booth.status === "운영 중") return `운영 중`;
    if (booth.status === "운영 예정") return `운영 예정`;
    return `운영 종료`;
  };

  return (
    <>
      <S.ModalOverlay onClick={onClose}>
        <S.ModalContainer onClick={(e) => e.stopPropagation()}>
          <S.StatusBadge $status={booth.status}>
            {getDisplayStatus()}
          </S.StatusBadge>

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
                <S.Icons src={Clock} />{" "}
                {booth.operatingTimes?.[0] || "운영 시간 정보 없음"}
              </S.InfoItem>
              <S.InfoItem>
                <S.Icons src={Store} /> {booth.category || "판매"} 부스
              </S.InfoItem>
              <S.InfoItem>
                <S.Icons src={Phone} />
                <a
                  href={booth.openKakaoUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {booth.openKakaoUrl ? "오픈채팅 연결하기" : "연락처 없음"}
                </a>
              </S.InfoItem>
            </S.InfoList>

            <S.ImageRow>
              {images.map((src: string, idx: number) => (
                <S.BoothImage
                  key={idx}
                  src={src}
                  onClick={() => {
                    trackEvent("booth_image_view");
                    openImageDetail(idx);
                  }}
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
