import { useEffect, useState } from "react";
import FoodTruckCard from "./FoodTruckCard";

interface Props {
  isVeganSelected: boolean;
  onImageClick: (images: string[]) => void;
}

interface FoodTruckApiItem {
  id: number;
  imageUrl: string;
  name: string;
  representativeMenu: string;
  description: string;
  operatingDays: string;
  likeCount: number;
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

export default function FoodTruckList({
  isVeganSelected,
  onImageClick,
}: Props) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [foodTrucks, setFoodTrucks] = useState<Truck[]>([]);

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
            tags: truck.description
              .split("#")
              .map((tag) => tag.trim())
              .filter(Boolean),
            isLiked: false,
            likeCount: truck.likeCount,
            operatingTime: truck.operatingDays,
            images: [truck.imageUrl],
            isOpen: truck.isOpen,
            menus: [
              {
                name: truck.representativeMenu,
                price: "",
                isVegan: isVeganSelected,
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

  return (
    <>
      {foodTrucks.map((truck) => (
        <FoodTruckCard
          key={truck.id}
          truck={truck}
          onImageClick={onImageClick}
        />
      ))}
    </>
  );
}
