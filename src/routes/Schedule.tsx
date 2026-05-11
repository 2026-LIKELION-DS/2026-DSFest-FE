import * as S from "../styles/Schedule.style";
import axios from "axios";
import TimeTable from "../components/Schedule/TimeTableComponent";
import ScheduleButton from "../components/Schedule/ScheduleButton";
import CamFlower from "../assets/Schedule/camFlower.svg";
import CamFlower2 from "../assets/Schedule/camFlower2.svg";
import CamLeaf from "../assets/Schedule/camLeaf.svg";
import Leaf from "../assets/Schedule/leaf.svg";
import Flower from "../assets/Schedule/flower.svg";
import Flowers2 from "../assets/Schedule/flowers2.svg";
import upIcon from "../assets/Booth/BoothUp.svg";
import { useState, useRef, useEffect } from "react";

type DayKey = "day1" | "day2" | "day3";

// API 타입 정의
interface ApiSchedule {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  scheduleType: "BOOTH" | "ARTIST" | "EVENT";
}

interface NowStatus {
  status: "IN_PROGRESS" | "UPCOMING" | "ENDED";
  current: ApiSchedule[];
  next: ApiSchedule | null;
}

const scheduleData = [
  {
    key: "day1",
    day: "DAY 1",
    decos: [
      {
        src: Leaf,
        position: "left" as const,
        top: true,
        // bottomOffset: 0,
        bottomOffset: -15,
        width: 85,
      },
      {
        src: Flower,
        position: "left" as const,
        top: false,
        bottomOffset: -40,
        width: 78,
      },
      {
        src: CamFlower,
        position: "right" as const,
        top: false,
        bottomOffset: -40,
        width: 105,
      },
    ],
    data: [
      {
        id: 4,
        title: "낮부스",
        time: "11:00~14:30",
        link: "/booth?time=day",
      },
      {
        id: 7,
        title: "영화 상영\n<빅토리>",
        time: "15:30~17:30",
      },
      {
        id: 8,
        title: "밤부스",
        time: "16:00~19:30",
        link: "/booth?time=night",
      },
      { id: 9, title: "덕우존 입장", time: "17:30~", isActive: false },
      { id: 10, title: "총장님 인사", time: "17:40~17:50", isActive: false },
      {
        id: 11,
        title: "재학생 및\n동아리 공연",
        time: "17:55~20:00",
      },
      {
        id: 13,
        title: "아티스트 공연",
        time: "20:30~22:00",
        link: "/artist",
      },
    ],
  },
  {
    key: "day2",
    day: "DAY 2",
    decos: [
      {
        src: CamLeaf,
        position: "left" as const,
        top: false,
        bottomOffset: -40,
        width: 118,
      },
    ],
    data: [
      {
        id: 19,
        title: "낮부스",
        time: "11:00~14:30",
        link: "/booth?time=day",
      },
      {
        id: 20,
        title: "Quiz! 덕쏭달쏭",
        time: "11:00~13:00",
      },
      {
        id: 24,
        title: "밤부스",
        time: "16:00~19:30",
        link: "/booth?time=night",
      },
      {
        id: 25,
        title: "덕우존 입장",
        time: "17:30~",
      },
      { id: 26, title: "덕우존 입장", time: "17:30~" },
      {
        id: 27,
        title: "운현가요제",
        time: "18:00~20:10",
        link: "/artist",
      },
      {
        id: 29,
        title: "아티스트 공연",
        time: "20:10~21:00",
        link: "/artist",
      },
    ],
  },
  {
    key: "day3",
    day: "DAY 3",
    decos: [
      {
        src: Flowers2,
        position: "left" as const,
        top: true,
        bottomOffset: -45,
        width: 126,
      },
      {
        src: CamFlower2,
        position: "right" as const,
        top: false,
        bottomOffset: -40,
        width: 115,
      },
    ],
    data: [
      {
        id: 34,
        title: "낮부스",
        time: "11:00~14:30",
        link: "/booth?time=day",
      },
      {
        id: 39,
        title: "덕우존 입장",
        time: "15:30",
      },
      {
        id: 40,
        title: "밤부스",
        time: "16:00~19:30",
        link: "/booth?time=night",
      },
      {
        id: 41,
        title: "재학생 및\n동아리 공연",
        time: "16:00~18:20",
      },
      {
        id: 42,
        title: "총학생회 프로그램",
        time: "18:20~19:20",
      },
      {
        id: 44,
        title: "아티스트 공연",
        time: "18:20~20:20",
        link: "/artist",
      },
      {
        id: 47,
        title: "불꽃놀이",
        time: "21:20~21:23",
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
  const baseUrl = import.meta.env.VITE_API_URL;

  //임시 시간 설정 (데이2 낮 12시)
  // const [nowStatus, setNowStatus] = useState<NowStatus | null>({
  //   status: "IN_PROGRESS",
  //   current: [
  //     {
  //       id: 19,
  //       title: "낮부스",
  //       startTime: "11:00",
  //       endTime: "14:30",
  //       scheduleType: "BOOTH",
  //     },
  //   ],
  //   next: null,
  // });
  // const [currentDay, setCurrentDay] = useState<DayKey>("day2");

  // 실제 날짜 api
  const [nowStatus, setNowStatus] = useState<NowStatus | null>(null);
  useEffect(() => {
    if (!baseUrl) return;
    axios
      .get(`${baseUrl}/api/schedules/now`)
      .then((res) => {
        if (res.data.isSuccess) setNowStatus(res.data.result);
      })
      .catch((err) => console.error("연동 에러:", err));
  }, [baseUrl]);
  const getCurrentDay = (): DayKey => {
    const today = new Date().getDate();
    if (today === 13) return "day1";
    if (today === 14) return "day2";
    if (today === 15) return "day3";
    return "day1";
  };
  const [currentDay, setCurrentDay] = useState<DayKey>(getCurrentDay());
  //

  const activeIds = new Set([...(nowStatus?.current ?? []).map((s) => s.id)]);
  const pageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const [isAtActive, setIsAtActive] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const dayRefs = {
    day1: useRef<HTMLDivElement>(null),
    day2: useRef<HTMLDivElement>(null),
    day3: useRef<HTMLDivElement>(null),
  };

  const currentSchedule = scheduleData.find((d) => d.key === currentDay);
  const hasActive =
    currentSchedule?.data.some((item) => activeIds.has(item.id)) ?? false;

  // 페이지 진입 시 스크롤 초기화
  useEffect(() => {
    const container = document.querySelector(
      "[data-app-container]",
    ) as HTMLElement;
    if (container) {
      container.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  const [showTopBtn, setShowTopBtn] = useState(false);

  const handleClick = () => {
    dayRefs[currentDay].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleScrollToTop = () => {
    pageRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <S.SchedulePage
      ref={pageRef}
      onScroll={(e) => {
        setShowTopBtn(e.currentTarget.scrollTop > 0);
        if (!activeRef.current) return;
        const rect = activeRef.current.getBoundingClientRect();
        setIsAtActive(rect.top >= 0 && rect.bottom <= window.innerHeight);
        setDirection(rect.top > window.innerHeight / 2 ? "down" : "up");
      }}
    >
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
          {item.decos?.map((deco, i) => (
            <S.SectionDeco
              key={i}
              src={deco.src}
              $position={deco.position}
              $top={deco.top}
              $bottomOffset={deco.bottomOffset}
              $width={deco.width}
              alt=""
            />
          ))}
          <TimeTable
            day={item.day}
            schedule={item.data.map((s) => ({
              ...s,
              isActive: activeIds.has(s.id),
            }))}
            activeRef={item.key === currentDay ? activeRef : undefined}
          />
        </S.DaySection>
      ))}
      {hasActive && !isAtActive && (
        <S.ScheduleButtonWrapper>
          <S.FloatingCircleBtn>
            <ScheduleButton
              direction={direction}
              onClick={() => {
                handleClick();
              }}
            />
          </S.FloatingCircleBtn>
        </S.ScheduleButtonWrapper>
      )}
      <S.FloatingButton $hasTopBtn={showTopBtn}>
        <S.FloatingIcon onClick={handleScrollToTop} $isVisible={showTopBtn}>
          <img src={upIcon} alt="scroll to top" />
        </S.FloatingIcon>
      </S.FloatingButton>
    </S.SchedulePage>
  );
}
