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
  const getTodayStatusBubble = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const currentTime = hours * 100 + minutes;

    let dayText = "";
    if (month === 5) {
      if (date === 13) dayText = "Day 1";
      else if (date === 14) dayText = "Day 2";
      else if (date === 15) dayText = "Day 3";
    }

    if (!dayText) return "축제 준비 중! ✨";

    if (currentTime >= 1100 && currentTime <= 1430)
      return `${dayText} 낮부스 운영 중!`;
    if (currentTime >= 1500 && currentTime <= 1730)
      return `${dayText} 밤부스 운영 중!`;

    return `${dayText} 운영 준비 중!`;
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

      {title === "부스" && (
        <S.StatusBubble>{getTodayStatusBubble()}</S.StatusBubble>
      )}
    </S.Container>
  );
}
