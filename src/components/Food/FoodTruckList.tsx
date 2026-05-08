import { useEffect, useRef, useState } from "react";
import FoodTruckCard from "./FoodTruckCard";

interface Props {
  isVeganSelected: boolean;
  targetStoreName: string | null;
  onScrollDone: () => void;
}

interface FoodTruckApiItem {
  id: number;
  imageUrl: string;
  name: string;
  representativeMenu: string;
  description?: string;
  operatingDays?: string;
  likeCount: number;
  isLiked?: boolean;
  isOpen: boolean;
}

export interface Menu {
  name: string;
  price: string;
  isVegan: boolean;
}

export interface Truck {
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

const getStoredLike = (id: number) => {
  return localStorage.getItem(`foodtruck_like_${id}`) === "true";
};

export default function FoodTruckList({
  isVeganSelected,
  targetStoreName,
  onScrollDone,
}: Props) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [foodTrucks, setFoodTrucks] = useState<Truck[]>([]);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  useEffect(() => {
    const fetchFoodTrucks = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/food-trucks?is-vegan=${isVeganSelected}`
        );

        const data = await response.json();

        if (!response.ok || !data.isSuccess) {
          alert(data.message || "푸드트럭 목록을 불러오지 못했습니다.");
          return;
        }

        const mappedTrucks: Truck[] = data.result.map(
          (truck: FoodTruckApiItem) => ({
            id: truck.id,
            name: truck.name,
            tags: (truck.description ?? "")
              .split(" ")
              .map((tag) => tag.replace("#", "").replace(/,/g, "").trim())
              .filter(Boolean),
            isLiked: truck.isLiked ?? getStoredLike(truck.id),
            likeCount: truck.likeCount,
            operatingTime: truck.operatingDays || "운영시간 정보 없음",
            images: truck.imageUrl ? [truck.imageUrl] : [],
            isOpen: truck.isOpen,
            menus: [
              {
                name: truck.representativeMenu,
                price: "",
                isVegan: false,
              },
            ],
          })
        );

        setFoodTrucks(mappedTrucks);
      } catch (error) {
        console.error(error);
        alert("푸드트럭 목록 조회 중 오류가 발생했습니다.");
      }
    };

    fetchFoodTrucks();
  }, [API_URL, isVeganSelected]);
  const [openTruckId, setOpenTruckId] = useState<number | null>(null);

  useEffect(() => {
    if (!targetStoreName) return;

    const targetTruck = foodTrucks.find(
      (truck) => truck.name === targetStoreName
    );
    if (!targetTruck) return;

    setOpenTruckId(targetTruck.id);

    const targetElement = cardRefs.current[targetStoreName];
    if (!targetElement) return;

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    onScrollDone();
  }, [targetStoreName, foodTrucks, onScrollDone]);
  return (
    <>
      {foodTrucks.map((truck) => (
        <div
          key={truck.id}
          ref={(element) => {
            cardRefs.current[truck.name] = element;
          }}
          style={{ scrollMarginTop: "72px" }}
        >
          <FoodTruckCard truck={truck} forceOpen={openTruckId === truck.id} />
        </div>
      ))}
    </>
  );
}
