import { useEffect, useRef, useState } from "react";
//import { trackEvent } from "../../utils/analytics";
import * as S from "../../styles/FoodBanner.styles";

import bannerData from "../../data/FoodJson/foodtruckBanners.json";

import pizza from "../../assets/Food/Pizza.svg";
import chicken from "../../assets/Food/Chicken.svg";
import Burrito from "../../assets/Food/Burrito.svg";
import Cup from "../../assets/Food/Cup.svg";
import FriedShrimp from "../../assets/Food/FriedShrimp.svg";
import IceCream from "../../assets/Food/IceCream.svg";
import Meat from "../../assets/Food/Meat.svg";
import Squid from "../../assets/Food/Squid.svg";
import Sushi from "../../assets/Food/Sushi.svg";
import Takeout from "../../assets/Food/TakeoutBox.svg";

interface FoodTruckBanner {
  id: number;
  imageUrl: string;
  title: string;
}

const trucks = [
  { image: chicken, images: [chicken] },
  { image: chicken, images: [chicken, pizza] },
  { image: IceCream, images: [IceCream] },
  { image: Burrito, images: [Burrito] },
  { image: Squid, images: [Squid] },
  { image: Meat, images: [Meat] },
  { image: Sushi, images: [Sushi] },
  { image: Meat, images: [Meat] },
  { image: Meat, images: [Meat] },
  { image: Takeout, images: [Takeout] },
  { image: pizza, images: [pizza] },
  { image: FriedShrimp, images: [FriedShrimp] },
  { image: Cup, images: [Cup] },
];

const STORE_NAMES = [
  "Take one",
  "타우라푸드",
  "얌얌츄러스",
  "이태원케밥",
  "순대써는남자",
  "모디",
  "야미",
  "KogiBBQ",
  "짱가곱창",
  "오야붕",
  "골드키즈",
  "썬플라워",
  "스위트퍼플",
];

interface Props {
  onBannerClick: (storeName: string) => void;
}

export default function FoodBannerCarousel({ onBannerClick }: Props) {
  const clickedStoreNameRef = useRef("");
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const hasMovedRef = useRef(false);
  const positionRef = useRef(0);
  const startXRef = useRef(0);
  const startPositionRef = useRef(0);
  const isDraggingRef = useRef(false);

  const [banners, setBanners] = useState<FoodTruckBanner[]>([]);
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setBanners(bannerData.result);
  }, []);

  const getHalfWidth = () => {
    if (!trackRef.current) return 0;
    return trackRef.current.scrollWidth / 2;
  };

  const normalizePosition = (value: number) => {
    const halfWidth = getHalfWidth();

    if (halfWidth === 0) return value;

    if (value <= -halfWidth) {
      return value + halfWidth;
    }

    if (value >= 0) {
      return value - halfWidth;
    }

    return value;
  };

  const normalizePositionRef = useRef(normalizePosition);

  useEffect(() => {
    normalizePositionRef.current = normalizePosition;
  });

  useEffect(() => {
    const speed = 10;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (!isDraggingRef.current) {
        positionRef.current = normalizePositionRef.current(
          positionRef.current - speed * (deltaTime / 1000)
        );

        setPosition(positionRef.current);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    storeName: string
  ) => {
    //  trackEvent("foodtruck_banner_scroll");

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    clickedStoreNameRef.current = storeName;

    setIsDragging(true);

    startXRef.current = e.clientX;
    startPositionRef.current = positionRef.current;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const diff = e.clientX - startXRef.current;

    if (Math.abs(diff) > 8) {
      hasMovedRef.current = true;
    }

    positionRef.current = normalizePosition(startPositionRef.current + diff);
    setPosition(positionRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasClick = !hasMovedRef.current;
    const storeName = clickedStoreNameRef.current;

    isDraggingRef.current = false;
    hasMovedRef.current = false;
    clickedStoreNameRef.current = "";
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // 이미 해제된 경우 무시
    }

    if (wasClick && storeName) {
      onBannerClick(storeName);
    }
  };

  const mergedBanners = banners.map((banner, index) => ({
    ...banner,
    iconImage: trucks[index % trucks.length].image,
  }));

  return (
    <S.BannerWrapper>
      <S.Track ref={trackRef} $position={position} $isDragging={isDragging}>
        {[...mergedBanners, ...mergedBanners].map((banner, index) => (
          <S.Card
            key={`${banner.id}-${index}`}
            onPointerDown={(e) =>
              handlePointerDown(e, STORE_NAMES[index % STORE_NAMES.length])
            }
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <S.Sticker>{banner.title}</S.Sticker>

            <S.ImageBox>
              <S.BannerImage src={banner.imageUrl} alt={banner.title} />
            </S.ImageBox>

            <S.PizzaImage src={banner.iconImage} alt="" />

            <S.StoreName>{STORE_NAMES[index % STORE_NAMES.length]}</S.StoreName>
          </S.Card>
        ))}
      </S.Track>
    </S.BannerWrapper>
  );
}
