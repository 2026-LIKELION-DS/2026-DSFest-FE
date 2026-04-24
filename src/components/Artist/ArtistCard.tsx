import * as S from "../../styles/ArtistComponent.style";

import instagramIcon from "../../assets/InstagramLogo.svg";
import youtubeIcon from "../../assets/YoutubeLogo.svg";
import masking from "../../assets/Artist_masking.svg";

export type Artist = {
  id: number;
  name: string;
  desc: string;
  time: string;
  image: string;
  instaUrl: string;
  youtubeUrl: string;
};

export type ArtistCardProps = {
  artist: Artist;
};

function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <S.ArtistCard>
      <S.MaskImage src={masking} />
      <S.TimeBlock>
        <S.ArtistTime>{artist.time}</S.ArtistTime>
      </S.TimeBlock>

      <S.ArtistImage alt={artist.name} src={artist.image} />

      <S.ArtistInfo>
        <S.ArtistName>{artist.name}</S.ArtistName>
        <S.ArtistDesc>{artist.desc}</S.ArtistDesc>
      </S.ArtistInfo>

      <S.ArtistLink>
        <S.LinkBlock>
          <img src={instagramIcon} alt="Instagram" />
          <a href={artist.instaUrl}>공식 인스타그램</a>
        </S.LinkBlock>
        <S.LinkBlock>
          <img src={youtubeIcon} alt="YouTube" />
          <a href={artist.youtubeUrl}>공식 유튜브 채널</a>
        </S.LinkBlock>
      </S.ArtistLink>
    </S.ArtistCard>
  );
}

export default ArtistCard;
