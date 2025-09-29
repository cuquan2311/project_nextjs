"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslations } from "next-intl";
import Logo from "./header/Logo";
import DesktopNav from "./header/DesktopNav";
import DesktopControls from "./header/DesktopControls";
import MobileMenu from "./header/MobileMenu";
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: "15px",
  backdropFilter: "blur(24px)",
  border: "1px solid",
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function Header() {
  const t = useTranslations("header");
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Logo />
          <DesktopNav linkStyle={linkStyle} t={t} />
          <DesktopControls />

          {/* Mobile menu toggle */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </Container>

      {/* Mobile menu */}
      <MobileMenu
        open={open}
        toggleDrawer={toggleDrawer}
        linkStyle={linkStyle}
        t={t}
      />
    </AppBar>
  );
}
