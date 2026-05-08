import { useEffect, useState } from "react";
import * as S from "../../styles/AdminContestResult.style";
import { getAdminToken } from "../../utils/Admin";
import ContestResultCard from "./AdminContestResultCard";

type ThemeKey = "DRESS_CODE" | "YOUTH" | "FESTIVAL";

interface PhotoEntry {
  photoEntryId: number;
  title: string;
  authorName: string;
  theme: ThemeKey;
  voteCount: number;
  imageUrl: string;
}

type ResultData = Record<ThemeKey, PhotoEntry[]>;

const THEMES: { key: ThemeKey; label: string }[] = [
  { key: "YOUTH", label: "주제 1" },
  { key: "FESTIVAL", label: "주제 2" },
  { key: "DRESS_CODE", label: "주제 3" },
];

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminContestResult() {
  // const [currentTheme, setCurrentTheme] = useState<ThemeKey>("DRESS_CODE");
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("YOUTH");
  const [resultData, setResultData] = useState<ResultData | null>(null);
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
          setResultData(data.result);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const currentList = resultData?.[currentTheme] ?? [];

  return (
    <div>
      <S.SubHeader>
        {THEMES.map((theme) => (
          <S.DayButton
            key={theme.key}
            type="button"
            $active={currentTheme === theme.key}
            onClick={() => setCurrentTheme(theme.key)}
          >
            {theme.label}
          </S.DayButton>
        ))}
      </S.SubHeader>

      {loading ? (
        <S.LoadingText>불러오는 중...</S.LoadingText>
      ) : currentList.length === 0 ? (
        <S.EmptyText>투표 결과가 없습니다.</S.EmptyText>
      ) : (
        <S.List>
          {currentList.map((entry, index) => (
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
