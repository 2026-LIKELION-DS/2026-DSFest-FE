import type { Artist } from "../components/Artist/ArtistCard";
import type { PerformanceStatus } from "../utils/artist";
import type { TouchEvent } from "react";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ArtistCard from "../components/Artist/ArtistCard";
import ArtistActionButtons from "../components/Artist/ArtistActionButton";
import ArtistPagination from "../components/Artist/ArtistPagination";
import PlaylistNotice from "../components/Artist/PlaylistNotice";
import ArtistPlaylist from "../components/Artist/ArtistPlaylist";
import Modal from "../components/Common/ModalComponent";

import { getPerformanceStatus } from "../utils/artist";

import * as S from "../styles/Artist.style";

const artistsByDay: Record<"day1" | "day2" | "day3", Artist[]> = {
  day1: [
    {
      id: 1,
      name: "하현상",
      desc: "푸른 청춘을 닮은 감성 밴드 라이브",
      time: "20:00 ~ 20:30",
      image: "/src/assets/hahyunsang_sample.svg",
      instaUrl: "https://instagram.com",
      youtubeUrl: "https://youtube.com",
    },
    {
      id: 2,
      name: "앙앙이",
      desc: "덕대최고아웃풋",
      time: "20:40 ~ 21:10",
      image: "/src/assets/hahyunsang_sample.svg",
      instaUrl: "https://instagram.com",
      youtubeUrl: "https://youtube.com",
    },
    {
      id: 6,
      name: "양양이",
      desc: "덕대최고아웃풋",
      time: "21:20 ~ 21:50",
      image: "/src/assets/hahyunsang_sample.svg",
      instaUrl: "https://instagram.com",
      youtubeUrl: "https://youtube.com",
    },
  ],
  day2: [
    {
      id: 3,
      name: "왕왕이",
      desc: "푸른 청춘을 닮은 감성 밴드 라이브",
      time: "20:00 ~ 20:30",
      image: "/src/assets/hahyunsang_sample.svg",
      instaUrl: "https://instagram.com",
      youtubeUrl: "https://youtube.com",
    },
    {
      id: 4,
      name: "양양이",
      desc: "덕대최고아웃풋",
      time: "20:40 ~ 21:10",
      image: "/src/assets/hahyunsang_sample.svg",
      instaUrl: "https://instagram.com",
      youtubeUrl: "https://youtube.com",
    },
  ],
  day3: [
    {
      id: 5,
      name: "광광이",
      desc: "푸른 청춘을 닮은 감성 밴드 라이브",
      time: "20:00 ~ 20:30",
      image: "/src/assets/hahyunsang_sample.svg",
      instaUrl: "https://instagram.com",
      youtubeUrl: "https://youtube.com",
    },
  ],
};

const artistPlaylists: Record<
  number,
  {
    playlistUrl: string;
    thumbnailUrl: string;
  }
> = {
  1: {
    playlistUrl: "https://youtube.com/playlist?list=하현상플리",
    thumbnailUrl: "https://img.youtube.com/vi/9T4PDNsClvQ/maxresdefault.jpg",
  },
  2: {
    playlistUrl: "https://youtube.com/playlist?list=앙앙이플리",
    thumbnailUrl: "https://img.youtube.com/vi/fkUAZMnuNSE/maxresdefault.jpg",
  },
  3: {
    playlistUrl: "https://youtube.com/playlist?list=왕왕이플리",
    thumbnailUrl: "https://img.youtube.com/vi/9T4PDNsClvQ/maxresdefault.jpg",
  },
  4: {
    playlistUrl: "https://youtube.com/playlist?list=양양이플리",
    thumbnailUrl: "https://img.youtube.com/vi/9T4PDNsClvQ/maxresdefault.jpg",
  },
  5: {
    playlistUrl: "https://youtube.com/playlist?list=광광이플리",
    thumbnailUrl: "https://img.youtube.com/vi/9T4PDNsClvQ/maxresdefault.jpg",
  },
  6: {
    playlistUrl: "https://youtube.com/playlist?list=양양이플리",
    thumbnailUrl: "https://img.youtube.com/vi/9T4PDNsClvQ/maxresdefault.jpg",
  },
};

const days = [
  { key: "day1", label: "DAY 1", date: "13일 수" },
  { key: "day2", label: "DAY 2", date: "14일 목" },
  { key: "day3", label: "DAY 3", date: "15일 금" },
] as const;

