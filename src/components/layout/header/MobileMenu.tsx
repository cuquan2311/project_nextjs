"use client";
import {
  Box,
  IconButton,
  Drawer,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";
import { SimpleThemeToggle } from "@/components/theme/ThemeToggle";
import LanguageSwitcher from "@/components/language/LanguageButton";

export default function MobileMenu({
  open,
  toggleDrawer,
  linkStyle,
  t,
}: {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
  linkStyle: React.CSSProperties;
  t: (key: string) => string;
}) {
  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          top: "var(--template-frame-height, 90px)",
          width: "70%",
          justifySelf: "center",
        },
      }}
    >
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <MenuItem onClick={toggleDrawer(false)}>
          <Link href="/" style={linkStyle}>
            {t("home")}
          </Link>
        </MenuItem>
        <MenuItem onClick={toggleDrawer(false)}>
          <Link href="/features" style={linkStyle}>
            {t("features")}
          </Link>
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <SimpleThemeToggle />
          <LanguageSwitcher />
          <Link href="/admin" style={linkStyle}>
            <Button variant="outlined" size="small" fullWidth>
              {t("admin")}
            </Button>
          </Link>
        </MenuItem>
      </Box>
    </Drawer>
  );
}
