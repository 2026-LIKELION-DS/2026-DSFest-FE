import styled from "styled-components";
import bubble from "../assets/home/Home_background_bubble.svg"
import { theme } from '../styles/theme';

export const Wrapper= styled.div`
    width: 100%;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`

export const BackgroundBubble= styled.div`
    flex: 1;
    width: 100%;
    background-image: url(${bubble});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
`

export const Background= styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    gap: 32px;
`

export const BannerBox= styled.div`

`

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
`
export const BannerSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

export const BannerViewport = styled.div`
    overflow: visible;
    width: 332px;
`;

export const BannerTrack = styled.div<{
    $currentIndex: number;
    $isTransition: boolean;
    }>`
    display: flex;
    gap:12px;
    transform: translateX(
    calc(-${({ $currentIndex }) => $currentIndex} * (334px + 12px)));

    transition: ${({ $isTransition }) =>
        $isTransition
        ? "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
        : "none"};
`;

export const BannerSlide = styled.div`
    flex: 0 0 332px;
    width: 332px;
    transition: transform 0.8s ease, opacity 0.8s ease;
`;

export const BannerDots = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

`;

export const BannerDot = styled.div<{ $active: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $active, theme }) =>
    $active ? theme.colors.bg.brandLight : theme.colors.fg.subtle};
`;

export const UrgentNoticeBox= styled.a`
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 24px;
    gap: 4px;
    border-radius: 22px;
    align-self: stretch;
    border: 1px solid ${({ theme }) => theme.colors.fg.critical};
    background-color: ${({ theme }) => theme.colors.bg.neutral};
`
export const UrgentNotice= styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 2px 0;
`

export const UrgentNoticeContent= styled.p`
    width: 242px;
    display: flex;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.colors.fg.critical};
    font-family: ${theme.typography.buttonMd.fontFamily};
    font-weight: ${theme.typography.buttonMd.fontWeight};
    font-size: ${theme.typography.buttonMd.fontSize};
`

export const UrgentNoticeIcon= styled.img`

`

export const SideClick= styled.img`

`

export const ContentBox= styled.div`

`

export const StudentCouncilBox= styled.div`

`

export const Footer= styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px 0;
    background-color: ${({ theme }) => theme.colors.bg.oliveLight};
`

export const AllLinkBox= styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 6px;
`

export const LinkBox= styled.a`
    display: flex;
    height: 32px;
    padding: 0 16px;
    gap: 12px;
    align-items: center;
    align-self: stretch;
`

export const LinkIcon=styled.img`
    width: 16px;
    height: 16px;
`

export const Link=styled.p`
    font-family: ${theme.typography.buttonSm.fontFamily};
    font-weight: ${theme.typography.buttonSm.fontWeight};
    font-size: ${theme.typography.buttonSm.fontSize};
    color: ${({ theme }) => theme.colors.fg.primary};
    margin: 0;
`


export const LikeLion= styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 24px;
    align-self: stretch;
`

export const LikeLionTitle= styled.p`
    font-family: ${theme.typography.h4.fontFamily};
    font-weight: ${theme.typography.h4.fontWeight};
    font-size: ${theme.typography.h4.fontSize};
    line-height:21px;
    color: ${({ theme }) => theme.colors.fg.primary};
    margin: 0;
`

export const LikeLionMemberBox= styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
`
export const LikeLionMemberLine= styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`
export const LikeLionMember= styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

export const LikeLionText = styled.p`
    font-family: ${theme.typography.bodySm.fontFamily};
    font-weight: ${theme.typography.bodySm.fontWeight};
    font-size: ${theme.typography.bodySm.fontSize};
    color: ${({ theme }) => theme.colors.fg.subtle};
    margin: 0;
    line-height: 18px;
`;

export const LikeLionPart = styled(LikeLionText)`
    width: 56px;
`

export const LikeLionSpecialLine = styled(LikeLionMemberLine)`
    gap: 8px;
`