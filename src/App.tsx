import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouting } from "@/routes";
import { useSettings, PathnameProvider } from "@/providers";
import { CookiesProvider } from "react-cookie";
import ThemeProvider from "./providers/theme-provider";

const { BASE_URL } = import.meta.env;

const App = () => {
  const { settings } = useSettings();

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add(settings.themeMode);
  }, [settings]);

  return (
    <BrowserRouter basename={BASE_URL}>
      <CookiesProvider>
        <PathnameProvider>
          <ThemeProvider>
            <div className="max-w-screen overflow-hidden">
              <AppRouting />
            </div>
          </ThemeProvider>
        </PathnameProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
};

export { App };
