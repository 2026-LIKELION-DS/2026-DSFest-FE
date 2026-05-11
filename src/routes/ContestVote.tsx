import * as S from "../styles/ContestVote.style";
import { useState, useEffect } from "react";
import PhotoCard from "../components/Contest/ContestPhotoCard";
import { useNavigate } from "react-router-dom";
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
  voteCount?: number;
}

// interface PhotoListResult {
//   youthPhotos: PhotoItem[];
//   festivalPhotos: PhotoItem[];
//   dressCodePhotos: PhotoItem[];
// }

// const TOPIC_LABELS = [
//   "근화제의 순간을 담은 사진, 당신의 한 표로 최고의 ‘청춘’을 선택해주세요!",
// ];

export default function ContestVotePage() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [rankMap, setRankMap] = useState<Record<number, 1 | 2 | 3>>({});

  // const [photoList, setPhotoList] = useState<PhotoListResult | null>(null);
  // const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  // const pageRef = useRef<HTMLDivElement>(null);
  // const [selectedPhotos, setSelectedPhotos] = useState<
  //   Record<number, number | null>
  // >({});
  // const [searchParams, setSearchParams] = useSearchParams();
  // const currentPage = Number(searchParams.get("page") ?? "0");

  // const setCurrentPage = (page: number) => {
  //   setSearchParams({ page: String(page) });
  // };
  // const [rankMap, setRankMap] = useState<Record<number, 1 | 2 | 3>>({});

  useEffect(() => {
    if (!baseUrl) return;
    axios
      .get(`${baseUrl}/api/photo-contest`)
      .then((res) => {
        if (res.data.isSuccess) {
          // setPhotoList(res.data.result);
          setPhotos(res.data.result.photos);
        }
      })
      .catch((err) => console.error("목록 조회 에러:", err));
  }, [baseUrl]);

  // API 데이터를 TOPICS 형태로 변환
  // const TOPICS = photoList
  //   ? [
  //       { id: 0, title: TOPIC_LABELS[0], photos: photoList.youthPhotos },
  //       { id: 1, title: TOPIC_LABELS[1], photos: photoList.festivalPhotos },
  //       { id: 2, title: TOPIC_LABELS[2], photos: photoList.dressCodePhotos },
  //     ]
  //   : [];

  // const topic = TOPICS[currentPage];
  // const isLastPage = currentPage === TOPICS.length - 1;
  // const isSelected = topic ? selectedPhotos[topic.id] != null : false;

  // const photoEntryIds = Object.values(selectedPhotos).filter(
  //   (id): id is number => id !== null,
  // );

  // const handleNext = () => {
  //   if (currentPage < TOPICS.length - 1) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };
  // const handleSubmit = () => {
  //   setIsInfoModalOpen(true);
  // };

  // const handleInfoSubmit = () => {
  //   setIsInfoModalOpen(false);
  //   navigate("/contest", { state: { voted: true } });
  // };

  // useEffect(() => {
  //   if (currentPage === 0) return;
  //   document
  //     .querySelector("[data-app-container]")
  //     ?.scrollTo({ top: 0, behavior: "smooth" });
  // }, [currentPage]);

  // useEffect(() => {
  //   if (!baseUrl) return;
  //   axios
  //     .get(`${baseUrl}/api/photo-contest/rank`)
  //     .then((res) => {
  //       if (!res.data.isSuccess) return;
  //       const map: Record<number, 1 | 2 | 3> = {};
  //       Object.values(res.data.result).forEach((themeList) => {
  //         const list = themeList as {
  //           photoEntryId: number;
  //           voteCount: number;
  //         }[];
  //         const sorted = [...list].sort((a, b) => b.voteCount - a.voteCount);
  //         sorted.slice(0, 3).forEach((item, index) => {
  //           map[item.photoEntryId] = (index + 1) as 1 | 2 | 3;
  //         });
  //       });
  //       setRankMap(map);
  //     })
  //     .catch((err) => console.error("랭킹 조회 에러:", err));
  // }, [baseUrl]);
  useEffect(() => {
    if (!baseUrl) return;
    axios
      .get(`${baseUrl}/api/photo-contest/rank`)
      .then((res) => {
        if (!res.data.isSuccess || !Array.isArray(res.data.result)) return;

        const map: Record<number, 1 | 2 | 3> = {};
        const rankList = res.data.result;
        const sorted = [...rankList].sort((a, b) => {
          const aCount = a.voteCount ?? 0;
          const bCount = b.voteCount ?? 0;
          return bCount - aCount;
        });

        // 2. 존재하는 데이터만큼만 map에 할당
        sorted.slice(0, 3).forEach((item, index) => {
          map[item.photoEntryId] = (index + 1) as 1 | 2 | 3;
        });

        setRankMap(map);

        // // 득표수 기준으로 정렬 후 상위 3개 추출
        // const sorted = [...rankList].sort(
        //   (a, b) => (b.voteCount || 0) - (a.voteCount || 0),
        // );

        // sorted.slice(0, 3).forEach((item, index) => {
        //   map[item.photoEntryId] = (index + 1) as 1 | 2 | 3;
        // });

        setRankMap(map);
      })
      .catch((err) => console.error("랭킹 조회 에러:", err));
  }, [baseUrl]);

  // useEffect(() => {
  //   axios
  //     .get(`${baseUrl}/api/photo-contest/rank`)
  //     .then((res) => {
  //       if (!res.data.isSuccess) return;

  //       const map: Record<number, 1 | 2 | 3> = {};
  //       Object.values(res.data.result).forEach((themeList) => {
  //         const list = themeList as {
  //           photoEntryId: number;
  //           voteCount: number;
  //         }[];
  //         const sorted = [...list].sort((a, b) => b.voteCount - a.voteCount);
  //         sorted.slice(0, 3).forEach((item, index) => {
  //           map[item.photoEntryId] = (index + 1) as 1 | 2 | 3;
  //         });
  //       });

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
          {/* <S.PhotoPage>
            {currentPage + 1}/{TOPICS.length}
          </S.PhotoPage> */}
          {/* <S.SubjectText>{topic.title}</S.SubjectText> */}
          <S.SubText>한 장의 사진만 투표할 수 있습니다.</S.SubText>
        </S.VoteHeader>

        <S.PhotoGrid>
          {/* {topic.photos.map((photo) => ( */}
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
              // isSelected={selectedPhotos[topic.id] === photo.photoEntryId}
              // onSelect={() =>
              //   setSelectedPhotos((prev) => ({
              //     ...prev,
              //     [topic.id]:
              //       selectedPhotos[topic.id] === photo.photoEntryId
              //         ? null
              //         : photo.photoEntryId,
              //   }))
              // }
              // rank={hidden ? null : (rankMap[photo.photoEntryId] ?? null)}
            />
          ))}
        </S.PhotoGrid>
      </S.ChatArea>

      <S.VoteButtonWrapper>
        <S.ActionButton
          disabled={selectedPhotoId === null} // 사진이 선택되어야 활성화
          onClick={handleSubmit}
        >
          인적사항 입력
        </S.ActionButton>
      </S.VoteButtonWrapper>
      <ContestInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onSubmit={handleInfoSubmit}
        // photoEntryIds={photoEntryIds}
        photoEntryIds={selectedPhotoId ? [selectedPhotoId] : []}
      />
    </S.ContestVotePage>
  );
}
