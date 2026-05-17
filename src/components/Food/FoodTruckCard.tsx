import { trackEvent } from "../../utils/analytics";
import { useEffect, useState } from "react";
import * as S from "../../styles/FoodTruckCard.styles";

import ImageDetailComponent from "../Common/ImageDetail";

import greenLeaf from "../../assets/Food/Greenleaf.svg";
import thumbsUp from "../../assets/Food/ThumbsUp.svg";
import thumbsUpFill from "../../assets/Food/ThumbsUpFill.svg";
import chevronDown from "../../assets/Food/ChevronDown.svg";
import chevronUp from "../../assets/Food/ChevronUp.svg";
import foodTruckDetailsData from "../../data/foodtruckDetail.json";
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
  onForceOpenDone?: () => void;
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

export default function FoodTruckCard({
  truck,
  forceOpen,
  onForceOpenDone,
}: Props) {
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
  const [isDetailLoaded, setIsDetailLoaded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const isOperating = truck.isOpen;

  const fetchFoodTruckDetail = async () => {
    const detail = foodTruckDetailsData.find((item) => item.id === truck.id);

    if (!detail) {
      alert("푸드트럭 상세 정보를 찾을 수 없습니다.");
      return;
    }

    setImages(detail.imageUrls);

    setMenus(
      detail.menus.map((menu) => ({
        name: menu.menuName,
        price: `${menu.price.toLocaleString()}원`,
        isVegan: menu.isVegan,
      }))
    );

    setLikeCount(detail.likeCount);

    setIsLiked(detail.isLiked);

    localStorage.setItem(getLikeKey(truck.id), String(detail.isLiked));

    setIsDetailLoaded(true);
  };

  const handleToggleOpen = async () => {
    if (!isOpen && !isDetailLoaded) {
      await fetchFoodTruckDetail();
    }

    setIsOpen((prev) => !prev);
  };

  const handleLike = async () => {
    const nextIsLiked = !isLiked;

    if (nextIsLiked) {
      trackEvent("foodtruck_like", {
        foodtruck_name: truck.name,
      });
    }

    setIsLiked(nextIsLiked);

    localStorage.setItem(getLikeKey(truck.id), String(nextIsLiked));

    setLikeCount((prev) => (nextIsLiked ? prev + 1 : Math.max(prev - 1, 0)));
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

      setTimeout(() => {
        onForceOpenDone?.();
      }, 100);
    };

    openCard();
  }, [forceOpen, isDetailLoaded, onForceOpenDone]);
  return (
    <>
      <S.Card onClick={handleToggleOpen}>
        <S.TopArea>
          <S.StoreImageButton
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleImageClick();
            }}
          >
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

          <S.LikeArea
            $isLiked={isLiked}
            onClick={(event) => {
              event.stopPropagation();
              handleLike();
            }}
          >
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

        <S.ChevronButton
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleToggleOpen();
          }}
        >
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
