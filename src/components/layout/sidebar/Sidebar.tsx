"use client";

import { Drawer, Divider, Box } from "@mui/material";
import SidebarMenu from "./components/SidebarMenu";
import SidebarHeader from "./components/SidebarHeader";
import SidebarSection from "./components/SidebarSection";

const drawerWidth = 240;
const collapsedWidth = 64;

export default function Sidebar({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: "width 0.3s ease",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflowY: "auto",
          whiteSpace: "nowrap",
          top: 0,
          border: "none",
          boxShadow: "none",

          "&::-webkit-scrollbar": {
            width: 6,
            background: "transparent"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0)",
            borderRadius: "3px",
            transition: "background-color 0.3s"
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.3)"
          }
        },
      }}
    >
      <SidebarHeader open={open} toggle={toggle} />
      <Divider />
      <SidebarMenu open={open} />
      <Divider />
      <SidebarSection open={open} />
    </Drawer>

  );
}
