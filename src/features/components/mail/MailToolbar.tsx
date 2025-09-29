import { ContactMessage } from '@/types/contactMessageType';
import { Delete, Label, Report } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, TextField, Toolbar, Tooltip } from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';
import React from 'react'

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
}: {
  search: string;
  setSearch: (val: string) => void;
  selectedMails: string[];
  selectedCategory: string;
  setAnchorEl: (el: HTMLElement | null) => void;
  anchorEl: HTMLElement | null;
  setMessages: (updater: (state: { messages: ContactMessage[] }) => { messages: ContactMessage[] }) => void;
  setSelectedMails: (ids: string[]) => void;
  setSelectedMail: (mail: ContactMessage | null) => void;
}) {
  //chuyen Mail tha`nh spam 
  const handleSpam = (ids: string[]) => {
    setMessages((state: { messages: ContactMessage[] }) => ({
      messages: state.messages.map((m: ContactMessage) =>
        ids.includes(m.id) ? { ...m, type: "spam", subType: undefined } : m
      ),
    }));
    setSelectedMails([]);
    setSelectedMail(null);
  };
  // Chuyển mail vào thùng rác
  const handleDelete = (ids: string[]) => {
    setMessages((state: { messages: ContactMessage[] }) => ({
      messages: state.messages.map((m: ContactMessage) =>
        ids.includes(m.id) ? { ...m, type: "deleted", subType: undefined } : m
      ),
    }));
    setSelectedMails([]);
    setSelectedMail(null);
  };
  // Xóa vĩnh viễn
  const handleDeleteForever = (ids: string[]) => {
    setMessages((state: { messages: ContactMessage[] }) => ({
      messages: state.messages.filter((m: ContactMessage) => !ids.includes(m.id)),
    }));
    setSelectedMails([]);
    setSelectedMail(null);
  };

  // Gán loại cho mail
  const handleChangeSubType = (
    subType: "feedback" | "bug" | "suggestion" | "share"
  ) => {
    setMessages((state: { messages: ContactMessage[] }) => ({
      messages: state.messages.map((m: ContactMessage) =>
        selectedMails.includes(m.id)
          ? { ...m, subType, type: "inbox" as ContactMessage["type"] }
          : m
      ),
    }));
    setAnchorEl(null);
    setSelectedMails([]);
  };
  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: "divider", px: 2, gap: 1 }}>
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

      {/* Action khi chọn mail */}
      {selectedMails.length > 0 && (
        <>
          <Tooltip title="Spam">
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

          <Tooltip title="Gán loại">
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Label />
            </IconButton>
          </Tooltip>

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
