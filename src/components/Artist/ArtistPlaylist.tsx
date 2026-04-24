import * as S from "../../styles/ArtistComponent.style";

type ArtistPlaylistProps = {
  playlistUrl: string;
  thumbnailUrl: string;
};

function ArtistPlaylist({ playlistUrl, thumbnailUrl }: ArtistPlaylistProps) {
  return (
    <S.ArtistPlaylist>
      <S.PlatlistBlock>
        <S.PlaylistTitle>덕우들의 플레이리스트</S.PlaylistTitle>
        <S.PlaylistDesc>무대 보기 전에 예습해볼까요?</S.PlaylistDesc>
      </S.PlatlistBlock>

      <S.ThumbnailLink href={playlistUrl} target="_blank" rel="noreferrer">
        <S.PlaylistThumbnail src={thumbnailUrl} alt="유튜브 플레이리스트" />
      </S.ThumbnailLink>

      <S.PlaylistAddButton href={playlistUrl} target="_blank" rel="noreferrer">
        플레이리스트 추가하기
      </S.PlaylistAddButton>
    </S.ArtistPlaylist>
  );
}

export default ArtistPlaylist;
