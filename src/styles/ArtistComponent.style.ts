import styled from "styled-components";

// ArtistCard
export const ArtistCard = styled.article`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 24px;
  border-radius: 4px;
  background: #fff;
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
  border: 0.5px solid #0b4112;
  border-radius: 2px;
  background: #f5f7ed;
  color: #0b4112;
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
  color: #161716;
`;

export const ArtistDesc = styled.p`
  margin: 8px 0 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #161716;
`;

export const LinkBlock = styled.div`
  background: #f5f7ed;
  border: 0.5px solid #0b4112;
  border-radius: 2px;
  display: flex;
  width: 121px;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 4px;
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
    color: #0b4112;
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
  background: ${({ $active }) => ($active ? "#277B31" : "#9E9E9E")};
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
  $status: "BEFORE" | "LIVE" | "ENDED";
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

  background: ${({ $status }) =>
    $status === "LIVE"
      ? "#0B4112"
      : $status === "ENDED"
        ? "#D6D6D6"
        : "#D6D6D6"};

  color: ${({ $status }) => ($status === "LIVE" ? "#F2F2F2" : "#828282")};

  cursor: ${({ $status }) => ($status === "ENDED" ? "not-allowed" : "pointer")};
`;

// export const CountdownButtonBlock = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   justify-content: space-between;
// `;

export const CountdownButtonBlock = styled.div<{
  $status: "BEFORE" | "LIVE" | "ENDED";
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
  background: #0b4112;
  color: #f2f2f2;
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
  color: #9e9e9e;
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
  color: #111;
`;

export const PlaylistDesc = styled.p`
  margin: 0;
  padding-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #9b9b9b;
`;

export const ThumbnailLink = styled.a`
  display: block;
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
  background: #064b13;
  color: #f2f2f2;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
`;

//PlaylistNotice
export const PlaylistNotice = styled.article`
  position: relative;
  overflow: hidden;

  margin-top: 22px;
  padding: 16px;
  border: 1px solid #e5ebcf;
  border-radius: 4px;
  background: #f5f7ed;

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
  color: #277b31;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
`;

export const NoticeList = styled.ol`
  margin: 18px 0 0;
  padding-left: 20px;

  li {
    margin-bottom: 10px;
    color: #222;
    font-size: 13px;
    line-height: 1.5;
    font-weight: 500;
  }
`;

export const NoticeCaption = styled.p`
  margin: 10px 0 0;
  color: #9a9a9a;
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
  @media (min-width: 768px) {
    border: 12px solid ${({ theme }) => theme.colors.olive[50]};
    height: 874px;
    border-radius: 24px;
    max-width: 402px;
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
  background: ${({ theme }) => theme.colors.bg.neutral};
  border-radius: 4px;
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ArtistContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ArtistModalTitle = styled.h2`
  text-align: center;
  margin-bottom: 0px;
  font-size: 24px;
  font-weight: 700;
  color: #277b31;
`;

export const ArtistModalDivider = styled.div`
  border: none;
  border-top: 0.5px solid #064112;
  margin: 0;
`;

export const ArtistImageRow = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalImage = styled.img`
  flex: 0 0 100px;
  height: 180px;
  width: 144px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
`;

export const ArtistDescription = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: #161716;
`;

export const ArtistButtonGroup = styled.div`
  display: flex;
`;

export const ArtistCloseButton = styled.button`
  width: 100%;
  height: 44px;
  padding: 10px;
  border-radius: 100px;
  border: 0.5px solid #9e9e9e;
  background: #fff;
  font-weight: 700;
  cursor: pointer;
`;
