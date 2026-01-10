import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router";
// import App from "./App";
import LocalMarket from "./local-market/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <LocalMarket />
    </HashRouter>
  </StrictMode>,
);
