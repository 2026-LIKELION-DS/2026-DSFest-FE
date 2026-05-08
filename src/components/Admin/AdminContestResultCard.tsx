import * as S from "../../styles/AdminContestResult.style";

interface ContestResultCardProps {
  rank: number;
  title: string;
  authorName: string;
  voteCount: number;
  imageUrl: string;
}

export default function AdminContestResultCard({
  rank,
  title,
  authorName,
  voteCount,
  imageUrl,
}: ContestResultCardProps) {
  return (
    <S.Card>
      <S.Rank>{rank}위</S.Rank>
      <S.RinkCard>
        <S.Thumbnail src={imageUrl} />
        <S.Info>
          <S.InfoRow>
            <span>제목</span>
            <span>{title}</span>
          </S.InfoRow>
          <S.InfoRow>
            <span>이름</span>
            <span>{authorName}</span>
          </S.InfoRow>
          <S.InfoRow>
            <span>투표수</span>
            <span>{voteCount}표</span>
          </S.InfoRow>
        </S.Info>
      </S.RinkCard>
    </S.Card>
  );
}
