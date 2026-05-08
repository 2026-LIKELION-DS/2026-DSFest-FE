import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as C from "./styles/CommonStyle";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

import pcBackground from "./assets/responsive/PC_background.svg";
import pcBubble from "./assets/responsive/PC_background_bubble.svg";

function preloadImage(href: string) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = href;

  document.head.appendChild(link);
}

preloadImage(pcBackground);
preloadImage(pcBubble);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <C.Page>
        <C.Phone data-app-container>
          <App />
        </C.Phone>
      </C.Page>
    </ThemeProvider>
  </StrictMode>,
);
