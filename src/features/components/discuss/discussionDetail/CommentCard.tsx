"use client";

import { Box, Typography, Avatar, Paper } from "@mui/material";

type Comment = {
  id: number;
  author: string;
  roles: string[];
  content: string;
  date: string; // dd/MM/yyyy
  time: string; // HH:mm
  isOwner?: boolean;
};

export default function CommentCard({ comment }: { comment: Comment }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        bgcolor: comment.isOwner ? "primary.light" : "background.paper",
      }}
    >
      <Box display="flex" alignItems="flex-start" gap={2}>
        {/* Avatar */}
        <Avatar>{comment.author[0]}</Avatar>

        {/* Nội dung */}
        <Box>
          <Typography fontWeight="bold">
            {comment.author}{" "}
            <Typography component="span" variant="caption" color="text.secondary">
              ({comment.roles.join(", ")})
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {comment.content}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
            {comment.date} • {comment.time}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
