import type { Artist } from "../components/Artist/ArtistCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ArtistCard from "../components/Artist/ArtistCard";
import ArtistActionButtons from "../components/Artist/ArtistActionButton";
import ArtistPagination from "../components/Artist/ArtistPagination";
import PlaylistNotice from "../components/Artist/PlaylistNotice";
import ArtistPlaylist from "../components/Artist/ArtistPlaylist";

import { getPerformanceStatus } from "../utils/artist";
import type { PerformanceStatus } from "../utils/artist";

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
    {
      id: 6,
      name: "황황이",
      desc: "덕대최고아웃풋",
      time: "20:40 ~ 21:10",
      image: "/src/assets/hahyunsang_sample.svg",
      instaUrl: "https://instagram.com",
      youtubeUrl: "https://youtube.com",
    },
  ],
};

const days = [
  { key: "day1", label: "DAY 1", date: "13일 수" },
  { key: "day2", label: "DAY 2", date: "14일 목" },
  { key: "day3", label: "DAY 3", date: "15일 금" },
] as const;

function ArtistPage() {
  const navigate = useNavigate();

  const [currentDay, setCurrentDay] = useState<"day1" | "day2" | "day3">(
    "day1",
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [status, setStatus] = useState<PerformanceStatus>("BEFORE");
  const [statusText, setStatusText] = useState("");

  const artists = artistsByDay[currentDay];

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
              setCurrentPage(1);
            }}
          >
            {day.label}
            <span>{day.date}</span>
          </S.DayButton>
        ))}
      </S.SubHeader>
      <S.ArtistContent>
        <S.ArtistSection>
          <S.CarouselWrapper>
            <S.CarouselTrack $currentPage={currentPage}>
              {artists.map((artist) => (
                <S.CardSlide key={artist.id}>
                  <ArtistCard artist={artist} />
                </S.CardSlide>
              ))}
            </S.CarouselTrack>
          </S.CarouselWrapper>

          <ArtistPagination
            currentPage={currentPage}
            totalPages={artists.length}
            onPageChange={setCurrentPage}
          />
        </S.ArtistSection>

        <ArtistActionButtons
          status={status}
          statusText={statusText}
          onLiveClick={() => navigate("/live")}
          onGuideClick={() => navigate("/guide")}
        />

        <S.PlaylistSection>
          <ArtistPlaylist
            playlistUrl="https://youtube.com/playlist?list=..."
            thumbnailUrl="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
          />
        </S.PlaylistSection>

        <PlaylistNotice />
      </S.ArtistContent>
    </S.ArtistPage>
  );
}

export default ArtistPage;
