"use client";

import React from "react";
import { List, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, useTheme } from "@mui/material";
import {
  Inbox as InboxIcon,
  Delete as DeleteIcon,
  Report as ReportIcon,
  AllInbox as AllIcon,
  BugReport as BugIcon,
  Feedback as FeedbackIcon,
  Lightbulb as SuggestionIcon,
  Share as ShareIcon,
} from "@mui/icons-material";

export default function Sidebar({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}) {
  const theme = useTheme();

  return (
    <List dense>
      {[
        { category: "all", icon: <AllIcon />, label: "Tất cả" },
        { category: "inbox", icon: <InboxIcon />, label: "Hộp thư đến" },
        { category: "deleted", icon: <DeleteIcon />, label: "Thùng rác" },
        { category: "spam", icon: <ReportIcon />, label: "Spam" },
      ].map(({ category, icon, label }) => (
        <ListItemButton
          key={category}
          onClick={() => setSelectedCategory(category)}
          selected={selectedCategory === category}
          sx={{
            borderRadius: 2,
            mx: 1,
            my: 0.5,
            "&.Mui-selected": { bgcolor: theme.palette.action.selected, fontWeight: 600 },
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      ))}
      <Divider sx={{ my: 1 }} />
      <Typography variant="caption" sx={{ pl: 2 }}>
        Phân loại
      </Typography>
      {[
        { category: "feedback", icon: <FeedbackIcon />, label: "Phản hồi" },
        { category: "bug", icon: <BugIcon />, label: "Báo lỗi" },
        { category: "suggestion", icon: <SuggestionIcon />, label: "Góp ý" },
        { category: "share", icon: <ShareIcon />, label: "Chia sẻ" },
      ].map(({ category, icon, label }) => (
        <ListItemButton
          key={category}
          onClick={() => setSelectedCategory(category)}
          selected={selectedCategory === category}
          sx={{
            pl: 4,
            borderRadius: 2,
            mx: 1,
            my: 0.5,
            "&.Mui-selected": { bgcolor: theme.palette.action.selected, fontWeight: 600 },
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      ))}
    </List>
  );
}
