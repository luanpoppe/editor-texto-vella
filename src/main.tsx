// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalContext } from "./GlobalContext.tsx";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <GlobalContext>
    <Toaster />
    <App />
  </GlobalContext>
  // </StrictMode>
);
