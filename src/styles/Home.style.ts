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
    position: relative;

    overflow-y: auto;
  overflow-x: hidden;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

    transform: translateZ(0);
    will-change: transform;
`

export const BannerBox= styled.div`
    isolation: isolate; 
    contain: layout;
`

export const UrgentNoticeBox= styled.a`
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 24px;
    gap: 4px;
    border-radius: 22px;
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
    width: 20px;
    height: 20px;
`

export const SideClick= styled.img`
    width: 16px;
    height: 16px;
`

export const ContentBox= styled.div`
    display: flex;
    position: relative;
    width: 354px;
    height: 500px;
`

export const PolaroidBtn= styled.a`
    display: flex;
    padding: 12px 12px 24px 12px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bg.offWhite};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.20);
    position: absolute;
`
export const PolaroidBtnImg= styled.img`
    
`

export const ArtistBtn = styled(PolaroidBtn)`
    top:20px;
    left: 12.59px;
    z-index: 1;
`

export const FoodtruckBtn = styled(PolaroidBtn)`
    top:161.68px;
    right: 12.59px;
    z-index: 4;
`

export const BoothBtn = styled(PolaroidBtn)`
    bottom:20px;
    left:32.32px;
    z-index: 5;
`

export const NameTag = styled.a`
    display: flex;
    padding: 6px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0.5px solid ${({ theme }) => theme.colors.bg.brand};
    background-color: ${({ theme }) => theme.colors.bg.olive};
    position: absolute;
`

export const NameTagTitle = styled.p`
    color: ${({ theme }) => theme.colors.bg.brand};
    font-family: ${theme.typography.h2.fontFamily};
    font-weight: ${theme.typography.h2.fontWeight};
    font-size: ${theme.typography.h2.fontSize};
    line-height: 30px;
    margin: 0;
`

export const NameTagTitleEng = styled.p`
    color: ${({ theme }) => theme.colors.bg.brand};
    font-family: ${theme.typography.bodyMd.fontFamily};
    font-weight: ${theme.typography.bodyMd.fontWeight};
    font-size: ${theme.typography.bodyMd.fontSize};
    line-height: 21px;
    margin: 0;
`

export const ArtistNameTag = styled(NameTag)`
    left: -2.7px;
    top: 14.43px;
    z-index: 3;
`

export const FoodtruckNameTag = styled(NameTag)`
    top:166.3px;
    right: -9.51px;
    z-index: 5;
`

export const BoothNameTag = styled(NameTag)`
    bottom:145.31px;
    left: 13.32px;
    z-index: 6;
`

export const BgImg1 = styled.img`
    position: absolute;
    top:7.9px;
    left: 25.49px;
    z-index: 0;
`

export const BgImg2 = styled.img`
    position: absolute;
    top: 182.26px;
    right: 0.16px;
    z-index: 0;
`

export const BgImg3 = styled.img`
    position: absolute;
    left: 2.58px;
    bottom: 4.83px;
    z-index: 0;
`

export const Camera = styled.img`
    position: absolute;
    top:86.09px;
    left: 75.4px;
    z-index: 3;
    cursor: pointer;
`

export const FlowerBtn1 = styled.img`
    position: absolute;
    left: 159.27px;
    bottom: 40.86px;
    cursor: pointer;
    z-index: 7;
`

export const FlowerBtn2 = styled.img`
    position: absolute;
    left: 65.47px;
    bottom: 188.84px;
    cursor: pointer;
    z-index: 7;
`

export const Icecream1 = styled.img`
    position: absolute;
    right: -9.51px;
    bottom: 113.88px;
    z-index: 4;
    cursor: pointer;
`

export const Icecream2 = styled.img`
    position: absolute;
    right: -6.74px;
    bottom: 169.26px;
    z-index: 4;
    cursor: pointer;
`

export const Churros= styled.img`
    position: absolute;
    bottom: 85.08px;
    right: 70.37px;
    z-index: 4;
    cursor: pointer;
`

export const Keyring = styled.img`
    position: absolute;
    left: -24.19px;
    bottom: 24.3px;
    z-index: 6;
    cursor: pointer;
`

export const Bracelet = styled.img`
    position: absolute;
    bottom: 4.8px;
    left: 129.27px;
    z-index: 6;
    cursor: pointer;
`


export const StudentCouncilBox= styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

export const StudentBtn= styled.a`
    display:flex;
    height: 44px;
    padding: 2px 24px;
    align-items: center;
    gap: 12px;
    border-radius: 22px;
    background-color: ${({ theme }) => theme.colors.bg.brand};
`

export const BtnIcon= styled.img`
    width: 24px;
    height: 24px;
`

export const BtnTitle= styled.p`
    font-family: ${theme.typography.buttonMd.fontFamily};
    font-weight: ${theme.typography.buttonMd.fontWeight};
    font-size: ${theme.typography.buttonMd.fontSize};
    color: ${({ theme }) => theme.colors.fg.primaryInverted};
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

export const Toast = styled.div`
position: fixed;
left: 50%;
bottom: 90px;
transform: translateX(-50%);
padding: 12px 18px;
border-radius: 999px;
background: rgba(0, 0, 0, 0.75);
color: white;
font-size: 14px;
z-index: 9999;
`