import type { Artist } from "../components/Artist/ArtistCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ArtistCard from "../components/Artist/ArtistCard";
import ArtistActionButtons from "../components/Artist/ArtistActionButton";
import ArtistPagination from "../components/Artist/ArtistPagination";
import PlaylistNotice from "../components/Artist/PlaylistNotice";
import ArtistPlaylist from "../components/Artist/ArtistPlaylist";
import Modal from "../components/Common/ModalComponent";

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

const getPlaylistDesc = (status: PerformanceStatus) => {
  if (status === "BEFORE") return "무대 보기 전에 예습할까요?";
  if (status === "LIVE") return "지금 공연 중! 같이 즐겨요!";
  if (status === "ENDED") return "무대 보고 난 후 복습할까요?";
  return "";
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
    thumbnailUrl: "https://img.youtube.com/vi/왕왕이영상ID/maxresdefault.jpg",
  },
  4: {
    playlistUrl: "https://youtube.com/playlist?list=양양이플리",
    thumbnailUrl: "https://img.youtube.com/vi/양양이영상ID/maxresdefault.jpg",
  },
  5: {
    playlistUrl: "https://youtube.com/playlist?list=광광이플리",
    thumbnailUrl: "https://img.youtube.com/vi/광광이영상ID/maxresdefault.jpg",
  },
  6: {
    playlistUrl: "https://youtube.com/playlist?list=황황이플리",
    thumbnailUrl: "https://img.youtube.com/vi/황황이영상ID/maxresdefault.jpg",
  },
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

  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const artists = artistsByDay[currentDay];

  const currentArtist = artists[currentPage - 1];
  const currentPlaylist = artistPlaylists[currentArtist.id];

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
          // 라이브톡 입장 경로 수정하기
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
