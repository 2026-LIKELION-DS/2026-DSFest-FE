import styled from "styled-components";

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
