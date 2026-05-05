import { useEffect, useRef, useState } from "react";

import FoodBannerCarousel from "../components/Food/FoodBannerCarousel";
import FoodFilterSection from "../components/Food/FoodFilterSection";
import FoodTruckList from "../components/Food/FoodTruckList";
import FoodFloatingButtons from "../components/Food/FoodFloatingButtons";
import Modal from "../components/Common/ModalComponent";

import * as S from "../styles/Food.styles";

interface FoodNotice {
  id: number;
  title: string;
  category: string;
  urgent: boolean;
  content: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

const FOOD_NOTICE_ID = 4;

const getGuestUuid = () => {
  const key = "guest_uuid";
  const savedUuid = localStorage.getItem(key);

  if (savedUuid) return savedUuid;

  const newUuid = crypto.randomUUID();
  localStorage.setItem(key, newUuid);

  return newUuid;
};

export default function Food() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [isVeganSelected, setIsVeganSelected] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [notice, setNotice] = useState<FoodNotice | null>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const checkScroll = () => {
      let element = pageRef.current;
      let isScrolled = window.scrollY > 0;

      while (element) {
        if (element.scrollTop > 0) {
          isScrolled = true;
          break;
        }

        element = element.parentElement;
      }

      setShowTopBtn(isScrolled);
    };

    window.addEventListener("scroll", checkScroll, true);
    checkScroll();

    return () => {
      window.removeEventListener("scroll", checkScroll, true);
    };
  }, []);

  const handleTop = () => {
    let element = pageRef.current;

    while (element) {
      element.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      element = element.parentElement;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleOpenNotice = async () => {
    try {
      const response = await fetch(`${API_URL}/api/notices/${FOOD_NOTICE_ID}`, {
        method: "GET",
        headers: {
          "guest-uuid": getGuestUuid(),
        },
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        alert(data.message || "공지사항을 불러오지 못했습니다.");
        return;
      }

      setNotice(data.result);
      setIsNoticeOpen(true);
    } catch (error) {
      console.error(error);
      alert("공지사항 조회 중 오류가 발생했습니다.");
    }
  };

  return (
    <S.FoodPage ref={pageRef}>
      <S.FixedTopArea>
        <FoodBannerCarousel />

        <FoodFilterSection
          isVeganSelected={isVeganSelected}
          setIsVeganSelected={setIsVeganSelected}
        />
      </S.FixedTopArea>

      <S.ListArea>
        <FoodTruckList isVeganSelected={isVeganSelected} />
      </S.ListArea>

      {!isNoticeOpen && (
        <FoodFloatingButtons
          onNotice={handleOpenNotice}
          onTop={handleTop}
          showTopBtn={showTopBtn}
        />
      )}

      <Modal
        isOpen={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        title={notice?.title || ""}
        images={notice?.imageUrls || []}
        content={notice?.content || ""}
      />
    </S.FoodPage>
  );
}
