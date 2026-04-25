import { useState } from "react"; // useState 추가
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper"; // 타입 불러오기

// @ts-expect-error: Swiper CSS modules are not recognized by TS
import "swiper/css";
// @ts-expect-error: Swiper CSS modules are not recognized by TS
import "swiper/css/pagination";

import * as S from "./ImageDetail.style";

interface ImageDetailProps {
  isOpen: boolean;
  initialIndex: number;
  images: string[];
  onClose: () => void;
}

export default function ImageDetailComponent({
  isOpen,
  initialIndex,
  images,
  onClose,
}: ImageDetailProps) {
  const [activeIdx, setActiveIdx] = useState(initialIndex);

  if (!isOpen) return null;

  return (
    <S.ImageDetailPage>
      <S.ImageContent>
        <S.ImageModalCount>
          {activeIdx + 1}/{images.length}
        </S.ImageModalCount>

        <Swiper
          modules={[Pagination]}
          initialSlide={initialIndex}
          slidesPerView={1}
          onSlideChange={(swiper: SwiperType) =>
            setActiveIdx(swiper.activeIndex)
          }
          style={{
            width: "100%",
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {images.map((src, idx) => (
            <SwiperSlide
              key={idx}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <S.ImageModalImage src={src} alt={`상세 이미지 ${idx + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        <S.ImageModalCloseButton type="button" onClick={onClose}>
          닫기
        </S.ImageModalCloseButton>
      </S.ImageContent>
    </S.ImageDetailPage>
  );
}
