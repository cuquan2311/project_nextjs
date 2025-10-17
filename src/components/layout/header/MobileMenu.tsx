"use client";
import {
  Box,
  IconButton,
  Drawer,
  MenuItem,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";
import { SimpleThemeToggle } from "@/components/theme/ThemeToggle";
import LanguageSwitcher from "@/components/language/LanguageButton";
import HeaderUser from "../headerAdmin/HeaderUser";
import { useTranslations } from "next-intl";

export default function MobileMenu({
  open,
  toggleDrawer,
  linkStyle,
}: {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
  linkStyle: React.CSSProperties;
}) {
  const t = useTranslations("mobileMenu");

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          top: "var(--template-frame-height, 90px)",
          width: { xs: "95%", sm: "70%" },
          borderRadius: "0 0 16px 16px",
          mx: "auto",
          boxShadow: 6,
          overflow: "hidden",
        },
      }}
    >
      <Box
        className="mobile-menu"
        sx={{
          p: 2,
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Header top */}
        <Box
          className="mobile-menu__top"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            className="mobile-menu__title"
            sx={{ fontWeight: 600 }}
          >
            {t("menu")}
          </Typography>

          <IconButton
            className="mobile-menu__close"
            onClick={toggleDrawer(false)}
            sx={{
              bgcolor: "action.hover",
              "&:hover": { bgcolor: "action.selected" },
              borderRadius: "50%",
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Menu links */}
        <Box
          className="mobile-menu__links"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            px: 1,
          }}
        >
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
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* --- BOTTOM ACTIONS + HEADERUSER --- */}
        <Box
          className="mobile-menu__bottom"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            width: "100%",
            flexWrap: "nowrap",
            overflow: "hidden",
            pt: 1,
          }}
        >
          {/* Avatar User (gọn lại cho vừa hàng) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& .MuiAvatar-root": {
                width: 36,
                height: 36,
              },
            }}
          >
            <HeaderUser openSidebar={false} />
          </Box>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
            }}
          >
            <SimpleThemeToggle />
            <LanguageSwitcher />
            <Link href="/admin" style={linkStyle}>
              <Button variant="outlined" size="small">
                {t("admin")}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
