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
  categories?: string[];
  boothTypes?: string[];
  description?: string;
  images?: string[];
  imageUrls?: string[];
  everytimeUrl?: string;
  instagramUrl?: string;
  collabInstagramUrl?: string;
  youtubeUrl?: string;
  openKakaoUrl?: string;
  operatingDays?: string[];
  boothNumber?: number;
  positionNumber: number;
}

interface ModalProps {
  booth: Booth;
  onClose: () => void;
  onNavigateToMap: (id: number) => void;
  isNight: boolean;
  isRandom?: boolean;
}

const BoothModalComponent: React.FC<ModalProps> = ({
  booth,
  onClose,
  onNavigateToMap,
  isRandom = false,
}) => {
  const [detailConfig, setDetailConfig] = useState({
    isOpen: false,
    initialIndex: 0,
  });

  if (!booth) return null;

  const images =
    booth.imageUrls && booth.imageUrls.length > 0
      ? booth.imageUrls
      : booth.images && booth.images.length > 0
        ? booth.images
        : [];

  const openImageDetail = (idx: number) => {
    setDetailConfig({ isOpen: true, initialIndex: idx });
  };

  const closeImageDetail = () => {
    setDetailConfig({ ...detailConfig, isOpen: false });
  };

  const getDisplayStatus = () => {
    if (booth.status === "운영 중") return `운영 중`;
    if (booth.status === "운영 예정") return `운영 예정`;
    if (booth.status === "상시") return `상시 운영`;
    return `운영 종료`;
  };

  const getCleanCategory = () => {
    if (booth.categories && booth.categories.length > 0) {
      const cat = booth.categories.find((c) => c !== "DAY" && c !== "NIGHT");
      if (cat) return cat;
    }

    if (booth.boothTypes && booth.boothTypes.length > 0) {
      const type = booth.boothTypes.find((t) => t !== "DAY" && t !== "NIGHT");
      if (type) return type;
    }

    if (
      booth.category &&
      booth.category !== "DAY" &&
      booth.category !== "NIGHT"
    ) {
      const firstCat = booth.category.split(",")[0].trim();
      if (firstCat !== "DAY" && firstCat !== "NIGHT") return firstCat;
    }

    return "체험";
  };

  const getOperatingTime = () => {
    const boothName = booth.name.replace(/\s/g, "");

    if (boothName.includes("청춘스토어"))
      return [
        "13일(수) 11:00~19:00",
        "14일(목) 11:00~19:00",
        "15일(금) 11:00~19:00",
      ];
    if (boothName.includes("옐로우링크"))
      return [
        "13일(수) 15:00~22:00",
        "14일(목) 15:00~22:00",
        "15일(금) 15:00~22:00",
      ];
    if (boothName.includes("총학운영본부"))
      return [
        "13일(수) 09:00~22:00",
        "14일(목) 09:00~22:00",
        "15일(금) 09:00~22:00",
      ];

    return booth.operatingDays && booth.operatingDays.length > 0
      ? booth.operatingDays
      : ["운영 시간 정보 없음"];
  };

  const displayOperatingTimes = getOperatingTime();

  return (
    <>
      <S.ModalOverlay onClick={onClose}>
        <S.ModalContainer onClick={(e) => e.stopPropagation()}>
          <S.StatusBadge $status={booth.status}>
            {getDisplayStatus()}
          </S.StatusBadge>

          <S.ContentArea>
            <S.Title>
              {booth.positionNumber}. {booth.name}
            </S.Title>
            <S.Divider />

            <S.InfoList>
              <S.InfoItem>
                <S.Icons src={Users} /> {booth.operator || "운영진"}
              </S.InfoItem>
              <S.InfoItem style={{ alignItems: "flex-start" }}>
                <S.Icons src={Clock} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {displayOperatingTimes.map((time, index) => (
                    <span key={index}>{time}</span>
                  ))}
                </div>
              </S.InfoItem>
              <S.InfoItem>
                <S.Icons src={Store} /> {getCleanCategory()} 부스
              </S.InfoItem>
              {booth.openKakaoUrl && (
                <S.InfoItem>
                  <S.Icons src={Phone} />
                  <a
                    href={booth.openKakaoUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    오픈채팅 연결하기
                  </a>
                </S.InfoItem>
              )}
            </S.InfoList>

            {images.length > 0 && (
              <S.ImageRow>
                {images.map((src, idx) => (
                  <S.BoothImage
                    key={idx}
                    src={src}
                    onClick={() => {
                      trackEvent("booth_image_view");
                      openImageDetail(idx);
                    }}
                    alt={`부스 이미지 ${idx + 1}`}
                    onError={(e) => (e.currentTarget.src = examplePhoto)}
                  />
                ))}
              </S.ImageRow>
            )}

            <S.Description>{booth.description}</S.Description>

            {(booth.everytimeUrl ||
              booth.instagramUrl ||
              booth.collabInstagramUrl ||
              booth.youtubeUrl) && (
              <S.LinkSection>
                <S.LinkIcon src={Link} />
                <S.LinkTagGroup>
                  {booth.everytimeUrl && (
                    <S.LinkTag
                      href={booth.everytimeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      에브리타임
                    </S.LinkTag>
                  )}
                  {booth.instagramUrl && (
                    <S.LinkTag
                      href={booth.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      인스타그램
                    </S.LinkTag>
                  )}
                  {booth.collabInstagramUrl && (
                    <S.LinkTag
                      href={booth.collabInstagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      공동 인스타
                    </S.LinkTag>
                  )}
                  {booth.youtubeUrl && (
                    <S.LinkTag
                      href={booth.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      유튜브
                    </S.LinkTag>
                  )}
                </S.LinkTagGroup>
              </S.LinkSection>
            )}
          </S.ContentArea>

          <S.ButtonGroup $isRandom={isRandom}>
            <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
            {!isRandom && (
              <S.ActionButton
                onClick={() => {
                  onNavigateToMap(booth.id);
                  onClose();
                }}
              >
                지도에서 위치보기
              </S.ActionButton>
            )}
          </S.ButtonGroup>
        </S.ModalContainer>
      </S.ModalOverlay>
      <ImageDetailComponent
        key={
          detailConfig.isOpen ? `detail-${detailConfig.initialIndex}` : "closed"
        }
        isOpen={detailConfig.isOpen}
        initialIndex={detailConfig.initialIndex}
        images={images}
        onClose={closeImageDetail}
      />
    </>
  );
};

export default BoothModalComponent;
