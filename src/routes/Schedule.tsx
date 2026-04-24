import * as S from "../styles/Schedule.style";
import TimeTable from "../components/Schedule/TimeTableComponent";

const scheduleData = [
  {
    id: 1,
    title: "낮부스",
    time: "11:00~14:30",
    isActive: false,
    link: "/booth",
  },
  {
    id: 2,
    title: "영화 상영 <빅토리>",
    time: "15:30~17:30",
    isActive: true,
  },
  {
    id: 3,
    title: "밤부스",
    time: "16:00~19:30",
    isActive: true,
    link: "/booth",
  },
  { id: 4, title: "덕우존 입장", time: "17:30~", isActive: false },
  { id: 5, title: "총장님 인사", time: "18:00~18:30", isActive: false },
  {
    id: 6,
    title: "재학생 및 동아리 공연",
    time: "18:30~20:00",
    isActive: false,
  },
  {
    id: 7,
    title: "아티스트 공연",
    time: "20:30~22:00",
    isActive: false,
    link: "/artist",
  },
];

export default function SchedulePage() {
  return (
    <S.SchedulePage>
      <TimeTable day="DAY 1" schedule={scheduleData} />
    </S.SchedulePage>
  );
}
