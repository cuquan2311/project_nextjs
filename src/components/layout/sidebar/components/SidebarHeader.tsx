"use client";
import { Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function SidebarHeader({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) {
  return (
    <Toolbar sx={{ justifyContent: open ? "flex-end" : "center" }}>
      <IconButton onClick={toggle}>
        <MenuIcon />
      </IconButton>
    </Toolbar>
  );
}
