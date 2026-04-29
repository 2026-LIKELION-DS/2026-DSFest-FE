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
  onImageClick: (images: string[]) => void;
}

const trucks = [
  {
    name: "Take one",
    banner: "직화 닭꼬치 어때요?",
    image: chicken,
    images: [chicken],
  },
  {
    name: "타우라푸드",
    banner: "닭강정 어때요?",
    image: chicken,
    images: [chicken, pizza],
  },
  {
    name: "얌얌츄러스",
    banner: "츄러스 어때요?",
    image: IceCream,
    images: [IceCream],
  },
  {
    name: "이태원케밥",
    banner: "케밥 어때요?",
    image: Burrito,
    images: [Burrito],
  },
  {
    name: "순대써는남자",
    banner: "철판버터오징어 어때요?",
    image: Squid,
    images: [Squid],
  },
  {
    name: "모디",
    banner: "스테이크 덮밥 어때요?",
    image: Meat,
    images: [Meat],
  },
  {
    name: "야미",
    banner: "소고기불초밥 어때요?",
    image: Sushi,
    images: [Sushi],
  },
  { name: "KogiBBQ", banner: "바베큐 어때요?", image: Meat, images: [Meat] },
  {
    name: "짱가곱창",
    banner: "곱창·막창 어때요?",
    image: Meat,
    images: [Meat],
  },
  {
    name: "오야붕",
    banner: "야끼소바 어때요?",
    image: Takeout,
    images: [Takeout],
  },
  { name: "골드키즈", banner: "피자 어때요?", image: pizza, images: [pizza] },
  {
    name: "썬플라워",
    banner: "크림새우 어때요?",
    image: FriedShrimp,
    images: [FriedShrimp],
  },
  {
    name: "스위트퍼플",
    banner: "밀크쉐이크 어때요?",
    image: Cup,
    images: [Cup],
  },
];

export default function FoodBannerCarousel({ onImageClick }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const positionRef = useRef(0);
  const startXRef = useRef(0);
  const startPositionRef = useRef(0);
  const isDraggingRef = useRef(false);
  const draggedRef = useRef(false);

  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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

  useEffect(() => {
    const speed = 0.5;

    const animate = () => {
      if (!isDraggingRef.current) {
        positionRef.current = normalizePosition(positionRef.current - speed);
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
    draggedRef.current = false;

    setIsDragging(true);

    startXRef.current = e.clientX;
    startPositionRef.current = positionRef.current;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const diff = e.clientX - startXRef.current;

    if (Math.abs(diff) > 5) {
      draggedRef.current = true;
    }

    positionRef.current = normalizePosition(startPositionRef.current + diff);
    setPosition(positionRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setIsDragging(false);

    e.currentTarget.releasePointerCapture(e.pointerId);
  };

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
        {[...trucks, ...trucks].map((truck, index) => (
          <S.Card key={`${truck.name}-${index}`}>
            <S.Sticker>{truck.banner}</S.Sticker>

            <S.ImageBox
              type="button"
              onClick={() => {
                if (draggedRef.current) return;
                onImageClick(truck.images);
              }}
            />

            <S.PizzaImage src={truck.image} alt={truck.name} />

            <S.StoreName>{truck.name}</S.StoreName>
          </S.Card>
        ))}
      </S.Track>
    </S.BannerWrapper>
  );
}
