// 여기에 폰트 설정하시긔

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'OwnglyphSeaBreeze';
    src: url('/fonts/온글잎 바닷바람.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  html, body {
    margin: 0;
    background-color: #fff;
    overflow-x: hidden;

    min-width: 100vw;
    min-height: 100dvh;

    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }

    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font: inherit;
    border: none;
    background: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
