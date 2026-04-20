import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as C from "./styles/CommonStyle";
import GlobalStyle from "./styles/GlobalStyle";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <C.Page>
      <C.Phone>
        <App />
      </C.Phone>
    </C.Page>
  </StrictMode>,
);
