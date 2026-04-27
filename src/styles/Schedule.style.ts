import styled from "styled-components";
import { theme } from "./theme";
import ScheduleBackGround from "../assets/Schedule/Scheduleback.svg";

export const SchedulePage = styled.div`
  padding: 0 24px 24px;
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg.neutral};
  overflow-x: hidden;
  min-height: 100vh;
  background-image: url(${ScheduleBackGround});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
`;

export const Bubble = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  pointer-events: none;
`;

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px 24px;
  margin: 24px 0 0;
`;

export const DayButton = styled.button<{ $active: boolean }>`
  flex: 1;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.bg.brandLight};
  font-family: ${theme.typography.h1};
  cursor: pointer;

  span {
    display: block;
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.bg.brandLight};
    font-family: ${theme.typography.bodyMd};
  }
`;

export const DaySection = styled.div`
  scroll-margin-top: 80px;
  position: relative;
`;

export const DecoLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
`;

export const Leafs = styled.img`
  position: absolute;
  width: 85px;
  height: 88px;

  top: 178px;
  left: 6px;
  z-index: 2;
  pointer-events: none;
`;

export const Flower = styled.img`
  position: absolute;
  width: 78px;
  height: 74px;

  top: 758px;
  left: 5px;
  z-index: 2;
  pointer-events: none;
`;

export const CamFlower = styled.img`
  position: absolute;
  width: 105px;
  height: 92px;

  top: 758px;
  right: 2px;
  z-index: 2;
  pointer-events: none;
`;

export const Leafs1 = styled.img`
  position: absolute;
  top: 900px;
  right: 32%;
  z-index: 2;
  pointer-events: none;
`;

export const CamLeaf = styled.img`
  position: absolute;
  width: 118px;
  height: 103px;
  top: 1470px;
  z-index: 2;
  pointer-events: none;
`;

export const Flowers2 = styled.img`
  position: absolute;
  height: 126px;
  top: 1560px;
  left: -10px;
  z-index: 2;
  pointer-events: none;
`;
export const CamFlower2 = styled.img`
  position: absolute;
  width: 115px;
  height: 149px;
  top: 2130px;
  right: -12px;
  z-index: 2;
  pointer-events: none;
`;
