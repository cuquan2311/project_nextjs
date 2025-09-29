"use client";

import React, { useState } from "react";
import { Box, useTheme, useMediaQuery, Paper, Toolbar, Typography, Divider } from "@mui/material";
import { useContactStore } from "@/store/contactStore";
import { ContactMessage } from "@/types/contactMessageType";
import MailToolbar from "@/features/components/mail/MailToolbar";
import SidebarMenuItem from "@/components/layout/sidebar/components/sidebarMenu/SidebarMenuItem";
import Sidebar from "@/features/components/mail/SidebarMail";
import MailList from "@/features/components/mail/MailList";
import MailDetail from "@/features/components/mail/MailDetail";



const mailListWidth = 360;

export default function MailManagerPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { messages } = useContactStore();
  const setMessages = useContactStore.setState;

  // State chính
  const [selectedCategory, setSelectedCategory] = useState("inbox");
  const [selectedMail, setSelectedMail] = useState<ContactMessage | null>(null);
  const [search, setSearch] = useState("");
  const [selectedMails, setSelectedMails] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Chuẩn hóa dữ liệu mail (map từ store ra)
  const mails = messages.map((msg) => ({
    id: msg.id,
    from: msg.email,
    subject: msg.subject,
    preview: msg.message.slice(0, 50) + "...",
    content: msg.message,
    type: msg.type || "inbox",
    subType: msg.subType as "feedback" | "bug" | "suggestion" | "share" | undefined,
    createdAt: msg.createdAt,
    read: msg.read || false,
  }));

  return (
    <Box sx={{ display: "flex", height: "90vh", bgcolor: "background.default" }}>
      {/* Sidebar */}
      <Paper
        elevation={1}
        sx={{
          width: 240,
          borderRight: `1px solid ${theme.palette.divider}`,
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
        }}
      >
        <Toolbar>
          <Typography variant="h6" fontWeight={600}>
            Mailbox
          </Typography>
        </Toolbar>
        <Divider />
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Paper>

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Toolbar */}
        <MailToolbar
          search={search}
          setSearch={setSearch}
          selectedMails={selectedMails}
          selectedCategory={selectedCategory}
          setAnchorEl={setAnchorEl}
          anchorEl={anchorEl}
          setMessages={setMessages}
          setSelectedMails={setSelectedMails}
          setSelectedMail={setSelectedMail}
        />

        {/* Content */}
        <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <MailList
            mails={messages}
            selectedMail={selectedMail}
            setSelectedMail={setSelectedMail}
            selectedMails={selectedMails}
            setSelectedMails={setSelectedMails}
            selectedCategory={selectedCategory}
            search={search}
            setMessages={setMessages}
          />
          <MailDetail
            selectedMail={selectedMail}
            isMobile={isMobile}
            setSelectedMail={setSelectedMail}
            setMessages={setMessages}
          />
        </Box>
      </Box>
    </Box>
  );
}
