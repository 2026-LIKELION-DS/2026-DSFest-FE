import { useNavigate } from "react-router-dom";
import * as S from "./NavBar.style";

import homeIcon from "../../assets/Home.svg";
import homeActiveIcon from "../../assets/HomeFill.svg";

import scheduleIcon from "../../assets/CalendarStar.svg";
import scheduleActiveIcon from "../../assets/CalendarStarFill.svg";

import livetalkIcon from "../../assets/ChatCircle.svg";
import livetalkActiveIcon from "../../assets/ChatCircleFill_nav.svg";

import noticeIcon from "../../assets/Megaphone.svg";
import noticeActiveIcon from "../../assets/MegaphoneFill_nav.svg";

type Tab = "home" | "schedule" | "livetalk" | "notice";

interface NavBarProps {
  activeTab: Tab;
  onTabChange?: (tab: Tab) => void;
}

const NAV_ITEMS: {
  key: Tab;
  label: string;
  path: string;
  defaultIcon: string;
  activeIcon: string;
}[] = [
  {
    key: "home",
    label: "홈",
    path: "/",
    defaultIcon: homeIcon,
    activeIcon: homeActiveIcon,
  },
  {
    key: "schedule",
    label: "일정표",
    path: "/schedule",
    defaultIcon: scheduleIcon,
    activeIcon: scheduleActiveIcon,
  },
  {
    key: "livetalk",
    label: "라이브톡",
    path: "/livetalk",
    defaultIcon: livetalkIcon,
    activeIcon: livetalkActiveIcon,
  },
  {
    key: "notice",
    label: "공지사항",
    path: "/notice",
    defaultIcon: noticeIcon,
    activeIcon: noticeActiveIcon,
  },
];

export default function NavBar({ activeTab, onTabChange }: NavBarProps) {
  const navigate = useNavigate();

  return (
    <S.Container>
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.key;

        return (
          <S.Item
            key={item.key}
            type="button"
            $active={isActive}
            onClick={() => {
              navigate(item.path);
              onTabChange?.(item.key);
            }}
          >
            <S.Icon
              src={isActive ? item.activeIcon : item.defaultIcon}
              alt={item.label}
            />
            <S.Label>{item.label}</S.Label>
          </S.Item>
        );
      })}
    </S.Container>
  );
}
