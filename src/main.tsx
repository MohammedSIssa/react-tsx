import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.tsx'

import Tutorial from "./first-project/PedroCourse";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Tutorial />
  </StrictMode>
);
