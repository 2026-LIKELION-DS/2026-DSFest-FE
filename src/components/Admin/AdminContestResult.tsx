import { useEffect, useState } from "react";
import * as S from "../../styles/AdminContestResult.style";
import { getAdminToken } from "../../utils/Admin";
import ContestResultCard from "./AdminContestResultCard";

interface PhotoEntry {
  photoEntryId: number;
  title: string;
  authorName: string;
  voteCount: number;
  imageUrl: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminContestResult() {
  const [resultList, setResultList] = useState<PhotoEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = getAdminToken();
        const response = await fetch(
          `${API_URL}/api/admin/photo-contest/results`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        if (data.isSuccess) {
          console.log("result:", data.result);
          setResultList(data.result);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const sortedList = [...resultList].sort((a, b) => b.voteCount - a.voteCount);

  return (
    <div>
      <S.SubHeader>
        <S.DayButton type="button" $active={true}>
          전체 투표 결과
        </S.DayButton>
      </S.SubHeader>

      {loading ? (
        <S.LoadingText>불러오는 중...</S.LoadingText>
      ) : sortedList.length === 0 ? (
        <S.EmptyText>투표 결과가 없습니다.</S.EmptyText>
      ) : (
        <S.List>
          {sortedList.map((entry, index) => (
            <ContestResultCard
              key={entry.photoEntryId}
              rank={index + 1}
              title={entry.title}
              authorName={entry.authorName}
              voteCount={entry.voteCount}
              imageUrl={entry.imageUrl}
            />
          ))}
        </S.List>
      )}
    </div>
  );
}
