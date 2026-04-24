import * as S from "../styles/Schedule.style";
import TimeTable from "../components/Schedule/TimeTableComponent";

import { useState, useRef } from "react";

const scheduleData = [
  {
    key: "day1",
    day: "DAY 1",
    data: [
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
    ],
  },
  {
    key: "day2",
    day: "DAY 2",
    data: [
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
    ],
  },
  {
    key: "day3",
    day: "DAY 3",
    data: [
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
    ],
  },
];

const days = [
  { key: "day1", label: "DAY 1", date: "13일 수" },
  { key: "day2", label: "DAY 2", date: "14일 목" },
  { key: "day3", label: "DAY 3", date: "15일 금" },
] as const;

export default function SchedulePage() {
  const [currentDay, setCurrentDay] = useState<"day1" | "day2" | "day3">(
    "day1",
  );
  const dayRefs = {
    day1: useRef<HTMLDivElement>(null),
    day2: useRef<HTMLDivElement>(null),
    day3: useRef<HTMLDivElement>(null),
  };

  return (
    <S.SchedulePage>
      <S.SubHeader>
        {days.map((day) => (
          <S.DayButton
            key={day.key}
            type="button"
            $active={currentDay === day.key}
            onClick={() => {
              setCurrentDay(day.key);

              dayRefs[day.key].current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            {day.label}
            <span>{day.date}</span>
          </S.DayButton>
        ))}
      </S.SubHeader>
      {scheduleData.map((item) => (
        <S.DaySection key={item.key} ref={dayRefs[item.key]}>
          <TimeTable day={item.day} schedule={item.data} />
        </S.DaySection>
      ))}
    </S.SchedulePage>
  );
}
