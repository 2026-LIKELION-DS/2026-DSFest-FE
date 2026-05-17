import { useEffect, useRef, useState } from "react";

import FoodBannerCarousel from "../components/Food/FoodBannerCarousel";
import FoodFilterSection from "../components/Food/FoodFilterSection";
import FoodTruckList from "../components/Food/FoodTruckList";
import FoodFloatingButtons from "../components/Food/FoodFloatingButtons";
import Modal from "../components/Common/ModalComponent";

import noticesData from "../data/NoticeJson/NoticesDetail.json";

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

export default function Food() {
  const [targetStoreName, setTargetStoreName] = useState<string | null>(null);
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

  const handleOpenNotice = () => {
    const foundNotice = noticesData.find(
      (notice) => notice.id === FOOD_NOTICE_ID
    );

    if (!foundNotice) {
      alert("공지사항을 찾을 수 없습니다.");
      return;
    }

    setNotice(foundNotice);
    setIsNoticeOpen(true);
  };

  return (
    <S.FoodPage ref={pageRef}>
      <S.FixedTopArea>
        <FoodBannerCarousel onBannerClick={setTargetStoreName} />

        <FoodFilterSection
          isVeganSelected={isVeganSelected}
          setIsVeganSelected={setIsVeganSelected}
        />
      </S.FixedTopArea>

      <S.ListArea>
        <FoodTruckList
          isVeganSelected={isVeganSelected}
          targetStoreName={targetStoreName}
          onScrollDone={() => setTargetStoreName(null)}
        />
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
