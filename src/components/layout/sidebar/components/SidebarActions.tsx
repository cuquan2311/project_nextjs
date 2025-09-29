"use client";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { SimpleThemeToggle } from "@/components/theme/ThemeToggle";
import LanguageSwitcher from "@/components/language/LanguageButton";
import Link from "next/link";

interface SidebarActionsProps {
  open: boolean;
}

export default function SidebarActions({ open }: SidebarActionsProps) {
  return (
    <List>
      {/* Home */}
      <ListItem disablePadding sx={{ display: "block" }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40, // luôn cố định
                display: "flex",
                justifyContent: "center",
              }}
            >
              <HomeIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Home" />}
          </ListItemButton>
        </Link>
      </ListItem>

      {/* Theme */}
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
          <ListItemIcon
            sx={{
              minWidth: 40,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SimpleThemeToggle />
          </ListItemIcon>
          {open && <ListItemText primary="Toggle Mode" />}
        </ListItemButton>
      </ListItem>

      {/* Language */}
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
          <ListItemIcon
            sx={{
              minWidth: 40,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LanguageSwitcher />
          </ListItemIcon>
          {open && <ListItemText primary="Language" />}
        </ListItemButton>
      </ListItem>
    </List>
  );
}
