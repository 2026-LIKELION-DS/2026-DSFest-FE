import * as S from "../../styles/NoticeComponent.style";
import * as I from "../../styles/Notice.style";
import chevronRight from "../../assets/Notice/ChevronRight.svg";

interface NoticeResultRowProps {
  category: string;
  title: string;
  onClick?: () => void;
}

export default function NoticeResultRow({
  category,
  title,
  onClick,
}: NoticeResultRowProps) {
  return (
    <S.ResultRow onClick={onClick}>
      <S.ResultText>
        <S.NoticeContent>{category}</S.NoticeContent>
        <I.NoticeTitle>{title}</I.NoticeTitle>
      </S.ResultText>

      <img src={chevronRight} alt="이동" />
    </S.ResultRow>
  );
}
