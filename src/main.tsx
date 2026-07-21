// src/main.tsx — React entry point. Mounts <App /> into #root.
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/app.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <App />
);