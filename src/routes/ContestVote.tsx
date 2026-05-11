import * as S from "../styles/ContestVote.style";
import { useState, useEffect, useRef } from "react";
import PhotoCard from "../components/Contest/ContestPhotoCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContestInfoModal from "../components/Contest/ContestInformation";
import axios from "axios";

// 비공개 시간 체크: 15일 15:00 ~ 19:00
const isRankHidden = () => {
  const now = new Date();
  return (
    now.getMonth() === 4 &&
    now.getDate() === 15 &&
    now.getHours() >= 15 &&
    now.getHours() < 19
  );
};

interface PhotoItem {
  photoEntryId: number;
  title: string;
  authorName: string;
  imageUrl: string;
}

interface PhotoListResult {
  youthPhotos: PhotoItem[];
  festivalPhotos: PhotoItem[];
  dressCodePhotos: PhotoItem[];
}

const TOPIC_LABELS = [
  "자신의 '청춘'을 가장 잘 담은 사진",
  "2026 근화제 현장을 가장 잘 담은 사진",
  "2026 근화제 드레스코드를 가장 잘 살려 입은 사진",
];

export default function ContestVotePage() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [photoList, setPhotoList] = useState<PhotoListResult | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  // const [currentPage, setCurrentPage] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [selectedPhotos, setSelectedPhotos] = useState<
    Record<number, number | null>
  >({});
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "0");

  const setCurrentPage = (page: number) => {
    setSearchParams({ page: String(page) });
  };
  const [rankMap, setRankMap] = useState<Record<number, 1 | 2 | 3>>({});

  useEffect(() => {
    if (!baseUrl) return;
    axios
      .get(`${baseUrl}/api/photo-contest`)
      .then((res) => {
        if (res.data.isSuccess) {
          setPhotoList(res.data.result);
        }
      })
      .catch((err) => console.error("목록 조회 에러:", err));
  }, [baseUrl]);

  // API 데이터를 TOPICS 형태로 변환
  const TOPICS = photoList
    ? [
        { id: 0, title: TOPIC_LABELS[0], photos: photoList.youthPhotos },
        { id: 1, title: TOPIC_LABELS[1], photos: photoList.festivalPhotos },
        { id: 2, title: TOPIC_LABELS[2], photos: photoList.dressCodePhotos },
      ]
    : [];

  const topic = TOPICS[currentPage];
  const isLastPage = currentPage === TOPICS.length - 1;
  const isSelected = topic ? selectedPhotos[topic.id] != null : false;

  const photoEntryIds = Object.values(selectedPhotos).filter(
    (id): id is number => id !== null,
  );

  const handleNext = () => {
    if (currentPage < TOPICS.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleSubmit = () => {
    setIsInfoModalOpen(true);
  };

  const handleInfoSubmit = () => {
    setIsInfoModalOpen(false);
    navigate("/contest", { state: { voted: true } });
  };

  useEffect(() => {
    if (currentPage === 0) return;
    document
      .querySelector("[data-app-container]")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/photo-contest/rank`)
      .then((res) => {
        if (!res.data.isSuccess) return;

        const map: Record<number, 1 | 2 | 3> = {};
        Object.values(res.data.result).forEach((themeList) => {
          const list = themeList as {
            photoEntryId: number;
            voteCount: number;
          }[];
          const sorted = [...list].sort((a, b) => b.voteCount - a.voteCount);
          sorted.slice(0, 3).forEach((item, index) => {
            map[item.photoEntryId] = (index + 1) as 1 | 2 | 3;
          });
        });

        setRankMap(map);
      })
      .catch((err) => console.error("랭킹 조회 에러:", err));
  }, [baseUrl]);

  if (!photoList || !topic) return null; // 로딩 중

  const hidden = isRankHidden();

  return (
    <S.ContestVotePage ref={pageRef}>
      <S.ChatArea>
        <S.VoteHeader>
          <S.PhotoPage>
            {currentPage + 1}/{TOPICS.length}
          </S.PhotoPage>
          <S.SubjectText>{topic.title}</S.SubjectText>
          <S.SubText>주제 별 한 장의 사진만 투표할 수 있습니다.</S.SubText>
        </S.VoteHeader>
        {/* <S.Wa> */}
        <S.PhotoGrid>
          {topic.photos.map((photo) => (
            <PhotoCard
              key={photo.photoEntryId}
              photo={{
                id: photo.photoEntryId,
                title: photo.title,
                src: photo.imageUrl,
              }}
              isSelected={selectedPhotos[topic.id] === photo.photoEntryId}
              onSelect={() =>
                setSelectedPhotos((prev) => ({
                  ...prev,
                  [topic.id]:
                    selectedPhotos[topic.id] === photo.photoEntryId
                      ? null
                      : photo.photoEntryId,
                }))
              }
              rank={hidden ? null : (rankMap[photo.photoEntryId] ?? null)}
            />
          ))}
        </S.PhotoGrid>
      </S.ChatArea>
      <S.VoteButtonWrapper>
        <S.ActionButton
          disabled={!isSelected}
          onClick={isLastPage ? handleSubmit : handleNext}
        >
          {isLastPage ? "인적사항 입력" : "다음으로"}
        </S.ActionButton>
      </S.VoteButtonWrapper>
      <ContestInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onSubmit={handleInfoSubmit}
        photoEntryIds={photoEntryIds}
      />
    </S.ContestVotePage>
  );
}
