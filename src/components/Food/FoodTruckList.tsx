import { useEffect, useRef, useState } from "react";
import FoodTruckCard from "./FoodTruckCard";
import foodTruckListData from "../../data/FoodJson/foodtruckList.json";

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
  const [foodTrucks, setFoodTrucks] = useState<Truck[]>([]);
  const [openTruckId, setOpenTruckId] = useState<number | null>(null);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hasAutoScrolledRef = useRef(false);

  useEffect(() => {
    const filteredResult = isVeganSelected
      ? foodTruckListData.result.filter((truck: FoodTruckApiItem) =>
          truck.description?.includes("비건")
        )
      : foodTruckListData.result;

    const mappedTrucks: Truck[] = filteredResult.map(
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
  }, [isVeganSelected]);

  useEffect(() => {
    if (!targetStoreName) return;

    const targetTruck = foodTrucks.find(
      (truck) => truck.name === targetStoreName
    );
    if (!targetTruck) return;

    const targetElement = cardRefs.current[targetStoreName];
    if (!targetElement) return;

    hasAutoScrolledRef.current = false;
    setOpenTruckId(targetTruck.id);

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
          style={{ scrollMarginTop: "60px" }}
        >
          <FoodTruckCard
            truck={truck}
            forceOpen={openTruckId === truck.id}
            onForceOpenDone={() => {
              if (hasAutoScrolledRef.current) return;

              const targetElement = cardRefs.current[truck.name];
              if (!targetElement) return;

              hasAutoScrolledRef.current = true;

              targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });

              setOpenTruckId(null);
            }}
          />
        </div>
      ))}
    </>
  );
}
