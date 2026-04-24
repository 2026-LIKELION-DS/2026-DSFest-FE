import styled from "styled-components";

export const ArtistPage = styled.div`
  margin: 0 auto;
  padding: 0 24px;
  background: #fff;
  overflow-x: hidden;
`;

export const ArtistContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0 0;
`;

export const DayButton = styled.button<{ $active: boolean }>`
  flex: 1;
  border: none;
  background: transparent;
  color: ${({ $active }) => ($active ? "#277B31" : "#9E9E9E")};
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;

  span {
    display: block;
    margin-top: 6px;
    color: ${({ $active }) => ($active ? "#277B31" : "#9E9E9E")};
    font-size: 14px;
    font-weight: 500;
  }
`;

export const ArtistSection = styled.section`
  margin-top: 10px;
  overflow: visible;
`;

export const CarouselWrapper = styled.div`
  width: calc(100% + 48px);
  margin-left: -24px;
  overflow: hidden;
  padding: 30px 58px 10px;
`;

export const CarouselTrack = styled.div<{ $currentPage: number }>`
  display: flex;
  gap: 16px;
  transition: transform 0.4s ease;

  transform: translateX(
    ${({ $currentPage }) => `calc(-${$currentPage - 1} * (80% + 16px))`}
  );
`;

export const CardSlide = styled.div`
  flex: 0 0 74%;
`;

export const PlaylistSection = styled.section`
  margin-top: 22px;
`;
