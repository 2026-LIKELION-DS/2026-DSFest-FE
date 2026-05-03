import type { TouchEvent } from "react";
import type { Artist } from "../../components/Artist/ArtistCard";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const REPEAT_COUNT = 5;
const MIDDLE_REPEAT_INDEX = 2;
const GAP = 24;
const SWIPE_THRESHOLD = 50;

export function useArtistCarousel(artists: Artist[]) {
  const [currentPage, setCurrentPage] = useState(1);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstSlideRef = useRef<HTMLDivElement | null>(null);

  const startXRef = useRef<number | null>(null);
  const dragXRef = useRef(0);
  const slideStepRef = useRef(0);
  const centerOffsetRef = useRef(0);
  const virtualIndexRef = useRef(0);

  const repeatedArtists = useMemo(() => {
    if (artists.length <= 1) return artists;

    return Array.from({ length: REPEAT_COUNT }).flatMap(() => artists);
  }, [artists]);

  const setTrackTransition = useCallback((value: string) => {
    if (!trackRef.current) return;

    trackRef.current.style.transition = value;
  }, []);

  const getBaseTranslateX = useCallback(() => {
    if (artists.length <= 1) {
      return centerOffsetRef.current;
    }

    return (
      centerOffsetRef.current - virtualIndexRef.current * slideStepRef.current
    );
  }, [artists.length]);

  const applyTranslate = useCallback(
    (dragX = 0) => {
      if (!trackRef.current) return;

      const translateX = getBaseTranslateX() + dragX;
      trackRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
    },
    [getBaseTranslateX],
  );

  const measureCarousel = useCallback(() => {
    if (!wrapperRef.current || !firstSlideRef.current) return;

    const wrapperWidth = wrapperRef.current.offsetWidth;
    const slideWidth = firstSlideRef.current.offsetWidth;

    slideStepRef.current = slideWidth + GAP;
    centerOffsetRef.current = (wrapperWidth - slideWidth) / 2;

    applyTranslate(0);
  }, [applyTranslate]);

  const resetToMiddle = useCallback(
    (page = 1) => {
      if (artists.length <= 1) {
        virtualIndexRef.current = 0;
        setCurrentPage(1);
        setTrackTransition("none");

        requestAnimationFrame(() => {
          applyTranslate(0);
        });

        return;
      }

      virtualIndexRef.current =
        artists.length * MIDDLE_REPEAT_INDEX + (page - 1);

      setCurrentPage(page);
      setTrackTransition("none");

      requestAnimationFrame(() => {
        applyTranslate(0);

        requestAnimationFrame(() => {
          setTrackTransition("transform 0.4s ease");
        });
      });
    },
    [artists.length, applyTranslate, setTrackTransition],
  );

  const moveToVirtualIndex = useCallback(
    (nextVirtualIndex: number) => {
      if (artists.length <= 1) return;

      virtualIndexRef.current = nextVirtualIndex;

      const nextPage =
        (((nextVirtualIndex % artists.length) + artists.length) %
          artists.length) +
        1;

      setCurrentPage(nextPage);
      setTrackTransition("transform 0.4s ease");
      applyTranslate(0);

      window.setTimeout(() => {
        const minSafeIndex = artists.length;
        const maxSafeIndex = artists.length * (REPEAT_COUNT - 1);

        if (
          virtualIndexRef.current < minSafeIndex ||
          virtualIndexRef.current >= maxSafeIndex
        ) {
          const currentRealIndex =
            ((virtualIndexRef.current % artists.length) + artists.length) %
            artists.length;

          virtualIndexRef.current =
            artists.length * MIDDLE_REPEAT_INDEX + currentRealIndex;

          setTrackTransition("none");

          requestAnimationFrame(() => {
            applyTranslate(0);
          });
        }
      }, 410);
    },
    [artists.length, applyTranslate, setTrackTransition],
  );

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (artists.length <= 1) return;

    startXRef.current = e.touches[0].clientX;
    dragXRef.current = 0;

    setTrackTransition("none");
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (startXRef.current === null || artists.length <= 1) return;

    const currentX = e.touches[0].clientX;
    const dragX = currentX - startXRef.current;

    dragXRef.current = dragX;
    applyTranslate(dragX);
  };

  const handleTouchEnd = () => {
    if (startXRef.current === null || artists.length <= 1) return;

    const dragX = dragXRef.current;

    startXRef.current = null;
    dragXRef.current = 0;

    if (dragX < -SWIPE_THRESHOLD) {
      moveToVirtualIndex(virtualIndexRef.current + 1);
      return;
    }

    if (dragX > SWIPE_THRESHOLD) {
      moveToVirtualIndex(virtualIndexRef.current - 1);
      return;
    }

    setTrackTransition("transform 0.4s ease");
    applyTranslate(0);
  };

  const handlePaginationChange = (page: number) => {
    if (artists.length <= 1) return;

    const currentRealIndex = currentPage - 1;
    const targetRealIndex = page - 1;

    let diff = targetRealIndex - currentRealIndex;

    if (diff > artists.length / 2) diff -= artists.length;
    if (diff < -artists.length / 2) diff += artists.length;

    moveToVirtualIndex(virtualIndexRef.current + diff);
  };

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      resetToMiddle(1);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [artists, resetToMiddle]);

  useEffect(() => {
    measureCarousel();

    window.addEventListener("resize", measureCarousel);

    return () => {
      window.removeEventListener("resize", measureCarousel);
    };
  }, [measureCarousel]);

  return {
    currentPage,
    repeatedArtists,
    wrapperRef,
    trackRef,
    firstSlideRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handlePaginationChange,
  };
}
