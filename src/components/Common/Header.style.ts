import styled, { css } from "styled-components";
import { typography } from "../../styles/theme";

const setTypo = (key: keyof typeof typography) => {
  const typo = typography[key];
  return css`
    font-family: ${typo.fontFamily};
    font-weight: ${typo.fontWeight};
    font-size: ${typo.fontSize};
    line-height: ${typo.lineHeight};
  `;
};

export const Container = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.bg.offWhite};
`;

export const Left = styled.div<{ $show: boolean }>`
  width: ${({ $show }) => ($show ? "40px" : "8px")};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.fg.primary};
`;

export const Subtitle = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.fg.subtle};
  font-weight: 700;
`;

//
export const StatusBubble = styled.div`
  ${setTypo("decorationSm")};
  background-color: #e8eedf;
  color: #1a3c34;
  padding: 6px 14px;
  border-radius: 999px;

  font-size: 18px;
  white-space: nowrap;
  font-weight: 400;

  position: absolute;
  left: 65%;
  transform: translateX(-50%);

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &::after {
    content: "";
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 10px solid #e8eedf;
  }

  @media (min-width: 468px) or (max-height: 973px) {
    left: 250px;
    top: 30%;
  }
`;
