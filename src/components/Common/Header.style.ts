import styled from "styled-components";

export const Container = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #fff;
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
`;

export const Subtitle = styled.span`
  font-size: 14px;
  color: #9e9e9e;
  font-weight: 700;
`;
