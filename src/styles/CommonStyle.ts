import styled from "styled-components";

export const Page = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Phone = styled.div`
  width: 100%;
  max-width: 402px;
  height: 100dvh;

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  background-color: pink;
`;
