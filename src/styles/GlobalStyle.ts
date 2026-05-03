// 여기에 폰트 설정하시긔

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

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
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }

    #root {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui,
      sans-serif;
      -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision
  }

  * {
    box-sizing: border-box;
    font-family: inherit;
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
