import * as S from "../../styles/Notice.style";
import chevronRight from "../../assets/Notice/ChevronRight_black.svg";

interface NoticeListItemProps {
  category: string;
  title: string;
  onClick?: () => void;
}

export default function NoticeListItem({
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

      <img src={chevronRight} alt="상세보기" />
    </S.NoticeItem>
  );
}
