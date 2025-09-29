import { createTheme } from "@mui/material";

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#E6F7E7",
      main: "#00A76F",
      dark: "#007867",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#C684FF",
      main: "#8E33FF",
      dark: "#5119B7",
      contrastText: "#ffffff",
    },
    info: {
      light: "#61F3F3",
      main: "#00B8D9",
      dark: "#006C9C",
      contrastText: "#ffffff",
    },
    success: {
      light: "#77ED8B",
      main: "#22C55E",
      dark: "#118D57",
      contrastText: "#ffffff",
    },
    warning: {
      light: "#FFD666",
      main: "#FFAB00",
      dark: "#B76E00",
      contrastText: "#111827",
    },
    error: {
      light: "#FFAC82",
      main: "#FF5630",
      dark: "#B71D18",
      contrastText: "#ffffff",
    },
    grey: {
      50: "#FCFDFD",
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#1C252E",
      900: "#141A21",
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#141A21",
      secondary: "#637381",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "8px 16px",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#5BE49B",
      main: "#00A76F",
      dark: "#007867",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#C684FF",
      main: "#8E33FF",
      dark: "#5119B7",
      contrastText: "#ffffff",
    },
    error: {
      light: "#FFD666",
      main: "#FFAB00",
      dark: "#B76E00",
      contrastText: "#111827",
    },
    grey: {
      50: "#FCFDFD",
      100: "#F9FAFB",
      800: "#1C252E",
      900: "#141A21",
    },
    background: {
      default: "#141A21", // grey-900
      paper: "#1C252E", // grey-800
    },
    text: {
      primary: "#F9FAFB",
      secondary: "#919EAB",
    },
  },
  components: {
    ...lightTheme.components,
  },
});
