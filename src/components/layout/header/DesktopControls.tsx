"use client";
import {
  Box,
} from "@mui/material";
import { SimpleThemeToggle } from "@/components/theme/ThemeToggle";
import LanguageSwitcher from "@/components/language/LanguageButton"
import HeaderUser from "../headerAdmin/HeaderUser";
import { TheaterComedy } from "@mui/icons-material";

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
      <HeaderUser />
    </Box>
  );
}