const REPEAT_COUNT = 5;
const MIDDLE_REPEAT_INDEX = 2;
const GAP = 24;
const SWIPE_THRESHOLD = 50;

const getPlaylistDesc = (status: PerformanceStatus) => {
  if (status === "BEFORE") return "무대 보기 전에 예습할까요?";
  if (status === "LIVE") return "지금 공연 중! 같이 즐겨요!";
  if (status === "ENDED") return "무대 보고 난 후 복습할까요?";
  return "";
};

function ArtistPage() {
  const navigate = useNavigate();

  const [currentDay, setCurrentDay] = useState<"day1" | "day2" | "day3">(
    "day1",
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [status, setStatus] = useState<PerformanceStatus>("BEFORE");
  const [statusText, setStatusText] = useState("");
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstSlideRef = useRef<HTMLDivElement | null>(null);

  const startXRef = useRef<number | null>(null);
  const dragXRef = useRef(0);
  const slideStepRef = useRef(0);
  const centerOffsetRef = useRef(0);
  const virtualIndexRef = useRef(0);

  const artists = artistsByDay[currentDay];

  const repeatedArtists = useMemo(() => {
    if (artists.length <= 1) return artists;
    return Array.from({ length: REPEAT_COUNT }).flatMap(() => artists);
  }, [artists]);

  const currentArtist = artists[currentPage - 1];
  const currentPlaylist = artistPlaylists[currentArtist.id];

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

      // const nextPage = (nextVirtualIndex % artists.length) + 1;
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
          // const currentRealIndex = virtualIndexRef.current % artists.length;
          const currentRealIndex =
            ((virtualIndexRef.current % artists.length) + artists.length) %
            artists.length;

          virtualIndexRef.current =
            artists.length * MIDDLE_REPEAT_INDEX + currentRealIndex;

          setTrackTransition("none");
          // applyTranslate(0);

          // requestAnimationFrame(() => {
          //   setTrackTransition("transform 0.4s ease");
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
  }, [currentDay, resetToMiddle]);

  useEffect(() => {
    measureCarousel();

    window.addEventListener("resize", measureCarousel);
    return () => {
      window.removeEventListener("resize", measureCarousel);
    };
  }, [measureCarousel]);

  useEffect(() => {
    const start = new Date("2026-04-24T19:00:00");
    const end = new Date("2026-04-24T23:30:00");

    const updateStatus = () => {
      const result = getPerformanceStatus(start, end);
      setStatus(result.status);
      setStatusText(result.text);
    };

    updateStatus();

    const timerId = window.setInterval(updateStatus, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <S.ArtistPage>
      <S.SubHeader>
        {days.map((day) => (
          <S.DayButton
            key={day.key}
            type="button"
            $active={currentDay === day.key}
            onClick={() => {
              setCurrentDay(day.key);
            }}
          >
            {day.label}
            <span>{day.date}</span>
          </S.DayButton>
        ))}
      </S.SubHeader>

      <S.ArtistContent>
        <S.ArtistSection>
          <S.CarouselWrapper
            ref={wrapperRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <S.CarouselTrack ref={trackRef}>
              {repeatedArtists.map((artist, index) => (
                <S.CardSlide
                  key={`${artist.id}-${index}`}
                  ref={index === 0 ? firstSlideRef : null}
                >
                  <ArtistCard artist={artist} />
                </S.CardSlide>
              ))}
            </S.CarouselTrack>
          </S.CarouselWrapper>

          <ArtistPagination
            currentPage={currentPage}
            totalPages={artists.length}
            onPageChange={handlePaginationChange}
          />
        </S.ArtistSection>

        <ArtistActionButtons
          status={status}
          statusText={statusText}
          onLiveClick={() => navigate("/live")}
          onGuideClick={() => setIsGuideModalOpen(true)}
        />

        <S.PlaylistSection>
          <ArtistPlaylist
            playlistUrl={currentPlaylist.playlistUrl}
            thumbnailUrl={currentPlaylist.thumbnailUrl}
            desc={getPlaylistDesc(status)}
          />
        </S.PlaylistSection>

        <PlaylistNotice />

        <Modal
          isOpen={isGuideModalOpen}
          onClose={() => setIsGuideModalOpen(false)}
          title="스탠딩존 입장 관련 안내"
          content="스탠딩존 입장 관련 안내"
        />
      </S.ArtistContent>
    </S.ArtistPage>
  );
}

export default ArtistPage;
