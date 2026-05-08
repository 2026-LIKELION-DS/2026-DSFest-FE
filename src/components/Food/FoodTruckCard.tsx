import { trackEvent } from "../../utils/analytics";
import { useEffect, useState } from "react";
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
  forceOpen?: boolean;
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

const TEMP_GUEST_UUID = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const getGuestUuid = () => {
  const savedUuid = localStorage.getItem("guest_uuid");
  if (savedUuid) return savedUuid;

  localStorage.setItem("guest_uuid", TEMP_GUEST_UUID);
  return TEMP_GUEST_UUID;
};

const getLikeKey = (id: number) => `foodtruck_like_${id}`;

export default function FoodTruckCard({ truck, forceOpen }: Props) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(() => {
    const savedLike = localStorage.getItem(getLikeKey(truck.id));

    if (savedLike !== null) {
      return savedLike === "true";
    }

    return truck.isLiked;
  });

  const [likeCount, setLikeCount] = useState(truck.likeCount);
  const [images, setImages] = useState(truck.images);
  const [menus, setMenus] = useState<Menu[]>(truck.menus);
  const [operatingTime, setOperatingTime] = useState(truck.operatingTime);
  const [isDetailLoaded, setIsDetailLoaded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const isOperating = truck.isOpen;

  const fetchFoodTruckDetail = async () => {
    try {
      const response = await fetch(`${API_URL}/api/food-trucks/${truck.id}`, {
        method: "GET",
        headers: {
          "guest-uuid": getGuestUuid(),
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

      setOperatingTime(
        detail.operatingString ||
          truck.operatingTime ||
          "운영시간 정보가 없습니다."
      );

      setLikeCount(detail.likeCount);
      setIsLiked(detail.isLiked);
      localStorage.setItem(getLikeKey(truck.id), String(detail.isLiked));

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

  const handleLike = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/food-trucks/${truck.id}/likes`,
        {
          method: "POST",
          headers: {
            "guest-uuid": getGuestUuid(),
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        alert(data.message || "좋아요 처리에 실패했습니다.");
        return;
      }

      const nextIsLiked = data.result.isLiked;

      if (nextIsLiked) {
        trackEvent("foodtruck_like", {
          foodtruck_name: truck.name,
        });
      }

      setIsLiked(nextIsLiked);
      localStorage.setItem(getLikeKey(truck.id), String(nextIsLiked));

      setLikeCount((prev) => (nextIsLiked ? prev + 1 : Math.max(prev - 1, 0)));
    } catch (error) {
      console.error(error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  const handleImageClick = async () => {
    if (!isDetailLoaded) {
      await fetchFoodTruckDetail();
    }

    setIsImageModalOpen(true);
  };
  useEffect(() => {
    if (!forceOpen) return;

    const openCard = async () => {
      if (!isDetailLoaded) {
        await fetchFoodTruckDetail();
      }

      setIsOpen(true);
    };

    openCard();
  }, [forceOpen, isDetailLoaded]);
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
            <S.LikeIcon src={isLiked ? thumbsUpFill : thumbsUp} />
            <S.LikeCount>{likeCount >= 999 ? "999+" : likeCount}</S.LikeCount>
          </S.LikeArea>
        </S.TopArea>

        {isOpen && (
          <S.DetailArea>
            <S.SectionTitle>메뉴</S.SectionTitle>

            {menus.map((menu) => (
              <S.MenuRow key={menu.name}>
                <S.MenuNameBox>
                  {menu.isVegan && <S.MenuLeafIcon src={greenLeaf} />}
                  <S.MenuName>{menu.name}</S.MenuName>
                </S.MenuNameBox>

                <S.DotLine />
                <S.MenuPrice>{menu.price}</S.MenuPrice>
              </S.MenuRow>
            ))}
          </S.DetailArea>
        )}

        <S.ChevronButton type="button" onClick={handleToggleOpen}>
          <S.ChevronIcon src={isOpen ? chevronUp : chevronDown} />
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
