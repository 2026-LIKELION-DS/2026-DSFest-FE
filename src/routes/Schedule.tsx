import * as S from "../styles/Schedule.style";
import TimeTable from "../components/Schedule/TimeTableComponent";
import ScheduleButton from "../components/Schedule/ScheduleButton";
import CamFlower from "../assets/Schedule/camFlower.svg";
import CamFlower2 from "../assets/Schedule/camFlower2.svg";
import CamLeaf from "../assets/Schedule/camLeaf.svg";
import Leaf from "../assets/Schedule/leaf.svg";
import Leaf1 from "../assets/Schedule/leaf1.svg";
import Flower from "../assets/Schedule/flower.svg";
import Flowers2 from "../assets/Schedule/flowers2.svg";
import upIcon from "../assets/Booth/BoothUp.svg";

import { useState, useRef, useEffect } from "react";
type DayKey = "day1" | "day2" | "day3";

const scheduleData = [
  {
    key: "day1",
    day: "DAY 1",
    deco: {
      topLeft: Leaf,
      bottomRight: Flower,
    },
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
  const [direction, setDirection] = useState<"up" | "down">("down");
  const activeRef = useRef<HTMLDivElement>(null);
  const dayRefs = {
    day1: useRef<HTMLDivElement>(null),
    day2: useRef<HTMLDivElement>(null),
    day3: useRef<HTMLDivElement>(null),
  };

  const currentSchedule = scheduleData.find((d) => d.key === currentDay);
  const hasActive =
    currentSchedule?.data.some((item) => item.isActive) ?? false;

  // 스크롤 위치에 따라 방향 변경
  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (!activeRef.current) return;
      const rect = activeRef.current.getBoundingClientRect();
      setDirection(rect.top > window.innerHeight / 2 ? "down" : "up");
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!activeRef.current) return;
  //     const rect = activeRef.current.getBoundingClientRect();
  //     setDirection(rect.top > window.innerHeight / 2 ? "down" : "up");
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const handleClick = () => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const pageRef = useRef<HTMLDivElement>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setShowTopBtn(scrollTop > 0);
  };

  const handleScrollToTop = () => {
    if (pageRef.current) {
      pageRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <S.SchedulePage ref={pageRef} onScroll={handleScroll}>
      <S.DecoLayer>
        <S.Leafs src={Leaf} />
        <S.Flower src={Flower} />
        <S.CamFlower src={CamFlower} />
        <S.Leafs1 src={Leaf1} />
        <S.CamLeaf src={CamLeaf} />
        <S.Flowers2 src={Flowers2} />
        <S.CamFlower2 src={CamFlower2} />
      </S.DecoLayer>
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
        <S.DaySection key={item.key} ref={dayRefs[item.key as DayKey]}>
          <TimeTable day={item.day} schedule={item.data} />
        </S.DaySection>
      ))}
      <S.FloatingButton $hasTopBtn={showTopBtn}>
        <S.FloatingIcon onClick={handleScrollToTop} $isVisible={showTopBtn}>
          <img src={upIcon} alt="scroll to top" />
        </S.FloatingIcon>
      </S.FloatingButton>
      {/* 진행 중 버튼 위치 */}
      {hasActive && (
        <ScheduleButton direction={direction} onClick={handleClick} />
      )}
    </S.SchedulePage>
  );
}
