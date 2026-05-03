import { useState } from "react";
import { trackEvent } from "../../utils/analytics";
import * as S from "../../styles/FoodTruckCard.styles";

import ImageDetailComponent from "../Common/ImageDetail";

import greenLeaf from "../../assets/Food/Greenleaf.svg";
import clock from "../../assets/Food/clock.svg";
import thumbsUp from "../../assets/Food/ThumbsUp.svg";
import thumbsUpFill from "../../assets/Food/ThumbsUpFill.svg";
import chevronDown from "../../assets/Food/ChevronDown.svg";
import chevronUp from "../../assets/Food/ChevronUp.svg";

interface Menu {
  name: string;
  price: string;
  isVegan: boolean;
}

interface Truck {
  id: number;
  name: string;
  tags: string[];
  isLiked: boolean;
  likeCount: number;
  operatingTime: string;
  images: string[];
  menus: Menu[];
  isOpen: boolean;
}

interface Props {
  truck: Truck;
  onImageClick?: (images: string[]) => void;
}

interface FoodTruckDetailMenu {
  menuName: string;
  price: number;
  isVegan: boolean;
}

interface FoodTruckDetailResponse {
  id: number;
  imageUrls: string[];
  name: string;
  description: string;
  operatingString: string;
  menus: FoodTruckDetailMenu[];
  likeCount: number;
  isLiked: boolean;
}

const getGuestUuid = () => {
  const key = "guestUuid";
  const savedUuid = localStorage.getItem(key);

  if (savedUuid) return savedUuid;

  const newUuid = crypto.randomUUID();
  localStorage.setItem(key, newUuid);

  return newUuid;
};

const isOperatingNow = () => {
  const now = new Date();

  const start = new Date(2026, 4, 13, 8, 30);
  const end = new Date(2026, 4, 15, 22, 0);

  return now >= start && now <= end;
};

export default function FoodTruckCard({ truck }: Props) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(truck.isLiked);
  const [likeCount, setLikeCount] = useState(truck.likeCount);
  const [images, setImages] = useState(truck.images);
  const [menus, setMenus] = useState<Menu[]>(truck.menus);
  const [operatingTime, setOperatingTime] = useState(truck.operatingTime);
  const [isDetailLoaded, setIsDetailLoaded] = useState(false);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const isOperating = isOperatingNow();

  const fetchFoodTruckDetail = async () => {
    try {
      const response = await fetch(`${API_URL}/api/food-trucks/${truck.id}`, {
        method: "GET",
        headers: {
          guestUuid: getGuestUuid(),
        },
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        alert(data.message || "푸드트럭 상세 정보를 불러오지 못했습니다.");
        return;
      }

      const detail: FoodTruckDetailResponse = data.result;

      setImages(detail.imageUrls);
      setMenus(
        detail.menus.map((menu) => ({
          name: menu.menuName,
          price: `${menu.price.toLocaleString()}원`,
          isVegan: menu.isVegan,
        }))
      );
      setOperatingTime(detail.operatingString);
      setLikeCount(detail.likeCount);
      setIsLiked(detail.isLiked);
      setIsDetailLoaded(true);
    } catch (error) {
      console.error(error);
      alert("푸드트럭 상세 조회 중 오류가 발생했습니다.");
    }
  };

  const handleToggleOpen = async () => {
    if (!isOpen && !isDetailLoaded) {
      await fetchFoodTruckDetail();
    }

    setIsOpen((prev) => !prev);
  };

  const handleLike = () => {
    if (!isLiked) {
      trackEvent("foodtruck_like", {
        foodtruck_name: truck.name,
      });
    }

    setIsLiked((prev) => !prev);

    setLikeCount((prev) => {
      if (isLiked) return prev - 1;
      return prev + 1;
    });
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  return (
    <>
      <S.Card>
        <S.TopArea>
          <S.StoreImageButton type="button" onClick={handleImageClick}>
            <S.ImageWrapper>
              <S.StoreImage
                src={images[0]}
                alt={truck.name}
                $isOperating={isOperating}
              />

              {!isOperating && <S.PreparingText>준비중</S.PreparingText>}
            </S.ImageWrapper>
          </S.StoreImageButton>

          <S.InfoArea>
            <S.StoreName>{truck.name}</S.StoreName>

            <S.TagList>
              {truck.tags.map((tag) => (
                <S.Tag key={tag}>#{tag}</S.Tag>
              ))}
            </S.TagList>
          </S.InfoArea>

          <S.LikeArea $isLiked={isLiked} onClick={handleLike}>
            <S.LikeIcon src={isLiked ? thumbsUpFill : thumbsUp} alt="좋아요" />
            <S.LikeCount>{likeCount >= 999 ? "999+" : likeCount}</S.LikeCount>
          </S.LikeArea>
        </S.TopArea>

        {isOpen && (
          <S.DetailArea>
            <S.SectionTitle>운영 시간</S.SectionTitle>

            <S.TimeRow>
              <S.ClockIcon src={clock} alt="시간" />
              <S.TimeText>{operatingTime}</S.TimeText>
            </S.TimeRow>

            <S.SectionTitle>메뉴</S.SectionTitle>

            {menus.map((menu) => (
              <S.MenuRow key={menu.name}>
                <S.MenuNameBox>
                  {menu.isVegan && (
                    <S.MenuLeafIcon src={greenLeaf} alt="비건" />
                  )}
                  <S.MenuName>{menu.name}</S.MenuName>
                </S.MenuNameBox>

                <S.DotLine />
                <S.MenuPrice>{menu.price}</S.MenuPrice>
              </S.MenuRow>
            ))}
          </S.DetailArea>
        )}

        <S.ChevronButton type="button" onClick={handleToggleOpen}>
          <S.ChevronIcon src={isOpen ? chevronUp : chevronDown} alt="토글" />
        </S.ChevronButton>
      </S.Card>

      <ImageDetailComponent
        isOpen={isImageModalOpen}
        initialIndex={0}
        images={images}
        onClose={() => setIsImageModalOpen(false)}
      />
    </>
  );
}
