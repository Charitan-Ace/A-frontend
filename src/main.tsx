import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { setupAxios } from "./api/axios.ts";
import axios from "axios";
import { ProvidersWrapper } from "@/providers";
import { App } from "@/App.tsx";

setupAxios(axios);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProvidersWrapper>
      <App />
    </ProvidersWrapper>
  </StrictMode>,
);
