import FoodTruckCard from "./FoodTruckCard";

import pizza from "../../assets/Food/Pizza.svg";
import chicken from "../../assets/Food/Chicken.svg";
import burrito from "../../assets/Food/Burrito.svg";

interface Props {
  isVeganSelected: boolean;
  onImageClick: (images: string[]) => void;
}

const foodTrucks = [
  {
    id: 1,
    name: "타우라푸드",
    tags: ["고기/BBQ", "간편식", "비건"],
    isLiked: false,
    likeCount: 1,
    operatingTime: "8:30 ~ 22:00",
    images: [chicken, pizza],
    menus: [
      { name: "수제 닭강정", price: "10,000원", isVegan: false },
      { name: "수제 후라이드", price: "15,000원", isVegan: false },
      { name: "떡꼬치", price: "3,000원", isVegan: true },
    ],
  },
  {
    id: 2,
    name: "이태원케밥",
    tags: ["고기/BBQ", "해산물", "면/식사류"],
    isLiked: false,
    likeCount: 7,
    operatingTime: "8:30 ~ 22:00",
    images: [burrito],
    menus: [
      { name: "터키 아이스크림", price: "10,000원", isVegan: false },
      { name: "수제 후라이드", price: "15,000원", isVegan: false },
      {
        name: "소프트 아이스크림 + 츄러스(소프트 아츄)",
        price: "30,000원",
        isVegan: false,
      },
    ],
  },
  {
    id: 3,
    name: "이태원케밥1",
    tags: ["고기/BBQ", "해산물", "면/식사류"],
    isLiked: false,
    likeCount: 7,
    operatingTime: "8:30 ~ 22:00",
    images: [pizza, chicken, burrito],
    menus: [
      { name: "터키 아이스크림", price: "10,000원", isVegan: false },
      { name: "수제 후라이드", price: "15,000원", isVegan: false },
      {
        name: "소프트 아이스크림 + 츄러스(소프트 아츄)",
        price: "30,000원",
        isVegan: false },
    ],
  },
];

export default function FoodTruckList({ isVeganSelected, onImageClick }: Props) {
  const filtered = isVeganSelected
    ? foodTrucks.filter((truck) => truck.tags.includes("비건"))
    : foodTrucks;

  return (
    <>
      {filtered.map((truck) => (
        <FoodTruckCard
          key={truck.id}
          truck={truck}
          onImageClick={onImageClick}
        />
      ))}
    </>
  );
}