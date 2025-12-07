import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";

// import Tutorial from "./first-project/PedroCourse";
import Second from "./second-project/Second";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Second />
    </BrowserRouter>
  </StrictMode>
);
