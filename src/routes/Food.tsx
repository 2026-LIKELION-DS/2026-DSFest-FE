import { useRef, useState } from "react";

import FoodBannerCarousel from "../components/Food/FoodBannerCarousel";
import FoodFilterSection from "../components/Food/FoodFilterSection";
import FoodTruckList from "../components/Food/FoodTruckList";
import FoodFloatingButtons from "../components/Food/FoodFloatingButtons";
import Modal from "../components/Common/ModalComponent";
import ImageModalComponent from "../components/Food/ImageModalComponent";

import pizzaImg from "../assets/Food/Pizza.svg";

import * as S from "../styles/Food.styles";

export default function Food() {
  const [isVeganSelected, setIsVeganSelected] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const pageRef = useRef<HTMLElement | null>(null);

  const handleTop = () => {
    let element = pageRef.current;

    while (element) {
      element.scrollTop = 0;
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

  const handleOpenImageModal = (images: string[]) => {
    setSelectedImages(images);
    setIsImageModalOpen(true);
  };

  return (
    <S.FoodPage ref={pageRef}>
      <S.FixedTopArea>
        <FoodBannerCarousel onImageClick={handleOpenImageModal} />

        <FoodFilterSection
          isVeganSelected={isVeganSelected}
          setIsVeganSelected={setIsVeganSelected}
        />
      </S.FixedTopArea>

      <S.ListArea>
        <FoodTruckList
          isVeganSelected={isVeganSelected}
          onImageClick={handleOpenImageModal}
        />
      </S.ListArea>

      <FoodFloatingButtons
        onNotice={() => setIsNoticeOpen(true)}
        onTop={handleTop}
      />

      <Modal
        isOpen={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        title="푸드트럭 관련 공지 제목"
        images={[pizzaImg, pizzaImg]}
        content="공지 본문이 들어가는 자리입니다."
      />

      <ImageModalComponent
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={selectedImages}
      />
    </S.FoodPage>
  );
}
