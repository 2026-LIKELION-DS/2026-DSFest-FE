import styled from "styled-components";

export const ArtistPage = styled.div`
  margin: 0 auto;
  padding: 0 24px 24px;
  background: ${({ theme }) => theme.colors.bg.offWhite};
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
  color: ${({ theme, $active }) =>
    $active ? theme.colors.bg.brandLight : theme.colors.fg.subtle};
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;

  span {
    display: block;
    margin-top: 6px;
    color: ${({ theme, $active }) =>
      $active ? theme.colors.bg.brandLight : theme.colors.fg.subtle};
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
  padding: 30px 0 10px;
`;

export const CarouselTrack = styled.div`
  display: flex;
  gap: 24px;
  transform: translate3d(0, 0, 0);
  transition: transform 0.4s ease;
  will-change: transform;
`;

export const CardSlide = styled.div`
  flex: 0 0 68%;
`;

export const PlaylistSection = styled.section`
  margin-top: 22px;
`;
