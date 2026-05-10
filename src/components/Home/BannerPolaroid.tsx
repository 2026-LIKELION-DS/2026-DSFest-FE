import * as S from "../../styles/HomeBannerPolaroid.style";
import { useState, useEffect } from "react";

interface PolaroidProps {
  title: string;
  stickerText: string;
  images: string[];
  link: string;
  isExternal?: boolean;
}

export default function BannerPolaroid({
  title,
  stickerText,
  images,
  link,
  isExternal,
}: PolaroidProps) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <S.BannerWrapper
      href={link}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <S.Tape />
      <S.Polaroid>
        <S.PolaroidContents>
          <S.PolaroidImg src={images[imgIndex]} alt={title} />
          <S.PolaroidTitle>{title}</S.PolaroidTitle>
        </S.PolaroidContents>
        <S.Sticker>
          <S.StickerContent>{stickerText}</S.StickerContent>
        </S.Sticker>
      </S.Polaroid>
    </S.BannerWrapper>
  );
}