import styled from "styled-components";
import background from "../assets/responsive/PC_background.svg";
import bubble from "../assets/responsive/PC_background_bubble.svg";

export const Page = styled.div`
  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    width: 100vw;
    height: 100dvh;
    box-sizing: border-box;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    background-image: url(${background});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-height: 874px) {
      position: relative;
    }
  }
`;

export const Phone = styled.div`
  width: 100%;
  height: 100dvh;

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  z-index: 2;

  &::-webkit-scrollbar {
    display: none;
  }

  background-color: #fffefb;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    width: 402px;

    @media (min-height: 874px) {
      height: 874px;
      border: 12px solid #f5f7ed;
      border-radius: 24px;
      box-shadow: 0 0 15px 0 rgba(118, 156, 117, 0.4);
    }
  }
`;
