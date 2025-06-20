import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/App.css";
import App from "@/App.tsx";
import { ThemeProvider } from "@/components/ui/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="recipe-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
