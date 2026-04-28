import { useNavigate } from "react-router-dom";
import { trackEvent } from "../../utils/analytics";

import * as S from "../../styles/TimeTable.style";

import CircleIcon from "../../assets/Schedule/CircleDefault.svg";
import CircleSelectedIcon from "../../assets/Schedule/CircleSelected.svg";

interface ScheduleItem {
  id: number;
  title: string;
  time: string;
  isActive: boolean;
  link?: string;
}

interface TimeTableProps {
  day: string;
  schedule: ScheduleItem[];
  activeRef?: React.RefObject<HTMLDivElement>;
}

export default function TimeTable({
  day,
  schedule,
  activeRef,
}: TimeTableProps) {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.DayHeader>{day}</S.DayHeader>
      <S.Container>
        <S.Guide>클릭하면 관련 페이지로 이동합니다</S.Guide>
        <S.Timeline>
          {schedule.map((item, index) => (
            <S.Row
              key={item.id}
              ref={item.isActive ? activeRef : null}
              onClick={() => {
                if (!item.link) return;

                if (item.link === "/artist") {
                  trackEvent("schedule_artist_click");
                }

                navigate(item.link);
              }}
              style={{ cursor: item.link ? "pointer" : "default" }}
            >
              <S.DotWrapper>
                <S.DotIcon
                  src={item.isActive ? CircleSelectedIcon : CircleIcon}
                  alt="circle"
                />
                {index < schedule.length - 1 && <S.Line />}
              </S.DotWrapper>
              <S.Card $isActive={item.isActive}>
                <S.Title $isActive={item.isActive}>{item.title}</S.Title>
                <S.Time $isActive={item.isActive}>{item.time}</S.Time>
              </S.Card>
            </S.Row>
          ))}
        </S.Timeline>
      </S.Container>
    </S.Wrapper>
  );
}
