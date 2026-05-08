import { useState } from "react";

import { trackEvent } from "../../utils/analytics";

import * as S from "../../styles/ArtistComponent.style";

type ArtistPlaylistProps = {
  playlistUrl: string;
  thumbnailUrl: string;
  videoId: string;
  desc: string;
};

const getPlaylistId = (playlistUrl: string) => {
  const url = new URL(playlistUrl);
  return url.searchParams.get("list") ?? "";
};

function ArtistPlaylist({
  playlistUrl,
  thumbnailUrl,
  videoId,
  desc,
}: ArtistPlaylistProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playlistId = getPlaylistId(playlistUrl);

  return (
    <S.ArtistPlaylist>
      <S.PlatlistBlock>
        <S.PlaylistTitle>덕우들의 플레이리스트</S.PlaylistTitle>
        <S.PlaylistDesc>{desc}</S.PlaylistDesc>
      </S.PlatlistBlock>

      {!isPlaying ? (
        <S.ThumbnailButton
          type="button"
          onClick={() => {
            setIsPlaying(true);
            trackEvent("playlist_play");
          }}
        >
          <S.PlaylistThumbnail src={thumbnailUrl} alt="플레이리스트 썸네일" />
        </S.ThumbnailButton>
      ) : (
        <S.PlaylistIframe
          src={`https://www.youtube.com/embed/${videoId}?list=${playlistId}&index=1&autoplay=1`}
          title="유튜브 플레이리스트"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}

      <S.PlaylistAddButton
        href={playlistUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("playlist_add")}
      >
        플레이리스트 추가하기
      </S.PlaylistAddButton>
    </S.ArtistPlaylist>
  );
}

export default ArtistPlaylist;
