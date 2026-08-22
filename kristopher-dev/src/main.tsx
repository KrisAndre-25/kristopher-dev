import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./hooks/useLanguage";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/global.css";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
