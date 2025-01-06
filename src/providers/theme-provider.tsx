import React, { FC, ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ThemeProviderProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#219D80",
    },
    secondary: {
      main: "#EDF7F5",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const CustomThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
