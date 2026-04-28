import { useEffect, useState } from "react";
import { trackEvent } from "../../utils/analytics";

import * as S from "../../styles/Home.style";
import BannerPolaroid from "../../components/Home/BannerPolaroid";

interface BannerItem {
  title: string;
  stickerText: string;
  image: string;
  link: string;
}

const banners: BannerItem[] = [
  {
    title: "아티스트",
    stickerText: "아티스트",
    image: "/images/banner1.png",
    link: "/artist",
  },
  {
    title: "근화제 청춘 유형 테스트",
    stickerText: "나의 청춘 유형은?",
    image: "/images/banner2.png",
    link: "/@",
  },
  {
    title: "사진 컨테스트",
    stickerText: "사진 컨테스트",
    image: "/images/banner3.png",
    link: "/@",
  },
];

const extendedBanners: BannerItem[] = [
  banners[banners.length - 1],
  ...banners,
  banners[0],
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransition, setIsTransition] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // ✅ transition 끝났을 때 처리 (develop 코드 유지)
  const handleTransitionEnd = () => {
    if (currentIndex === extendedBanners.length - 1) {
      setIsTransition(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransition(false);
      setCurrentIndex(banners.length);
    }
  };

  useEffect(() => {
    if (!isTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransition(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransition]);

  const activeDotIndex =
    (currentIndex - 1 + banners.length) % banners.length;

  return (
    <S.BannerSection>
      <S.BannerViewport>
        <S.BannerTrack
          $currentIndex={currentIndex}
          $isTransition={isTransition}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedBanners.map((banner, index) => (
            <S.BannerSlide key={`${banner.title}-${index}`}>
              <BannerPolaroid
                title={banner.title}
                stickerText={banner.stickerText}
                image={banner.image}
                link={banner.link}
                onClick={() =>
                  trackEvent("home_banner_click", {
                    banner_type: banner.title,
                  })
                }
              />
            </S.BannerSlide>
          ))}
        </S.BannerTrack>
      </S.BannerViewport>

      <S.BannerDots>
        {banners.map((_, index) => (
          <S.BannerDot
            key={index}
            $active={activeDotIndex === index}
            onClick={() => {
              setIsTransition(true);
              setCurrentIndex(index + 1);
            }}
          />
        ))}
      </S.BannerDots>
    </S.BannerSection>
  );
}