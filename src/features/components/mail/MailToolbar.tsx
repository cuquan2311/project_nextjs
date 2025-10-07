import React from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { Delete, Label, Report } from "@mui/icons-material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { ContactMessage } from "@/types/contactMessageType";

interface MailToolbarProps {
  search: string;
  setSearch: (val: string) => void;
  selectedMails: string[];
  selectedCategory: string;
  setAnchorEl: (el: HTMLElement | null) => void;
  anchorEl: HTMLElement | null;
  setMessages: (messages: ContactMessage[]) => void;
  setSelectedMails: (ids: string[]) => void;
  setSelectedMail: (mail: ContactMessage | null) => void;
  messages: ContactMessage[];
}

export default function MailToolbar({
  search,
  setSearch,
  selectedMails,
  selectedCategory,
  setAnchorEl,
  anchorEl,
  setMessages,
  setSelectedMails,
  setSelectedMail,
  messages,
}: MailToolbarProps) {
  /* ✅ Chuyển mail thành spam */
  const handleSpam = (ids: string[]) => {
    const updated = messages.map((m) =>
      ids.includes(m.id)
        ? { ...m, type: "spam" as ContactMessage["type"], subType: undefined }
        : m
    );
    setMessages(updated);
    setSelectedMails([]);
    setSelectedMail(null);
  };

  /* ✅ Chuyển mail vào thùng rác */
  const handleDelete = (ids: string[]) => {
    const updated = messages.map((m) =>
      ids.includes(m.id)
        ? {
            ...m,
            type: "deleted" as ContactMessage["type"],
            subType: undefined,
          }
        : m
    );
    setMessages(updated);
    setSelectedMails([]);
    setSelectedMail(null);
  };

  /* ✅ Xóa vĩnh viễn */
  const handleDeleteForever = (ids: string[]) => {
    const updated = messages.filter((m) => !ids.includes(m.id));
    setMessages(updated);
    setSelectedMails([]);
    setSelectedMail(null);
  };

  /* ✅ Gán loại (feedback, bug, suggestion, share) */
  const handleChangeSubType = (
    subType: "feedback" | "bug" | "suggestion" | "share"
  ) => {
    const updated = messages.map((m) =>
      selectedMails.includes(m.id)
        ? { ...m, subType, type: "inbox" as ContactMessage["type"] }
        : m
    );
    setMessages(updated);
    setAnchorEl(null);
    setSelectedMails([]);
  };

  return (
    <Toolbar
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        px: 2,
        gap: 1,
      }}
    >
      {/* Ô tìm kiếm */}
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        <GridSearchIcon style={{ marginRight: 8, color: "#6e6e6e" }} />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Tìm kiếm..."
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Các hành động khi chọn mail */}
      {selectedMails.length > 0 && (
        <>
          <Tooltip title="Đánh dấu Spam">
            <IconButton color="warning" onClick={() => handleSpam(selectedMails)}>
              <Report />
            </IconButton>
          </Tooltip>

          <Tooltip title="Chuyển vào thùng rác">
            <IconButton color="error" onClick={() => handleDelete(selectedMails)}>
              <Delete />
            </IconButton>
          </Tooltip>

          {selectedCategory === "deleted" && (
            <Tooltip title="Xóa vĩnh viễn">
              <IconButton
                color="error"
                onClick={() => handleDeleteForever(selectedMails)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Gán loại thư">
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Label />
            </IconButton>
          </Tooltip>

          {/* Menu chọn loại */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {[
              { value: "feedback", label: "Phản hồi" },
              { value: "bug", label: "Báo lỗi" },
              { value: "suggestion", label: "Góp ý" },
              { value: "share", label: "Chia sẻ" },
            ].map(({ value, label }) => (
              <MenuItem
                key={value}
                onClick={() =>
                  handleChangeSubType(
                    value as "feedback" | "bug" | "suggestion" | "share"
                  )
                }
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Toolbar>
  );
}
