import styled from "styled-components";
import { theme } from '../styles/theme';

export const OnBoardWrapper = styled.div`
    position: fixed;
    inset: 0;
    z-index: 9999;

    width: 100%;
    min-height: 100dvh;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 19.9px;
    
`;

export const OnBoardBlurArea = styled.div`
    position: absolute;
    width: 100%;
    max-width: 402px; 
    max-height: 874px;
    height: 100%;
    
    backdrop-filter: blur(5px);
        background: rgba(0, 0, 0, 0.5);
    z-index: -1;

    @media (min-height: 874px) {
      height: 854px;
      width: 382px;
      border-radius: 14px;
    }
`;

export const OnBoardImg = styled.img`
    width: 354px;
    height: 443px;
    border-radius:12px;
    background: #D9D9D9;
`

export const OnBoardBtnBox = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 354px;
    justify-content: space-between;
`

export const Btn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    width: 100%;
    padding: 0 24px;
    border-radius: var(--spacing-radius-rounded, 9999px);
    line-height: var(--line-height-t2, 21px);
    align-self: stretch;
`

export const Close = styled(Btn)`
    border: 0.5px solid var(--Stroke-subtle, #9E9E9E);
    background: var(--Bg-offwhite, #FFF);
    color: ${({ theme }) => theme.colors.fg.primary};
    font-family: ${theme.typography.buttonMd.fontFamily};
    font-weight: ${theme.typography.buttonMd.fontWeight};
    font-size: ${theme.typography.buttonMd.fontSize};
`

export const ShowMore = styled(Btn)`
    background: var(--brand, #0B4112);
    color: ${({ theme }) => theme.colors.fg.primaryInverted};
    font-family: ${theme.typography.buttonMd.fontFamily};
    font-weight: ${theme.typography.buttonMd.fontWeight};
    font-size: ${theme.typography.buttonMd.fontSize};
`