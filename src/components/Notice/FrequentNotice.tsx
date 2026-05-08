import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import NoticeCard from "./NoticeCard";
import * as S from "../../styles/Notice.style";

import chevronRight from "../../assets/Notice/ChevronRight.svg";

type NoticeCategory = "EVENT" | "PERFORMANCE" | "NOTICE" | "ETC";

const CATEGORY_LABEL: Record<NoticeCategory, string> = {
  EVENT: "이벤트",
  PERFORMANCE: "공연",
  NOTICE: "안내",
  ETC: "기타",
};

const getCategoryLabel = (category: string) => {
  return CATEGORY_LABEL[category as NoticeCategory] ?? category;
};

interface FrequentNotice {
  id: number;
  category: string;
  title: string;
}

interface FrequentNoticeProps {
  noticeCards: FrequentNotice[];
}

export default function FrequentNotice({ noticeCards }: FrequentNoticeProps) {
  const navigate = useNavigate();

  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const positionRef = useRef(0);
  const startXRef = useRef(0);
  const startPositionRef = useRef(0);

  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const clickedIdRef = useRef<number | null>(null);

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

  const normalizePositionRef = useRef(normalizePosition);

  useEffect(() => {
    normalizePositionRef.current = normalizePosition;
  });

  useEffect(() => {
    if (noticeCards.length === 0) return;

    const speed = 30; // px per second

    const animate = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!isDraggingRef.current) {
        positionRef.current = normalizePositionRef.current(
          positionRef.current - (speed * deltaTime) / 1000,
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

      lastTimeRef.current = null;
    };
  }, [noticeCards.length]);

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    noticeId: number,
  ) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    clickedIdRef.current = noticeId;

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
    const noticeId = clickedIdRef.current;

    isDraggingRef.current = false;
    hasMovedRef.current = false;
    clickedIdRef.current = null;

    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // 이미 해제된 경우 무시
    }

    if (wasClick && noticeId !== null) {
      navigate(`/notice/${noticeId}`);
    }
  };

  const mergedNoticeCards = [...noticeCards, ...noticeCards];

  return (
    <>
      <S.SectionHeader>
        <S.SectionTitle>자주 찾는 공지</S.SectionTitle>
        <S.ViewAll onClick={() => navigate("/notice/all")}>
          <p>공지 전체보기</p>
          <img src={chevronRight} alt="Chevron Right" />
        </S.ViewAll>
      </S.SectionHeader>

      <S.ScrollWrapper>
        <S.CardScrollArea
          ref={trackRef}
          $position={position}
          $isDragging={isDragging}
        >
          {mergedNoticeCards.map((card, index) => (
            <S.NoticeCarouselItem
              key={`${card.id}-${index}`}
              onPointerDown={(e) => handlePointerDown(e, card.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <NoticeCard
                category={getCategoryLabel(card.category)}
                title={card.title}
              />
            </S.NoticeCarouselItem>
          ))}
        </S.CardScrollArea>
      </S.ScrollWrapper>
    </>
  );
}
