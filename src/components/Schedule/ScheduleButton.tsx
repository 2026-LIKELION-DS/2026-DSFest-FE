import * as S from "../../styles/ScheduleButton.style";
import upIcon from "../../assets/Schedule/ArrowUp.svg";
import downIcon from "../../assets/Schedule/ArrowDown.svg";

interface ScheduleButtonProps {
  direction: "up" | "down";
  onClick: () => void;
}

export default function ScheduleButton({
  direction,
  onClick,
}: ScheduleButtonProps) {
  return (
    <S.ScheduleButton>
      <S.ButtonContainer onClick={onClick}>
        <S.ButtonIcon src={direction === "up" ? upIcon : downIcon} />
        <S.ButtonContent>지금 진행 중!</S.ButtonContent>
      </S.ButtonContainer>
    </S.ScheduleButton>
  );
}
