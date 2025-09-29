"use client";

import React from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ArrowBack,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
  Report as ReportIcon,
  Delete as DeleteIcon,
  Email,
} from "@mui/icons-material";
import { ContactMessage } from "@/types/contactMessageType";

export default function MailDetail({
  selectedMail,
  isMobile,
  setSelectedMail,
  setMessages,
}: {
  selectedMail: ContactMessage | null;
  isMobile: boolean;
  setSelectedMail: (mail: ContactMessage | null) => void;
  setMessages: React.Dispatch<React.SetStateAction<{ messages: ContactMessage[] }>>;
}) {
  if (!selectedMail)
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
          color: "text.secondary",
        }}
      >
        <Email sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
        <Typography variant="h6">Chọn một mail để xem chi tiết</Typography>
      </Box>
    );
  const handleSpam = (id: string) => {
    setMessages((state: { messages: ContactMessage[] }) => ({
      messages: state.messages.map((m: ContactMessage) =>
        m.id === id ? { ...m, type: "spam", subType: undefined } : m
      ),
    }));
    setSelectedMail(null);
  };

  const handleDelete = (id: string) => {
    setMessages((state: { messages: ContactMessage[] }) => ({
      messages: state.messages.map((m: ContactMessage) =>
        m.id === id ? { ...m, type: "deleted", subType: undefined } : m
      ),
    }));
    setSelectedMail(null);
  };

  const handleDeleteForever = (id: string) => {
    setMessages((state: { messages: ContactMessage[] }) => ({
      messages: state.messages.filter((m: ContactMessage) => m.id !== id),
    }));
    setSelectedMail(null);
  };

  return (
    <Box
      sx={{
        flex: 1,
        p: 3,
        overflowY: "auto",
        display: isMobile && !selectedMail ? "none" : "block",
      }}
    >
      {isMobile && (
        <IconButton onClick={() => setSelectedMail(null)}>
          <ArrowBack />
        </IconButton>
      )}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        {selectedMail.subject || "(Không có tiêu đề)"}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Từ: {selectedMail.email} ·{" "}
        {new Date(selectedMail.createdAt).toLocaleString()}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography
        variant="body1"
        sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}
      >
        {selectedMail.message}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", gap: 1 }}>
        <Tooltip title="Trả lời">
          <IconButton color="primary">
            <ReplyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chuyển tiếp">
          <IconButton color="primary">
            <ForwardIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Spam">
          <IconButton color="warning" onClick={() => handleSpam(selectedMail.id)}>
            <ReportIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa">
          <IconButton color="error" onClick={() => handleDelete(selectedMail.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        {selectedMail.type === "deleted" && (
          <Tooltip title="Xóa vĩnh viễn">
            <IconButton
              color="error"
              onClick={() => handleDeleteForever(selectedMail.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
