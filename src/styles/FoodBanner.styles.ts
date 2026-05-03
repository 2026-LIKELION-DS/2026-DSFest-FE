import styled from "styled-components";
import bg from "../assets/Food/checkBG.svg";
import { theme } from "./theme";

// 전체 배너
export const BannerWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${bg});
  background-size: cover;

  display: flex;
  align-items: center;

  overflow: hidden;
`;

// 카드 (하얀 박스)
export const Card = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.bg.offWhite};
  padding: 16px 16px 5px;
  border-radius: 4px;
  box-shadow: 0px 4px 8px #d9d9d9;

  width: 140px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 가게 이미지 자리 (회색 박스)
export const ImageBox = styled.div`
  width: 100%;
  height: 80px;

  padding: 0;
  border: none;
  background: #d9d9d9;
  border-radius: 4px;

  display: block;
  overflow: hidden;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// 상호명
export const StoreName = styled.div`
  font-family: ${theme.typography.h3.fontFamily};
  font-weight: ${theme.typography.h3.fontWeight};
  font-size: ${theme.typography.h3.fontSize};
  line-height: ${theme.typography.h3.lineHeight};

  color: ${({ theme }) => theme.colors.fg.primary};
`;

// 스티커 (기울어진 박스)
export const Sticker = styled.div`
  position: absolute;
  top: -7px;
  right: -10px;

  display: flex;
  align-items: center;
  gap: 4px;

  background: ${({ theme }) => theme.colors.bg.oliveLight};
  border: 1px solid ${({ theme }) => theme.colors.bg.brand};
  padding: 6px 12px;
  border-radius: 2px;

  transform: rotate(8.52deg);

  font-family: ${theme.typography.decorationSm.fontFamily};
  font-weight: ${theme.typography.decorationSm.fontWeight};
  font-size: ${theme.typography.decorationSm.fontSize};
  line-height: ${theme.typography.decorationSm.lineHeight};

  color: ${({ theme }) => theme.colors.bg.brand};
`;

//음식 이미지
export const PizzaImage = styled.img`
  position: absolute;
  right: -6px;
  bottom: 20px;

  width: 44px;
  height: 44px;
`;

export const Track = styled.div<{
  $position: number;
  $isDragging: boolean;
}>`
  display: flex;
  gap: 16px;

  transform: ${({ $position }) => `translateX(${$position}px)`};

  cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "grab")};
  user-select: none;
  touch-action: pan-y;

  will-change: transform;
`;
