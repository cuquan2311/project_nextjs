"use client";

import {
  Box,
  Typography,
  Paper,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import HeaderUser from "./headerAdmin/HeaderUser";
import { SimpleThemeToggle } from "@/components/theme/ThemeToggle";
import LanguageSwitcher from "@/components/language/LanguageButton";
import NotificationMenu from "./NotificationMenu";

export default function HeaderAdmin() {


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1,
        position: "sticky",
        top: 0,
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Premium Dashboard
      </Typography>

      <Paper
        component="form"
        sx={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          width: { xs: 150, sm: 250, md: 350 },
          px: 1,
          py: 0.5,
          borderRadius: 3,
        }}
        elevation={0}
      >
        <SearchIcon sx={{ mr: 1 }} />
        <InputBase placeholder="Search..." sx={{ flex: 1, fontSize: 14 }} />
      </Paper>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <SimpleThemeToggle />
        <LanguageSwitcher />
        <NotificationMenu />
        <HeaderUser />
      </Box>
    </Box>
  );
}
