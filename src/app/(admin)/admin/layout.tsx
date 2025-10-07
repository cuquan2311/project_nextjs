"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import SidebarToggle from "@/components/layout/sidebar/SidebarToggle";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [open, setOpen] = useState(false); // sidebar open state

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <SidebarToggle open={open} toggle={() => setOpen(!open)} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 0,
          px: 2,
          overflowX: "hidden",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        {/* <HeaderAdmin /> */}

        {/* Page content */}
        <Box >{children}</Box>
      </Box>
    </Box>
  );
}
