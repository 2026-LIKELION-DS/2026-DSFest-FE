import * as S from "../styles/Schedule.style";
import axios from "axios";
import TimeTable from "../components/Schedule/TimeTableComponent";
import ScheduleButton from "../components/Schedule/ScheduleButton";
import CamFlower from "../assets/Schedule/camFlower.svg";
import CamFlower2 from "../assets/Schedule/camFlower2.svg";
import CamLeaf from "../assets/Schedule/camLeaf.svg";
import Leaf from "../assets/Schedule/leaf.svg";
// import Leaf1 from "../assets/Schedule/leaf1.svg";
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
    deco: {
      topLeft: Leaf,
      bottomRight: Flower,
    },
    data: [
      {
        id: 4,
        title: "낮부스",
        time: "11:00~14:30",
        link: "/booth?time=day",
      },
      {
        id: 7,
        title: "영화 상영 <빅토리>",
        time: "15:30~17:30",
      },
      {
        id: 8,
        title: "밤부스",
        time: "16:00~19:30",
        link: "/booth?time=night",
      },
      { id: 9, title: "덕우존 입장", time: "17:30~", isActive: false },
      { id: 10, title: "총장님 인사", time: "18:00~18:30", isActive: false },
      {
        id: 11,
        title: "재학생 및\n동아리 공연",
        time: "18:30~20:00",
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
        time: "11:00~11:30",
      },
      {
        id: 24,
        title: "밤부스",
        time: "16:00~19:30",
        link: "/booth?time=night",
      },
      {
        id: 25,
        title: "덕우존 입장 대기",
        time: "16:00~17:00",
      },
      { id: 26, title: "덕우존 입장", time: "17:00~18:00" },
      {
        id: 27,
        title: "운현가요제",
        time: "18:00~20:30",
        link: "/artist",
      },
      {
        id: 29,
        title: "아티스트 공연",
        time: "20:30~21:00",
        link: "/artist",
      },
    ],
  },
  {
    key: "day3",
    day: "DAY 3",
    data: [
      {
        id: 34,
        title: "낮부스",
        time: "11:00~14:30",
        link: "/booth?time=day",
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
        time: "16:00~18:30",
      },
      {
        id: 42,
        title: "총학생회 콘텐츠",
        time: "18:30~19:30",
      },
      {
        id: 44,
        title: "아티스트 공연",
        time: "18:30~20:00",
        link: "/artist",
      },
      {
        id: 47,
        title: "불꽃놀이",
        time: "21:00~",
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

  //임시 시간 설정 데이2 낮 12시
  const [nowStatus, setNowStatus] = useState<NowStatus | null>({
    status: "IN_PROGRESS",
    current: [
      {
        id: 19,
        title: "낮부스",
        startTime: "11:00",
        endTime: "14:30",
        scheduleType: "BOOTH",
      },
    ],
    next: null,
  });
  useEffect(() => {
    setNowStatus({
      status: "IN_PROGRESS",
      current: [
        {
          id: 19,
          title: "낮부스",
          startTime: "11:00",
          endTime: "14:30",
          scheduleType: "BOOTH",
        },
      ],
      next: null,
    });
  }, [baseUrl]);

  //api/schedules/now 호출 실제 데이 데이터
  // const [nowStatus, setNowStatus] = useState<NowStatus | null>(null);
  // console.log(baseUrl);

  // useEffect(() => {
  //   if (!baseUrl) return;

  //   axios
  //     .get(`${baseUrl}/api/schedules/now`)
  //     .then((res) => {
  //       if (res.data.isSuccess) {
  //         console.log("백엔드 실시간 데이터:", res.data.result);
  //         setNowStatus(res.data.result);
  //       }
  //     })
  //     .catch((err) => console.error("연동 에러:", err));
  // }, [baseUrl]);

  const activeIds = new Set([...(nowStatus?.current ?? []).map((s) => s.id)]);

  const pageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const [isAtActive, setIsAtActive] = useState(false);

  //데이 api
  // const [currentDay, setCurrentDay] = useState<"day1" | "day2" | "day3">(
  //   "day1",
  // );
  // 테스트용으로 day2로 변경
  const [currentDay, setCurrentDay] = useState<"day1" | "day2" | "day3">(
    "day2",
  );
  //
  const [direction, setDirection] = useState<"up" | "down">("down");
  const dayRefs = {
    day1: useRef<HTMLDivElement>(null),
    day2: useRef<HTMLDivElement>(null),
    day3: useRef<HTMLDivElement>(null),
  };

  const currentSchedule = scheduleData.find((d) => d.key === currentDay);
  const hasActive =
    currentSchedule?.data.some((item) => activeIds.has(item.id)) ?? false;

  // 스크롤 위치에 따라 방향 변경
  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (!activeRef.current) return;
      const rect = activeRef.current.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;

      setIsAtActive(inView); // 화면 안에 있으면 버튼 숨김
      setDirection(rect.top > window.innerHeight / 2 ? "down" : "up");
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // 일정 기준
  // const handleClick = () => {
  //   activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  // };
  //day 기준
  const handleClick = () => {
    dayRefs[currentDay].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
        {/* <S.Leafs1 src={Leaf1} /> */}
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
          <TimeTable
            day={item.day}
            // schedule={item.data}
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
                setIsAtActive(true);
              }}
            />
          </S.FloatingCircleBtn>
        </S.ScheduleButtonWrapper>
      )}
      <S.FloatingButton $hasTopBtn={showTopBtn}>
        {/* <S.SNone></S.SNone> */}
        <S.FloatingIcon onClick={handleScrollToTop} $isVisible={showTopBtn}>
          <img src={upIcon} alt="scroll to top" />
        </S.FloatingIcon>
      </S.FloatingButton>
    </S.SchedulePage>
  );
}
