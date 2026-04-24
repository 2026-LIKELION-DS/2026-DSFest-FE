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
  return (
    <S.Container>
      <S.Left>
        {showBackButton && (
          <img src={chevronLeft} alt="뒤로 가기" onClick={onBack} />
        )}
      </S.Left>

      <S.TitleWrapper>
        <S.Title>{title}</S.Title>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.TitleWrapper>
    </S.Container>
  );
}
