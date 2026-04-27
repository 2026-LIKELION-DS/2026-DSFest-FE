import * as S from "../styles/ContestVote.style";
import { useState } from "react";
import PhotoCard from "../components/Contest/ContestPhotoCard";
import examplePhoto from "../assets/hahyunsang_sample.svg";
import { useNavigate } from "react-router-dom";
import ContestInfoModal from "../components/Contest/ContestInformation";

// 임시 데이터
const TOPICS = [
  {
    id: 1,
    title: "주제 텍스트 주제 텍스트",
    photos: [
      { id: 1, title: "사진제목 제목제목제목개긴제목 자리", src: examplePhoto },
      { id: 2, title: "사진제목", src: examplePhoto },
      { id: 3, title: "사진제목", src: examplePhoto },
      { id: 4, title: "사진제목", src: examplePhoto },
    ],
  },
  {
    id: 2,
    title: "주제 텍스트 주제 텍스트",
    photos: [
      { id: 5, title: "사진제목", src: examplePhoto },
      { id: 6, title: "사진제목", src: examplePhoto },
      { id: 7, title: "사진제목", src: examplePhoto },
      { id: 8, title: "사진제목", src: examplePhoto },
    ],
  },
  {
    id: 3,
    title: "주제 텍스트 주제 텍스트",
    photos: [
      { id: 9, title: "사진제목", src: examplePhoto },
      { id: 10, title: "사진제목", src: examplePhoto },
      { id: 11, title: "사진제목", src: examplePhoto },
      { id: 12, title: "사진제목", src: examplePhoto },
    ],
  },
];

export default function ContestVotePage() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [selectedPhotos, setSelectedPhotos] = useState<
    Record<number, number | null>
  >({});

  const topic = TOPICS[currentPage];
  const isLastPage = currentPage === TOPICS.length - 1;
  const isSelected = selectedPhotos[topic.id] != null;

  const handleNext = () => {
    if (currentPage < TOPICS.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    setIsInfoModalOpen(true);
    // handleVoteDone();
  };

  const handleInfoSubmit = () => {
    setIsInfoModalOpen(false);
    navigate("/contest", { state: { voted: true } }); // 모달에서 제출 시 이동
  };

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
            key={photo.id}
            photo={photo}
            isSelected={selectedPhotos[topic.id] === photo.id}
            onSelect={() =>
              setSelectedPhotos((prev) => ({
                ...prev,
                [topic.id]:
                  selectedPhotos[topic.id] === photo.id ? null : photo.id,
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
      {/* </S.Wa> */}
      <ContestInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onSubmit={handleInfoSubmit} // 모달 내부 제출 버튼에 연결
      />
    </S.ContestVotePage>
  );
}
