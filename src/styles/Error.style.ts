import styled, { css } from "styled-components";
import { typography } from "./theme";

const setTypo = (key: keyof typeof typography) => {
  const typo = typography[key];
  return css`
    font-family: ${typo.fontFamily};
    font-weight: ${typo.fontWeight};
    font-size: ${typo.fontSize};
    line-height: ${typo.lineHeight};
  `;
};

export const ErrorPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bg.neutral};
  position: relative;
  overflow: hidden;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    width: 402px;
    margin: 0 auto;

    @media (min-height: 874px) {
      height: 874px;
      border: 12px solid ${({ theme }) => theme.colors.olive};
      border-radius: 24px;
    }
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 10;
  padding: 0 20px;
`;

export const Bubble = styled.img<{ $index: number }>`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  opacity: 0.2;
  filter: blur(3px);

  ${({ $index }) => {
    switch ($index) {
      case 0:
        return css`
          top: 27px;
          right: -10px;
          width: 133px;
          transform: rotate(180deg);
        `;
      case 1:
        return css`
          top: 204px;
          left: -30px;
          width: 106px;
        `;
      case 2:
        return css`
          top: 364px;
          right: -15px;
          width: 89px;
        `;
      case 3:
        return css`
          top: 59%;
          right: 130px;
          width: 61px;
          transform: rotate(90deg);
        `;
      case 4:
        return css`
          bottom: 23%;
          right: 15px;
          width: 21px;
        `;
      case 5:
        return css`
          bottom: 16%;
          right: 30px;
          width: 57px;
        `;
      case 6:
        return css`
          bottom: 5%;
          left: -5px;
          width: 110px;
          transform: rotate(180deg);
        `;
      default:
        return css`
          display: none;
        `;
    }
  }}
`;

export const ErrorTitle = styled.div`
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.bg.brandLight};
`;

export const ErrorCode = styled.div`
  padding: 10px 0;
  font-family: "Pretendard";
  font-size: 60px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.bg.brandLight};
`;

export const ErrorMessage = styled.p`
  ${setTypo("bodyMd")};
  color: ${({ theme }) => theme.colors.fg.subtle};
  margin-bottom: 40px;
  font-weight: 500;
`;

export const HomeButton = styled.button`
  ${setTypo("buttonMd")};
  width: 280px;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.bg.brand};
  color: ${({ theme }) => theme.colors.fg.primaryInverted};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  z-index: 11;
  transition: opacity 0.2s;

  &:active {
    opacity: 0.8;
  }
`;
