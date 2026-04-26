import * as S from "../styles/ContestVote.style";
import { useState } from "react";

// 임시 데이터
const TOPICS = [
  { id: 1, title: "주제 텍스트 주제 텍스트" },
  { id: 2, title: "주제 텍스트 주제 텍스트" },
  { id: 3, title: "주제 텍스트 주제 텍스트" },
];

export default function ContestVotePage() {
  const [currentPage, setCurrentPage] = useState(0);
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
    // 인적사항 입력 페이지로 이동
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

      {/* 여기에 나중에 PhotoCard 컴포넌트 들어올 자리 */}

      <S.ActionButton
        // disabled={!isSelected} //테스트용 임시 주석
        onClick={isLastPage ? handleSubmit : handleNext}
      >
        {isLastPage ? "인적사항 입력" : "다음으로"}
      </S.ActionButton>
    </S.ContestVotePage>
  );
}
