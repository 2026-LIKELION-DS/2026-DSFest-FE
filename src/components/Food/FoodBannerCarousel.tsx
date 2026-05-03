import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../../utils/analytics";
import * as S from "../../styles/FoodBanner.styles";

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

interface Props {
  onImageClick?: (images: string[]) => void;
}

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

export default function FoodBannerCarousel() {
  const API_URL = import.meta.env.VITE_API_URL;

  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const positionRef = useRef(0);
  const startXRef = useRef(0);
  const startPositionRef = useRef(0);
  const isDraggingRef = useRef(false);

  const [banners, setBanners] = useState<FoodTruckBanner[]>([]);
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${API_URL}/api/food-trucks/banners`);
        const data = await response.json();

        if (!response.ok || !data.isSuccess) {
          alert(data.message || "푸드트럭 배너를 불러오지 못했습니다.");
          return;
        }

        setBanners(data.result);
      } catch (error) {
        console.error(error);
        alert("푸드트럭 배너 조회 중 오류가 발생했습니다.");
      }
    };

    fetchBanners();
  }, [API_URL]);

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
    const speed = 0.5;

    const animate = () => {
      if (!isDraggingRef.current) {
        positionRef.current = normalizePositionRef.current(
          positionRef.current - speed
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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    trackEvent("foodtruck_banner_scroll");

    isDraggingRef.current = true;
    setIsDragging(true);

    startXRef.current = e.clientX;
    startPositionRef.current = positionRef.current;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const diff = e.clientX - startXRef.current;

    positionRef.current = normalizePosition(startPositionRef.current + diff);
    setPosition(positionRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setIsDragging(false);

    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const mergedBanners = banners.map((banner, index) => ({
    ...banner,
    iconImage: trucks[index % trucks.length].image,
  }));

  return (
    <S.BannerWrapper>
      <S.Track
        ref={trackRef}
        $position={position}
        $isDragging={isDragging}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {[...mergedBanners, ...mergedBanners].map((banner, index) => (
          <S.Card key={`${banner.id}-${index}`}>
            <S.Sticker>{banner.title}</S.Sticker>

            <S.ImageBox>
              <S.BannerImage src={banner.imageUrl} alt={banner.title} />
            </S.ImageBox>

            <S.PizzaImage src={banner.iconImage} alt="" />

            <S.StoreName>{banner.title}</S.StoreName>
          </S.Card>
        ))}
      </S.Track>
    </S.BannerWrapper>
  );
}
