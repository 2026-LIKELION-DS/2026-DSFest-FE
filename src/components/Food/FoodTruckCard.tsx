import { useState } from "react";
import * as S from "../../styles/FoodTruckCard.styles";

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
}

interface Props {
  truck: Truck;
  onImageClick: (images: string[]) => void;
}

const isOperatingNow = () => {
  const now = new Date();

  const start = new Date(2026, 4, 13, 8, 30);
  const end = new Date(2026, 4, 15, 22, 0);

  return now >= start && now <= end;
};

const getFestivalOperatingText = (operatingTime: string) => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  if (year !== 2026 || month !== 5 || date < 13 || date > 15) {
    return "축제기간이 아닙니다";
  }

  const dayMap: Record<number, string> = {
    13: "수",
    14: "목",
    15: "금",
  };

  return `${date}(${dayMap[date]}) ${operatingTime}`;
};

export default function FoodTruckCard({ truck, onImageClick }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(truck.isLiked);
  const [likeCount, setLikeCount] = useState(truck.likeCount);

  const isOperating = isOperatingNow();

  const handleLike = () => {
    setIsLiked((prev) => !prev);

    setLikeCount((prev) => {
      if (isLiked) return prev - 1;
      return prev + 1;
    });
  };

  const operatingText = getFestivalOperatingText(truck.operatingTime);

  return (
    <S.Card>
      <S.TopArea>
        <S.StoreImageButton onClick={() => onImageClick(truck.images)}>
          <S.ImageWrapper>
            <S.StoreImage
              src={truck.images[0]}
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
            <S.TimeText>{operatingText}</S.TimeText>
          </S.TimeRow>

          <S.SectionTitle>메뉴</S.SectionTitle>

          {truck.menus.map((menu) => (
            <S.MenuRow key={menu.name}>
              <S.MenuNameBox>
                {menu.isVegan && <S.MenuLeafIcon src={greenLeaf} alt="비건" />}
                <S.MenuName>{menu.name}</S.MenuName>
              </S.MenuNameBox>

              <S.DotLine />
              <S.MenuPrice>{menu.price}</S.MenuPrice>
            </S.MenuRow>
          ))}
        </S.DetailArea>
      )}

      <S.ChevronButton onClick={() => setIsOpen((prev) => !prev)}>
        <S.ChevronIcon src={isOpen ? chevronUp : chevronDown} alt="토글" />
      </S.ChevronButton>
    </S.Card>
  );
}
