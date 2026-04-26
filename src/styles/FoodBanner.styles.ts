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
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 4px 8px #d9d9d9;

  width: 140px; /* 임시 */
`;

// 가게 이미지 자리 (회색 박스)
export const ImageBox = styled.button`
  width: 100%;
  height: 80px;

  padding: 0;
  border: none;
  background: #d9d9d9;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// 상호명
export const StoreName = styled.div`
  margin-top: 8px;

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

export const Track = styled.div`
  display: flex;
  gap: 16px;

  animation: scroll 60s linear infinite;

  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;
