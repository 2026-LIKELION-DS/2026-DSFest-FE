import styled from "styled-components";
import bubble from "../assets/home/Home_background_bubble.svg"
import { theme } from '../styles/theme';

export const Wapper= styled.div`
    width: 100%;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
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

export const LinkBox= styled.div`
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