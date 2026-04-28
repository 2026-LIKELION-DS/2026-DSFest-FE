import "./index.css";import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as C from "./styles/CommonStyle";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <C.Page>
        <C.Phone>
          <App />
        </C.Phone>
      </C.Page>
    </ThemeProvider>
  </StrictMode>,
);
