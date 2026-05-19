import * as S from "../styles/ContestVote.style";
import { useState } from "react";
import PhotoCard from "../components/Contest/ContestPhotoCard";
import { useNavigate } from "react-router-dom";
import ContestInfoModal from "../components/Contest/ContestInformation";
// import axios from "axios";
import contestPhotos from "../data/ContestJson/contestphotos.json";
import contestRank from "../data/ContestJson/contestrank.json";

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
  voteCount?: number;
}

export default function ContestVotePage() {
  // const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const photos = contestPhotos.result.photos as PhotoItem[];
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  // const [rankMap, setRankMap] = useState<Record<number, 1 | 2 | 3>>({});

  // useEffect(() => {
  //   if (!baseUrl) return;
  //   axios
  //     .get(`${baseUrl}/api/photo-contest`)
  //     .then((res) => {
  //       if (res.data.isSuccess) {
  //         // setPhotoList(res.data.result);
  //         setPhotos(res.data.result.photos);
  //       }
  //     })
  //     .catch((err) => console.error("목록 조회 에러:", err));
  // }, [baseUrl]);
  const rankMap = Object.fromEntries(
    [...contestRank.result]
      .sort((a, b) => (b.voteCount ?? 0) - (a.voteCount ?? 0))
      .slice(0, 3)
      .map((item, index) => [item.photoEntryId, (index + 1) as 1 | 2 | 3]),
  ) as Record<number, 1 | 2 | 3>;

  // useEffect(() => {
  //   if (!baseUrl) return;
  //   axios
  //     .get(`${baseUrl}/api/photo-contest/rank`)
  //     .then((res) => {
  //       if (!res.data.isSuccess || !Array.isArray(res.data.result)) return;

  //       const map: Record<number, 1 | 2 | 3> = {};
  //       const rankList = res.data.result;
  //       const sorted = [...rankList].sort((a, b) => {
  //         const aCount = a.voteCount ?? 0;
  //         const bCount = b.voteCount ?? 0;
  //         return bCount - aCount;
  //       });

  //       sorted.slice(0, 3).forEach((item, index) => {
  //         map[item.photoEntryId] = (index + 1) as 1 | 2 | 3;
  //       });

  //       setRankMap(map);

  //       setRankMap(map);
  //     })
  //     .catch((err) => console.error("랭킹 조회 에러:", err));
  // }, [baseUrl]);

  const handleSelectPhoto = (id: number) => {
    setSelectedPhotoId((prev) => (prev === id ? null : id));
  };

  const handleSubmit = () => {
    setIsInfoModalOpen(true);
  };

  const handleInfoSubmit = () => {
    setIsInfoModalOpen(false);
    navigate("/contest", { state: { voted: true } });
  };

  const hidden = isRankHidden();

  return (
    <S.ContestVotePage>
      <S.ChatArea>
        <S.VoteHeader>
          <S.SubjectText>
            근화제의 순간을 담은 사진, 당신의 한 표를 선택해주세요!
          </S.SubjectText>

          <S.SubText>한 장의 사진만 투표할 수 있습니다.</S.SubText>
        </S.VoteHeader>

        <S.PhotoGrid>
          {photos.map((photo) => (
            <PhotoCard
              key={photo.photoEntryId}
              photo={{
                id: photo.photoEntryId,
                title: photo.title,
                src: photo.imageUrl,
              }}
              isSelected={selectedPhotoId === photo.photoEntryId}
              onSelect={() => handleSelectPhoto(photo.photoEntryId)}
              rank={hidden ? null : (rankMap[photo.photoEntryId] ?? null)}
            />
          ))}
        </S.PhotoGrid>
      </S.ChatArea>

      <S.VoteButtonWrapper>
        <S.ActionButton
          disabled={selectedPhotoId === null}
          onClick={handleSubmit}
        >
          인적사항 입력
        </S.ActionButton>
      </S.VoteButtonWrapper>
      <ContestInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onSubmit={handleInfoSubmit}
        photoEntryIds={selectedPhotoId ? [selectedPhotoId] : []}
      />
    </S.ContestVotePage>
  );
}
