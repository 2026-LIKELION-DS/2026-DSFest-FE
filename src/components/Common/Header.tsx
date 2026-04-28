import * as S from "./Header.style";
import chevronLeft from "../../assets/ChevronLeft.svg";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function Header({
  title,
  subtitle,
  showBackButton = false,
  onBack,
}: HeaderProps) {
  //
  const getContestStatusBubble = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    // const time = now.getHours() * 100 + now.getMinutes();
    //응모 기간
    if (month === 4 && date >= 28) return "사진 응모 중!";
    // 투표 기간
    if (month === 5 && date >= 1 && date <= 15) return "사진 투표 중!";
  };

  return (
    <S.Container>
      <S.Left $show={showBackButton}>
        {showBackButton && (
          <img src={chevronLeft} alt="뒤로 가기" onClick={onBack} />
        )}
      </S.Left>
      <S.TitleWrapper>
        <S.Title>{title}</S.Title>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.TitleWrapper>
      {title === "청춘 한 컷" && getContestStatusBubble() && (
        <S.StatusBubble>{getContestStatusBubble()}</S.StatusBubble>
      )}
    </S.Container>
  );
}
