import { useEffect, useState } from "react";
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

const NAV_ITEMS = [
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
] as const;

export default function NavBar({ activeTab, onTabChange }: NavBarProps) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [unreadCount, setUnreadCount] = useState(0);

  const getGuestUuid = () => {
    const savedUuid = localStorage.getItem("guest_uuid");

    if (savedUuid) return savedUuid;

    const newUuid = crypto.randomUUID();
    localStorage.setItem("guest_uuid", newUuid);

    return newUuid;
  };

  const getApiUrl = (path: string) => {
    return `${API_URL.replace(/\/$/, "")}${path}`;
  };

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const guestUuid = getGuestUuid();

        const response = await fetch(
          getApiUrl(`/api/livetalk/unread-count?guestUuid=${guestUuid}`)
        );

        if (!response.ok) return;

        const data = await response.json();

        if (data.isSuccess) {
          setUnreadCount(data.result);
        }
      } catch (error) {
        console.error("안 읽은 메시지 수 조회 실패:", error);
      }
    };

    fetchUnreadCount();

    const intervalId = window.setInterval(() => {
      fetchUnreadCount();
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [API_URL]);

  return (
    <S.Container>
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.key;
        const showUnreadBadge = item.key === "livetalk" && unreadCount > 0;

        return (
          <S.Item
            key={item.key}
            type="button"
            $active={isActive}
            onClick={() => {
              if (item.key === "livetalk") {
                setUnreadCount(0);
              }

              navigate(item.path);
              onTabChange?.(item.key);
            }}
          >
            <S.IconWrapper>
              <S.Icon
                src={isActive ? item.activeIcon : item.defaultIcon}
                alt={item.label}
              />

              {showUnreadBadge && (
                <S.Badge>{unreadCount > 99 ? "99+" : unreadCount}</S.Badge>
              )}
            </S.IconWrapper>

            <S.Label>{item.label}</S.Label>
          </S.Item>
        );
      })}
    </S.Container>
  );
}
