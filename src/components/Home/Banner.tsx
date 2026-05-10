import { useEffect, useState, useRef, useCallback, type MouseEvent, type TouchEvent } from "react";
import * as S from "../../styles/HomeBanner.style";
import BannerPolaroid from "../../components/Home/BannerPolaroid";


import ContestBanner from "../../assets/home/Contest-home.png"
import TestBanner from "../../assets/home/Test-home.png"
import Day1Artist1 from "../../assets/home/Day1-CherryFilter-home.png"
import Day1Artist2 from "../../assets/home/Day1-Izna-home.png"
import Day1Artist3 from "../../assets/home/Day1-LeeChaeyeon-home.png"
import Day2Artist1 from "../../assets/home/Day2-ChoiYuRee-home.png"
import Day2Artist2 from "../../assets/home/Day2-Cosmosy-home.png"
import Day3Artist1 from "../../assets/home/Day3-AtHeart-home.png"
import Day3Artist2 from "../../assets/home/Day3-KiiKii-home.png"
import Day3Artist3 from "../../assets/home/Day3-Seori-home.png"
import Day3Artist4 from "../../assets/home/Day3-Sunmi-home.png"


interface BannerItem {
  title: string;
  stickerText: string;
  images: string[];
  link: string;
  isExternal?: boolean;
}

interface BannerProps {
  isPaused?: boolean;
}

const artistImagesByDay = {
  day1: [Day1Artist1, Day1Artist2, Day1Artist3],
  day2: [Day2Artist1, Day2Artist2,],
  day3: [Day3Artist1, Day3Artist2, Day3Artist3, Day3Artist4],
};

// const currentDay: keyof typeof artistImagesByDay = "day2";
// 개발 테스트용 코드
// 날짜별로 아티스트 잘 바뀌는지 확인하고 싶으면 38~51번째 줄까지 주석처리 후에 이 코드 살려주세요!

const getCurrentFestivalDay = (): keyof typeof artistImagesByDay => {
  const today = new Date();

  const month = today.getMonth() + 1;
  const date = today.getDate();

  if (month === 5 && date === 13) return "day1";
  if (month === 5 && date === 14) return "day2";
  if (month === 5 && date === 15) return "day3";

  return "day1";
};

const currentDay = getCurrentFestivalDay();

const banners: BannerItem[] = [
  {
    title: "오늘의 아티스트",
    stickerText: "플레이리스트 예습하기🎧",
    images: artistImagesByDay[currentDay],
    link: "/artist",
  },
  {
    title: "근화제 청춘 유형 테스트",
    stickerText: "나의 청춘 유형은?🫧",
    images: [TestBanner],
    link: "https://smore.im/quiz/wPemq6eFFH",
    isExternal: true,
  },
  {
    title: "청춘 한 컷 콘테스트",
    stickerText: "오늘의 청춘을 사진으로!📸",
    images: [ContestBanner],
    link: "/contest",
  },
];

const extendedBanners = [
  banners[banners.length - 2],
  banners[banners.length - 1],
  ...banners,
  banners[0],
  banners[1],
];

export default function Banner({ isPaused = false }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isTransition, setIsTransition] = useState(true);
  const [duration, setDuration] = useState(0.8);
  

  const [touchStartX, setTouchStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [moved, setMoved] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

const stopTimer = useCallback(() => {
  if (timerRef.current) {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }
}, []);

const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = window.setInterval(() => {
      setDuration(0.8);
      setIsTransition(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
  }, [stopTimer]);

useEffect(() => {
  startTimer();

  return () => stopTimer();
}, [startTimer, stopTimer]);

  const handleTransitionEnd = () => {
    if (currentIndex >= extendedBanners.length - 2) {
        setIsTransition(false);
        setCurrentIndex(2);
    }
    else if (currentIndex <= 1) {
        setIsTransition(false);
        setCurrentIndex(banners.length + 1);
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
    setDuration(0.1);
    setIsTransition(true);

    let nextIndex = currentIndex;

    if (dragOffset < -50) {
        nextIndex += 1;
    } else if (dragOffset > 50) {
        nextIndex -= 1;
    }

    setCurrentIndex(nextIndex);
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
    if (isPaused) {
        stopTimer();
        return;
    }

    startTimer();

    return () => stopTimer();
    }, [isPaused, startTimer, stopTimer]);

  const activeDotIndex = (currentIndex - 2 + banners.length) % banners.length;
  
  return (
    <S.BannerSection>
      <S.BannerViewport>
        <S.BannerTrack
          $currentIndex={currentIndex}
          $isTransition={isTransition}
          $dragOffset={dragOffset}
          $duration={duration}
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
                <BannerPolaroid
                  title={banner.title}
                  stickerText={banner.stickerText}
                  images={banner.images}
                  link={banner.link}
                  isExternal={banner.isExternal}
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
              setCurrentIndex(index + 2);
            }}
          />
        ))}
      </S.BannerDots>
    </S.BannerSection>
  );
}