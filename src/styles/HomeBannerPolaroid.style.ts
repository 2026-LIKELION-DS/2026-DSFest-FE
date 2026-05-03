import styled from "styled-components";
import { theme } from '../styles/theme';

export const BannerWrapper= styled.a`
    display: flex;
    position: relative;
    align-items: center;
    margin-top: 24px;
`

export const Tape = styled.div`
    width: 100px;
    height: 28px;
    transform: rotate(4.264deg);
    background-color: ${({ theme }) => theme.colors.yellow[100]};

    position: absolute;
    left: 113.098px;
    top: -17.679px;

    z-index: 2;

    background-blend-mode: multiply;
`

export const Polaroid = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1;
    padding: 24px 16px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.bg.offWhite};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.20);
    position: relative;
    box-sizing: border-box;
`

export const PolaroidContents = styled.div`
    display: flex;
    flex-direction: column;
    gap:12px;
`

export const PolaroidImg = styled.img`
    width: 300px;
    height: 180px;
    border: 1px solid ${({ theme }) => theme.colors.stroke.oliveLight};
    border-radius: 4px;
    background-color: lightgray;
`

export const PolaroidTitle = styled.p`
    font-family: ${theme.typography.h1.fontFamily};
    font-weight: ${theme.typography.h1.fontWeight};
    font-size: ${theme.typography.h1.fontSize};
    line-height: 36px;
    color: ${({ theme }) => theme.colors.grey.black};
    margin: 0;
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
`

export const Sticker = styled.div`
    display: flex;
    align-items: center;
    transform: rotate(-6.609deg);
    padding: 6px 12px;

    position: absolute;
    left: 9px;
    bottom: 66px;

    border-radius: 2px;
    border: 0.5px solid ${({ theme }) => theme.colors.bg.brand};
    background: ${({ theme }) => theme.colors.bg.oliveLight };
`

export const StickerContent = styled.div`
    color: ${({ theme }) => theme.colors.bg.brand};
    font-family: ${theme.typography.decorationMd.fontFamily};
    font-weight: ${theme.typography.decorationMd.fontWeight};
    font-size: ${theme.typography.decorationMd.fontSize};
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
`