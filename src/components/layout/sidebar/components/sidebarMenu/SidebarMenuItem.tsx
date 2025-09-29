import React from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { alpha } from "@mui/material/styles";

export default function SidebarMenuItem({
  text,
  icon,
  href,
  open,
  isActive,
}: {
  text: string;
  icon: React.ReactNode;
  href: string;
  open: boolean;
  isActive: boolean;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={(theme) => ({
            minHeight: 46,
            justifyContent: open ? "initial" : "center",
            px: 2,
            borderRadius: 2,
            bgcolor: isActive ? alpha(theme.palette.primary.main, 0.12) : "transparent",
            color: isActive ? theme.palette.primary.main : "inherit",
            "&:hover": {
              bgcolor: isActive
                ? alpha(theme.palette.primary.main, 0.14)
                : alpha(theme.palette.primary.main, 0.06),
            },
          })}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : "auto",
              justifyContent: "center",
              color: isActive ? "inherit" : "inherit",
            }}
          >
            {icon}
          </ListItemIcon>
          {open && <ListItemText primary={text} />}
        </ListItemButton>
      </ListItem>
    </Link>
  );
}
