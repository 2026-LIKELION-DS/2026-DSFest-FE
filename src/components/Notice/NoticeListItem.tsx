import * as S from "../../styles/Notice.style";
import chevronRight from "../../assets/Notice/ChevronRight_black.svg";

interface NoticeListItemProps {
  id: number;
  category: string;
  title: string;
  onClick?: () => void;
}

export default function NoticeListItem({
  id,
  category,
  title,
  onClick,
}: NoticeListItemProps) {
  return (
    <S.NoticeItem onClick={onClick}>
      <S.NoticeTextBox>
        <S.NoticeCategory>{category}</S.NoticeCategory>
        <S.NoticeTitle>{title}</S.NoticeTitle>
      </S.NoticeTextBox>

      <img src={chevronRight} alt={`${id}번 공지 상세보기`} />
    </S.NoticeItem>
  );
}
