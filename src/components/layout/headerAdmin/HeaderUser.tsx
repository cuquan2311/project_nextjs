"use client";

import { useState } from "react";
import {
  Drawer,
  Box,
  Avatar,
  Typography,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  HelpOutline as HelpIcon,
  ContactSupport as ContactIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from "@mui/icons-material";
import Link from "next/link";
import LanguageSwitcher from "@/components/language/LanguageButton";
import { SimpleThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuthStore } from "@/store/useAuthStore";

export default function HeaderUser({ openSidebar }: { openSidebar: boolean }) {
  const {  user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  if (!user) {
    return (
      <Button variant="contained" sx={{ borderRadius: 2 }} href="/auth/login">
        Đăng nhập
      </Button>
    );
  }

  const handleToggle = () => setOpen(!open);

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, href: "/" },
    { text: "Quản lý dữ liệu", icon: <AdminPanelSettingsIcon />, href: "/admin" },
    { text: "Profile", icon: <PersonIcon />, href: "/profile" },
    { text: "Account Settings", icon: <SettingsIcon />, href: "/settings" },
  ];

  const bottomLinks = [
    { text: "Help", icon: <HelpIcon />, href: "/features" },
    { text: "Contact Support", icon: <ContactIcon />, href: "/contactSupport" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
        p: 2,
        display: "flex",
        justifyContent: openSidebar ? "flex-start" : "center",
        alignItems: "center",
      }}
    >
      {openSidebar ? (
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {user.username}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>

          <Button
            onClick={handleToggle}
            sx={{
              minWidth: "auto",
              ml: 1,
              p: 0.3,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {user.avatar ? (
              <Avatar
              src={user.avatar}
              sx={{
                width: 40,
                height: 40,
                border: "2px solid",
                borderColor: theme.palette.divider,
              }}
            />
            ): (
              <Avatar src="/broken-image.jpg" />
            )}
          </Button>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            onClick={handleToggle}
            sx={{
              minWidth: "auto",
              p: 0.3,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {user.avatar ? (
              <Avatar
              src={user.avatar}
              sx={{
                width: 40,
                height: 40,
                border: "2px solid",
                borderColor: theme.palette.divider,
              }}
            />
            ): (
              <Avatar src="/broken-image.jpg" />
            )}
          </Button>
        </Box>
      )}

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={handleToggle}
        PaperProps={{
          sx: {
            width: { xs: "80%", sm: "25%", md: "20%" },
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            bgcolor: theme.palette.background.paper,
            boxShadow: 6,
          },
        }}
      >
        {/* Top info */}
        <Box textAlign="center" mb={2}>
          {user.avatar ? (
            <Avatar
            src={user.avatar}
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mb: 2,
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
          ) : (
            <Avatar 
             src="/broken-image.jpg"
              sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mb: 2,
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
             />
          )}
          <Typography variant="h6" fontWeight={600}>
            {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {user.email}
          </Typography>

          <Box display="flex" justifyContent="center" gap={1}>
            <Paper
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                bgcolor: theme.palette.primary.light,
              }}
            >
              <Typography variant="caption" fontWeight={600}>
                5 Notifications
              </Typography>
            </Paper>
            <Paper
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                bgcolor: theme.palette.secondary.light,
              }}
            >
              <Typography variant="caption" fontWeight={600}>
                {(user.role).toUpperCase()}
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Language + Theme */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <LanguageSwitcher />
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: theme.palette.divider }}
          />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <SimpleThemeToggle />
          </Box>
        </Box>

        {/* Menu */}
        <Box flexGrow={1} overflow="hidden">
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={Link}
                href={item.href}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  transition: "all 0.3s",
                  "&:hover": { 
                    bgcolor: theme.palette.primary.light,
                    transform: "translateX(5px)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Bottom links */}
        <Box mb={2} display="flex" flexDirection="column" gap={1}>
          {bottomLinks.map((link) => (
            <Button
              key={link.text}
              component={Link}
              href={link.href}
              startIcon={link.icon}
              sx={{ textTransform: "none" }}
              size="small"
            >
              {link.text}
            </Button>
          ))}
        </Box>

        {/* Logout */}
        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={() => {
            logout();
            setOpen(false);
          }}
          fullWidth
          sx={{
            borderRadius: 2,
            py: 1.2,
            fontWeight: 600,
            transition: "all 0.3s",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            },
          }}
        >
          Logout
        </Button>
      </Drawer>
    </Box>
  );
}
