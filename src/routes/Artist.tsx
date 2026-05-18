import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";

import type { Artist } from "../components/Artist/ArtistCard";
import { trackEvent } from "../utils/analytics";
import { useArtistCarousel } from "../hooks/Artist/useArtistCarousel";

import ArtistCard from "../components/Artist/ArtistCard";
import ArtistActionButtons from "../components/Artist/ArtistActionButton";
import ArtistPagination from "../components/Artist/ArtistPagination";
import PlaylistNotice from "../components/Artist/PlaylistNotice";
import ArtistPlaylist from "../components/Artist/ArtistPlaylist";
import ArtistModal from "../components/Artist/ArtistModalComponent";

import artistData from "../data/ArtistJson/ArtistList.json";

import * as S from "../styles/Artist.style";

type DayKey = "day1" | "day2" | "day3";

type CountdownStatus = "MORE_THAN_72H" | "WITHIN_72H" | "LIVE" | "ENDED";

type ArtistApiItem = {
  id: number;
  name: string;
  shortBio: string;
  festivalDay: number;
  performanceDate: string;
  startTime: string;
  endTime: string;
  imageUrl: string[];
  instagramUrl: string;
  youtubeUrl: string;
  playlistUrl: string;
  countdownStatus: CountdownStatus;
};

// type ArtistApiResponse = {
//   isSuccess: boolean;
//   code: string;
//   message: string;
//   result: ArtistApiItem[];
// };

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

const days = [
  { key: "day1", label: "DAY 1", date: "13일 수", value: 1 },
  { key: "day2", label: "DAY 2", date: "14일 목", value: 2 },
  { key: "day3", label: "DAY 3", date: "15일 금", value: 3 },
] as const;

const playlistVideoIds: Record<number, string> = {
  1: "3bnjH5jXxJc",
  2: "2fyFx2u5fbU",
  3: "5hMWfXmTHIQ",
  4: "xLHHGrDFXrI",
  5: "7ihLv8_Vd-4",
  6: "e2Tdtw9RRyw",
  7: "ioK78YucIjc",
  8: "zhHB4dZTChw",
  9: "Is7glC9Jp7Q",
};

const mapArtist = (artist: ArtistApiItem): Artist => ({
  id: artist.id,
  name: artist.name,
  desc: artist.shortBio,
  time: `${artist.startTime.slice(0, 5)} ~ ${artist.endTime.slice(0, 5)}`,
  image: artist.imageUrl[0],
  instaUrl: artist.instagramUrl,
  youtubeUrl: artist.youtubeUrl,
  playlistUrl: artist.playlistUrl,
  performanceDate: artist.performanceDate,
  startTime: artist.startTime,
});

const getPlaylistDesc = (status?: CountdownStatus) => {
  if (status === "LIVE") return "지금 공연 중! 같이 즐겨요!";
  if (status === "ENDED") return "무대 보고 난 후 복습할까요?";
  return "무대 보기 전에 예습할까요?";
};

const staticArtists = artistData as ArtistApiItem[];

function ArtistPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const container = document.querySelector(
      "[data-app-container]",
    ) as HTMLElement;

    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, []);

  const [currentDay, setCurrentDay] = useState<DayKey>("day1");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [artistStatuses, setArtistStatuses] = useState<
    Record<number, CountdownStatus>
  >({});
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const {
    currentPage,
    repeatedArtists,
    wrapperRef,
    trackRef,
    firstSlideRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handlePaginationChange,
    handleSlideClick,
  } = useArtistCarousel(artists);

  const currentArtist = artists[currentPage - 1];

  const currentCountdownStatus = currentArtist
    ? artistStatuses[currentArtist.id]
    : undefined;

  const setArtistData = (apiArtists: ArtistApiItem[]) => {
    setArtists(apiArtists.map(mapArtist));

    setArtistStatuses(
      Object.fromEntries(
        apiArtists.map((artist) => [artist.id, artist.countdownStatus]),
      ),
    );
  };

  const getArtistsByDay = (dayKey: DayKey) => {
    const selectedDay = days.find((day) => day.key === dayKey);

    if (!selectedDay) return [];

    return staticArtists.filter(
      (artist) => artist.festivalDay === selectedDay.value,
    );
  };

  // const fetchArtistsByDay = async (dayKey: DayKey) => {
  //   const selectedDay = days.find((day) => day.key === dayKey);

  //   if (!selectedDay) return;

  //   try {
  //     const res = await API.get<ArtistApiResponse>("/api/artists", {
  //       params: {
  //         day: selectedDay.value,
  //       },
  //     });

  //     setArtistData(res.data.result);
  //   } catch (error) {
  //     console.error("day별 아티스트 조회 실패:", error);
  //   }
  // };

  const handleDayClick = (dayKey: DayKey) => {
    setCurrentDay(dayKey);
    setArtistData(getArtistsByDay(dayKey));

    // fetchArtistsByDay(dayKey);
  };

  useEffect(() => {
    const dayParam = searchParams.get("day");

    if (dayParam && ["1", "2", "3"].includes(dayParam)) {
      const dayKey = `day${dayParam}` as DayKey;

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentDay(dayKey);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setArtistData(getArtistsByDay(dayKey));

      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentDay("day1");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setArtistData(getArtistsByDay("day1"));
  }, [searchParams]);

  // useEffect(() => {
  //   const fetchTodayArtists = async () => {
  //     try {
  //       const res = await API.get<ArtistApiResponse>("/api/artists/today");

  //       const apiArtists = res.data.result;

  //       setArtistData(apiArtists);

  //       const dayParam = searchParams.get("day");
  //       if (dayParam && ["1", "2", "3"].includes(dayParam)) {
  //         const dayKey = `day${dayParam}` as DayKey;
  //         setCurrentDay(dayKey);
  //         fetchArtistsByDay(dayKey);
  //       } else if (apiArtists[0]) {
  //         setCurrentDay(`day${apiArtists[0].festivalDay}` as DayKey);
  //       }
  //     } catch (error) {
  //       console.error("오늘 아티스트 조회 실패:", error);
  //     }
  //   };

  //   fetchTodayArtists();
  // }, []);

  return (
    <S.ArtistPage>
      <S.SubHeader>
        {days.map((day) => (
          <S.DayButton
            key={day.key}
            type="button"
            $active={currentDay === day.key}
            onClick={() => handleDayClick(day.key)}
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
                <S.Slide
                  key={`${artist.id}-${index}`}
                  ref={index === 0 ? firstSlideRef : undefined}
                  onClick={() => handleSlideClick(index)}
                >
                  <ArtistCard artist={artist} />
                </S.Slide>
              ))}
            </S.CarouselTrack>
          </S.CarouselWrapper>

          <ArtistPagination
            currentPage={currentPage}
            totalPages={artists.length}
            onPageChange={handlePaginationChange}
          />
        </S.ArtistSection>

        {currentArtist && (
          <ArtistActionButtons
            status={currentCountdownStatus ?? "MORE_THAN_72H"}
            performanceDate={currentArtist.performanceDate}
            startTime={currentArtist.startTime}
            onLiveClick={() => {
              trackEvent("livetalk_from_artist");
              navigate("/livetalk");
            }}
            onGuideClick={() => setIsGuideModalOpen(true)}
          />
        )}

        {currentArtist?.playlistUrl && (
          <S.PlaylistSection>
            <ArtistPlaylist
              key={currentArtist.id}
              playlistUrl={currentArtist.playlistUrl}
              videoId={playlistVideoIds[currentArtist.id]}
              desc={getPlaylistDesc(currentCountdownStatus)}
            />
          </S.PlaylistSection>
        )}

        <PlaylistNotice />

        <ArtistModal
          isOpen={isGuideModalOpen}
          onClose={() => setIsGuideModalOpen(false)}
        />
      </S.ArtistContent>
    </S.ArtistPage>
  );
}

export default ArtistPage;
