"use client";

import React from "react";
import {
  Box,
  List,
  ListItemButton,
  Checkbox,
  Typography,
  Badge,
  Fade,
} from "@mui/material";
import { Inbox as InboxIcon } from "@mui/icons-material";
import { ContactMessage } from "@/types/contactMessageType";

export default function MailList({
  mails,
  selectedMail,
  setSelectedMail,
  selectedMails,
  setSelectedMails,
  selectedCategory,
  search,
  setMessages,
}: {
  mails: ContactMessage[];
  selectedMail: ContactMessage | null;
  setSelectedMail: (mail: ContactMessage | null) => void;
  selectedMails: string[];
  setSelectedMails: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategory: string;
  search: string;
  setMessages: (messages: ContactMessage[]) => void;
}) {
  // lọc mail theo category và search
  const filteredMails = mails
    .filter((mail) => {
      if (selectedCategory === "all") return true;
      if (
        ["feedback", "bug", "suggestion", "share"].includes(selectedCategory)
      ) {
        return mail.subType === selectedCategory && mail.type === "inbox";
      }
      return mail.type === selectedCategory;
    })
    .filter(
      (mail) =>
        (mail.subject ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (mail.email ?? "").toLowerCase().includes(search.toLowerCase())
    );

  // khi chọn mail để đọc
  const handleSelectMail = (mail: ContactMessage) => {
    setSelectedMail(mail);

    const updatedMessages = mails.map((m) =>
      m.id === mail.id ? { ...m, read: true } : m
    );

    setMessages(updatedMessages);
  };

  const handleToggleSelectMail = (id: string) => {
    setSelectedMails((prev: string[]) =>
      prev.includes(id)
        ? prev.filter((mailId: string) => mailId !== id)
        : [...prev, id]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    return isToday
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString();
  };

  return (
    <Box
      sx={{
        width: { xs: selectedMail ? 0 : "100%", sm: 360 },
        borderRight: { sm: 1, borderColor: "divider" },
        overflowY: "auto",
        display: { xs: selectedMail ? "none" : "block", sm: "block" },
      }}
    >
      {filteredMails.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 10, color: "text.secondary" }}>
          <InboxIcon sx={{ fontSize: 50, mb: 1, opacity: 0.5 }} />
          <Typography>Không có tin nhắn</Typography>
        </Box>
      ) : (
        <Fade in timeout={300}>
          <List>
            {filteredMails.map((mail) => (
              <ListItemButton
                key={mail.id}
                onClick={() => handleSelectMail(mail)}
                selected={selectedMail?.id === mail.id}
                sx={{
                  borderRadius: 2,
                  m: 0.5,
                  "&.Mui-selected": { bgcolor: "action.selected" },
                }}
              >
                <Checkbox
                  checked={selectedMails.includes(mail.id)}
                  onChange={() => handleToggleSelectMail(mail.id)}
                  onClick={(e) => e.stopPropagation()}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Box sx={{ flex: 1, overflow: "hidden" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={!mail.read ? 600 : 400}
                      noWrap
                    >
                      {mail.email}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(mail.createdAt)}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    fontWeight={!mail.read ? 600 : 400}
                    noWrap
                  >
                    {mail.subject || "(Không có tiêu đề)"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {mail.preview}
                  </Typography>
                </Box>
                {!mail.read && <Badge color="primary" variant="dot" />}
              </ListItemButton>
            ))}
          </List>
        </Fade>
      )}
    </Box>
  );
}
