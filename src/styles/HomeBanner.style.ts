import styled from "styled-components";

export const BannerSection = styled.section`
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  user-select: none; 
`;

export const BannerViewport = styled.div`
  width: 332px;
  overflow: visible;
  position: relative;
`;


interface BannerTrackProps {
  $currentIndex: number;
  $isTransition: boolean;
  $dragOffset: number;
  $duration: number;
}

export const BannerTrack = styled.div<BannerTrackProps>`
  display: flex;
  gap: 12px;

  transform: translate3d(
    calc(-${({ $currentIndex }) => $currentIndex} * (332px + 12px) + ${({ $dragOffset }) => $dragOffset}px),
    0,
    0
  );

  transition: ${({ $isTransition, $duration }) =>
    $isTransition
      ? `transform ${$duration}s cubic-bezier(0.22, 1, 0.36, 1)`
      : "none"};

  will-change: transform;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const BannerSlide = styled.div`
  flex: 0 0 332px;
  width: 332px;

  img {
    pointer-events: none;
  }
`;

export const BannerDots = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface BannerDotProps {
  $active: boolean;
}

export const BannerDot = styled.div<BannerDotProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.bg.brandLight : theme.colors.fg.subtle};
  transition: background-color 0.3s ease;
`;