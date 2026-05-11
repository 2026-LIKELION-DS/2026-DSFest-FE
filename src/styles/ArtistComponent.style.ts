import styled from "styled-components";

type CountdownStatus = "MORE_THAN_72H" | "WITHIN_72H" | "LIVE" | "ENDED";

// ArtistCard
export const ArtistCard = styled.article`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 24px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.bg.offWhite};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
`;

export const MaskImage = styled.img`
  position: absolute;
  opacity: 0.8;
  top: -17px;
  left: 70px;
`;

export const TimeBlock = styled.div`
  position: absolute;
  top: -1px;
  right: 25px;
  padding: 6px 12px;
  border: 0.5px solid ${({ theme }) => theme.colors.bg.brand};
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.bg.oliveLight};
  color: ${({ theme }) => theme.colors.bg.brand};
  transform: rotate(10deg);
`;

export const ArtistTime = styled.div`
  font-size: 18px;
  font-family: "OwnglyphSeaBreeze", sans-serif;
`;

export const ArtistImage = styled.img`
  width: 240px;
  height: 280px;
  object-fit: cover;
  border-radius: 4px;
`;

export const ArtistInfo = styled.div`
  margin-top: 18px;
  text-align: left;
`;

export const ArtistName = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const ArtistDesc = styled.p`
  margin: 8px 0 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const LinkBlock = styled.a`
  background: ${({ theme }) => theme.colors.bg.oliveLight};
  border: 0.5px solid ${({ theme }) => theme.colors.bg.brand};
  border-radius: 2px;
  display: flex;
  width: 121px;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: inherit;
`;

export const ArtistLink = styled.div`
  position: absolute;
  right: -13px;
  bottom: 90px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;

  a {
    color: ${({ theme }) => theme.colors.bg.brand};
    font-size: 14px;
    font-family: "OwnglyphSeaBreeze", sans-serif;
  }
`;

//ArtistPagination
export const ArtistPagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 18px 0 0;
`;

export const PageButton = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 100px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.bg.brandLight : theme.colors.fg.subtle};
  cursor: pointer;
`;

//ArtistActionButtons
export const ActionSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const ButtonSet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CountdownButton = styled.button<{
  $status: CountdownStatus;
}>`
  width: 294px;
  height: 44px;
  border-radius: 100px;
  border: none;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 24px;

  background: ${({ theme, $status }) =>
    $status === "LIVE" ? theme.colors.bg.brand : theme.colors.bg.disabled};

  color: ${({ theme, $status }) =>
    $status === "LIVE"
      ? theme.colors.fg.primaryInverted
      : theme.colors.fg.disabled};

  cursor: ${({ $status }) => ($status === "ENDED" ? "not-allowed" : "pointer")};
`;

export const CountdownButtonBlock = styled.div<{
  $status: CountdownStatus;
}>`
  display: flex;
  align-items: center;
  width: 100%;

  justify-content: ${({ $status }) =>
    $status === "LIVE" ? "space-between" : "center"};
`;

export const LeftContent = styled.div`
  display: flex;
  gap: 12px;
`;

export const EntranceButton = styled.button`
  width: 294px;
  height: 44px;
  border-radius: 100px;
  border: none;
  background: ${({ theme }) => theme.colors.bg.brand};
  color: ${({ theme }) => theme.colors.fg.primaryInverted};
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 24px;
`;

export const EntranceButtonBlock = styled.div`
  display: flex;
  gap: 12px;
`;

export const NoticeText = styled.p`
  color: ${({ theme }) => theme.colors.fg.subtle};
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  margin: 0;
`;

//ArtistPlaylist
export const ArtistPlaylist = styled.section`
  margin-top: 6px;
`;

export const PlatlistBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const PlaylistTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const PlaylistDesc = styled.p`
  margin: 0;
  padding-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.fg.subtle};
`;

export const ThumbnailButton = styled.button`
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

export const PlaylistIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
`;

export const PlaylistThumbnail = styled.img`
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const PlaylistAddButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  margin-top: 24px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.bg.brand};
  color: ${({ theme }) => theme.colors.fg.primaryInverted};
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
`;

//PlaylistNotice
export const PlaylistNotice = styled.article`
  position: relative;
  overflow: hidden;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.oliveLight};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.bg.oliveLight};

  .bubble {
    position: absolute;
    pointer-events: none;
    z-index: 0;
  }

  .bubble1 {
    top: 0;
    left: 0;
  }

  .bubble2 {
    top: 48px;
    right: 5px;
  }

  .bubble3 {
    bottom: 0;
    right: 0;
  }

  > *:not(img) {
    position: relative;
    z-index: 1;
  }
`;

export const NoticeTitle = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.bg.brandLight};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
`;

export const NoticeList = styled.ol`
  margin: 18px 0 0;
  padding-left: 20px;

  li {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.fg.primary};
    font-size: 13px;
    line-height: 1.5;
    font-weight: 500;
  }
`;

export const NoticeCaption = styled.p`
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.fg.subtle};
  font-size: 13px;
  font-weight: 500;
`;

export const NoticeBubble = styled.img<{
  $top?: string;
  $right?: string;
}>;

// ArtistModal
export const ArtistModalOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 768px;
  height: 100dvh;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    border: 12px solid ${({ theme }) => theme.colors.olive[50]};
    max-height: 874px;
    border-radius: 24px;
    max-width: 402px;
  }

  @media (max-height: 910px) {
    border-radius: 0;
    border: none;
  }

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
  overflow: hidden;
`;

export const ArtistModalContainer = styled.div`
  width: 100%;
  max-width: 354px;
  max-height: 90%;
  background: ${({ theme }) => theme.colors.bg.offWhite};
  border-radius: 4px;
  position: relative;

  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  overflow: hidden;
  box-sizing: border-box;
`;

export const ArtistContentArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 16px;

  padding-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const ArtistModalTitle = styled.h2`
  text-align: center;
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.bg.brandLight};
  line-height: 1.3;
  word-break: keep-all;
`;

export const ArtistModalDivider = styled.div`
  border: none;
  border-top: 0.5px solid ${({ theme }) => theme.colors.bg.brand};
  margin: 0;
  flex-shrink: 0;
`;

export const ArtistImageRow = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const ModalImage = styled.img`
  flex: 0 0 100px;
  width: 144px;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
`;

export const ArtistDescription = styled.div`
  margin: 0;
  color: ${({ theme }) => theme.colors.fg.primary};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;

  white-space: pre-line;
  word-break: keep-all;
`;

export const ArtistButtonGroup = styled.div`
  flex-shrink: 0;
`;

export const ArtistCloseButton = styled.button`
  width: 100%;
  height: 44px;
  box-sizing: border-box;

  padding: 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.subtle};
  background: ${({ theme }) => theme.colors.bg.offWhite};
  color: ${({ theme }) => theme.colors.fg.primary};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;
