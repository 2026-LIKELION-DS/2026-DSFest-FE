import styled from "styled-components";

export const Page = styled.div`
  @media (min-width: 768px), (hover: hover) and (pointer: fine){
    width: 100vw;
    height: 100dvh;
    box-sizing: border-box;
    background-image: url();
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

  &::-webkit-scrollbar {
    display: none;
  }

  background-color: pink;

  @media (min-width: 768px), (hover: hover) and (pointer: fine) {
    width: 402px;

    @media (min-height: 874px) {
      height: 874px;
      border: 12px solid aqua;
      border-radius: 24px;
      box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.25);
    }
  }
`;
