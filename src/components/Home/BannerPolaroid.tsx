import * as S from "../../styles/Home.style";

interface BannerPolaroidProps {
  title: string;
  stickerText: string;
  image: string;
  link?: string;
  onClick?: () => void;
}

export default function BannerPolaroid({
  title,
  stickerText,
  image,
  link,
  onClick,
}: BannerPolaroidProps) {
  return (
    <S.BannerWrapper href={link} onClick={onClick}>
      <S.Tape />
      <S.Polaroid>
        <S.PolaroidContents>
          <S.PolaroidImg src={image} alt={title} />
          <S.PolaroidTitle>{title}</S.PolaroidTitle>
        </S.PolaroidContents>

        <S.Sticker>
          <S.StickerContent>{stickerText}</S.StickerContent>
        </S.Sticker>
      </S.Polaroid>
    </S.BannerWrapper>
  );
}
