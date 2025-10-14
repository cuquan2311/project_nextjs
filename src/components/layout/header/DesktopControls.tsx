"use client";
import {
  Box,
} from "@mui/material";
import { SimpleThemeToggle } from "@/components/theme/ThemeToggle";
import LanguageSwitcher from "@/components/language/LanguageButton"
import { TheaterComedy } from "@mui/icons-material";
import HeaderUser from "../headerAdmin/HeaderUser";

export default function DesktopControls() {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        gap: 1,
        alignItems: "center",
      }}
    >
      <SimpleThemeToggle />
      <LanguageSwitcher />
      <HeaderUser    />
    </Box>
  );
}
