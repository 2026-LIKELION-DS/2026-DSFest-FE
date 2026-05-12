import styled from "styled-components";
import { theme } from "./theme";

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
  /* color: ${({ theme }) => theme.colors.bg.brandLight}; */
  font-family: ${theme.typography.h1};
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#2d6a4f" : "#9e9e9e")};

  span {
    display: block;
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.bg.brandLight};
    font-family: ${theme.typography.bodyMd};
  }
`;

export const Page = styled.div`
  width: 100%;

  height: calc(100vh - 60px);
  min-height: calc(100vh - 60px);

  background: ${({ theme }) => theme.colors.bg.neutral};

  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    @media (min-height: 874px) {
      height: calc(874px - 24px - 60px);
      min-height: calc(874px - 24px - 60px);
    }
  }
`;

export const ThemeButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 14px 0;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  color: ${({ $active }) => ($active ? "#2d6a4f" : "#9e9e9e")};
  background: none;
  border: none;
  border-bottom: ${({ $active }) =>
    $active ? "2px solid #2d6a4f" : "2px solid transparent"};
  cursor: pointer;
  transition: all 0.2s;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px 26px 16px;
  gap: 10px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 12px;
`;

export const Rank = styled.div`
  font-family: ${theme.typography.h3};
`;

export const Thumbnail = styled.img`
  width: 147px;
  height: 83px;
  border-radius: 6px;
  background-color: #e0e0e0;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  flex: 1;
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 8px;

  span:first-child {
    min-width: 36px;
    font-family: ${theme.typography.h4};
  }

  span:last-child {
    font-family: ${theme.typography.bodyMd};
  }
`;

export const EmptyText = styled.div`
  text-align: center;
  color: #9e9e9e;
  font-size: 14px;
  padding: 40px 0;
`;

export const LoadingText = styled.div`
  text-align: center;
  color: #9e9e9e;
  font-size: 14px;
  padding: 40px 0;
`;

export const RinkCard = styled.div`
  display: flex;
  gap: 24px;
`;
