"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  Paper,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import { useContactStore } from "@/store/contactStore";
import { ContactMessage } from "@/types/contactMessageType";
import MailToolbar from "@/features/components/mail/MailToolbar";
import Sidebar from "@/features/components/mail/SidebarMail";
import MailList from "@/features/components/mail/MailList";
import MailDetail from "@/features/components/mail/MailDetail";

const MailManagerPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ✅ Lấy đúng từ Zustand store
  const { messages, setMessages } = useContactStore();

  // State nội bộ
  const [selectedCategory, setSelectedCategory] = useState("inbox");
  const [selectedMail, setSelectedMail] = useState<ContactMessage | null>(null);
  const [search, setSearch] = useState("");
  const [selectedMails, setSelectedMails] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // ✅ Chuẩn hóa dữ liệu mail
  const mails = useMemo(
    () =>
      messages.map((msg) => ({
        id: msg.id,
        from: msg.email,
        subject: msg.subject,
        preview: msg.message.slice(0, 50) + "...",
        content: msg.message,
        type: msg.type || "inbox",
        subType: msg.subType as
          | "feedback"
          | "bug"
          | "suggestion"
          | "share"
          | undefined,
        createdAt: msg.createdAt,
        read: msg.read || false,
      })),
    [messages]
  );

  // ✅ Lọc mail theo category + search
  const filteredMails = useMemo(() => {
    return mails.filter(
      (mail) => 
        mail.type === selectedCategory &&
        ((mail.subject ?? "Không có tiêu đề").toLowerCase().includes(search.toLowerCase()) ||
          mail.from.toLowerCase().includes(search.toLowerCase()))
    );
  }, [mails, selectedCategory, search]);

  return (
    <Box sx={{ display: "flex", height: "90vh", bgcolor: "background.default" }}>
      {/* SIDEBAR */}
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
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Paper>

      {/* MAIN CONTENT */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* TOOLBAR */}
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
          messages={messages}
        />

        {/* NỘI DUNG */}
        <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {!isMobile ? (
            <>
              <MailList
                mails={filteredMails}
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
            </>
          ) : selectedMail ? (
            <MailDetail
              selectedMail={selectedMail}
              isMobile={isMobile}
              setSelectedMail={setSelectedMail}
              setMessages={setMessages}
            />
          ) : (
            <MailList
              mails={filteredMails}
              selectedMail={selectedMail}
              setSelectedMail={setSelectedMail}
              selectedMails={selectedMails}
              setSelectedMails={setSelectedMails}
              selectedCategory={selectedCategory}
              search={search}
              setMessages={setMessages}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MailManagerPage;
