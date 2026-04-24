import * as S from "../../styles/NoticeComponent.style";

interface NoticeCardProps {
  category: string;
  title: string;
}

export default function NoticeCard({ category, title }: NoticeCardProps) {
  return (
    <S.Card>
      <S.NoticeContent>
        <S.Category>{category}</S.Category>
        <S.CardTitle>{title}</S.CardTitle>
      </S.NoticeContent>
    </S.Card>
  );
}
