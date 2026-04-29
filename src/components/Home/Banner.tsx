import { useEffect, useState, useRef, type MouseEvent, type TouchEvent } from "react";
import * as S from "../../styles/HomeBanner.style";
import BannerPolaroid from "../../components/Home/BannerPolaroid";

interface BannerItem {
  title: string;
  stickerText: string;
  image: string;
  link: string;
}

interface BannerProps {
  isPaused?: boolean;
}

const banners: BannerItem[] = [
  {
    title: "오늘의 아티스트",
    stickerText: "플레이리스트 예습하기🎧",
    image: "/images/banner1.png",
    link: "/artist",
  },
  {
    title: "근화제 청춘 유형 테스트",
    stickerText: "나의 청춘 유형은?🫧",
    image: "/images/banner2.png",
    link: "/@",
  },
  {
    title: "청춘 한 컷 컨테스트",
    stickerText: "오늘의 청춘을 사진으로!📸",
    image: "/images/banner3.png",
    link: "/@",
  },
];

const extendedBanners: BannerItem[] = [
  banners[banners.length - 1],
  ...banners,
  banners[0],
];

export default function Banner({ isPaused = false }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransition, setIsTransition] = useState(true);
  

  const [touchStartX, setTouchStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [moved, setMoved] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setIsTransition(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

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

  const handleTouchStart = (e: TouchEvent) => {
    stopTimer();
    setIsTransition(false);
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
    setMoved(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;

    if (Math.abs(diff) > 5) setMoved(true);
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setIsTransition(true);

    if (dragOffset < -50) {
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > 50) {
      setCurrentIndex((prev) => prev - 1);
    }

    setDragOffset(0);
    startTimer();
  };

  const handleLinkClick = (e: MouseEvent) => {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const activeDotIndex = (currentIndex - 1 + banners.length) % banners.length;

  return (
    <S.BannerSection>
      <S.BannerViewport>
        <S.BannerTrack
          $currentIndex={currentIndex}
          $isTransition={isTransition}
          $dragOffset={dragOffset}
          onTransitionEnd={handleTransitionEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {extendedBanners.map((banner, index) => (
            <S.BannerSlide
              key={`${banner.title}-${index}`}
              onClickCapture={handleLinkClick}
            >
              <BannerPolaroid {...banner} />
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