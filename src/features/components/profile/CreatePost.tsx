"use client";

import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React from "react";

export default function CreatePost({
  newPost,
  setNewPost,
  onCreate,
}: {
  newPost: string;
  setNewPost: (v: string) => void;
  onCreate: () => void;
}) {
  const theme = useTheme();
  return (
    <Box mb={4}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Tạo bài viết mới
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={3}
        placeholder="Bạn đang nghĩ gì?"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        sx={{
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover fieldset": {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      />
      <Button
        variant="contained"
        sx={{
          mt: 2,
          borderRadius: 2,
          textTransform: "none",
          px: 4,
          "&:hover": { bgcolor: theme.palette.primary.dark },
        }}
        onClick={onCreate}
        disabled={!newPost.trim()}
      >
        Đăng
      </Button>
    </Box>
  );
}
