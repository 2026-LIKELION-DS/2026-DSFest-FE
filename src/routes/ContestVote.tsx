import * as S from "../styles/ContestVote.style";
import { useState, useEffect } from "react";
import PhotoCard from "../components/Contest/ContestPhotoCard";
import { useNavigate } from "react-router-dom";
import ContestInfoModal from "../components/Contest/ContestInformation";
import axios from "axios";

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
  "자신의 청춘을 가장 잘 담은 사진",
  "축제 현장을 가장 잘 담은 사진",
  "드레스코드를 가장 잘 살려 입은 사진",
];

export default function ContestVotePage() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [photoList, setPhotoList] = useState<PhotoListResult | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [selectedPhotos, setSelectedPhotos] = useState<
    Record<number, number | null>
  >({});

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

  const handleNext = () => {
    if (currentPage < TOPICS.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handleSubmit = () => {
    setIsInfoModalOpen(true);
  };

  const handleInfoSubmit = () => {
    setIsInfoModalOpen(false);
    navigate("/contest", { state: { voted: true } });
  };

  if (!photoList || !topic) return null; // 로딩 중

  return (
    <S.ContestVotePage>
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
          />
        ))}
      </S.PhotoGrid>

      <S.ActionButton
        disabled={!isSelected}
        onClick={isLastPage ? handleSubmit : handleNext}
      >
        {isLastPage ? "인적사항 입력" : "다음으로"}
      </S.ActionButton>
      <ContestInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onSubmit={handleInfoSubmit} // 모달 내부 제출 버튼에 연결
      />
    </S.ContestVotePage>
  );
}
