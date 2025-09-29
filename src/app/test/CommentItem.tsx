"use client";
import { Box, Avatar, Typography, IconButton, Chip } from "@mui/material";
import { Icon } from "@iconify/react";
import { Comment } from "./types";

type Props = {
  comment: Comment;
  onReply: (id: string, replyContent: string) => void;
  onReplyRequest: (id: string, author: string) => void;
};

export default function CommentItem({
  comment,
  onReply,
  onReplyRequest,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: comment.isReply ? "#f0fdf4" : "white",
        borderRadius: 1,
        mb: 2,
        p: 1.5,
      }}
    >
      {/* header */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
        <Avatar src={comment.avatar} alt={comment.author} />
        <Box sx={{ flex: 1 }}>
          {/* tên + info */}
          <Typography fontWeight="bold">{comment.author}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Icon icon="material-symbols:bookmark-outline" fontSize={18} />
              <Typography variant="caption">IDECO</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Icon icon="material-symbols:sell-outline" fontSize={18} />
              <Typography variant="caption">TV BIM</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Icon
                icon="material-symbols:nest-clock-farsight-analog-outline-rounded"
                fontSize={18}
              />
              <Typography variant="caption">Dưới 1 phút trước</Typography>
            </Box>
            {/* action icons */}
            {!comment.isReply && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  ml: "auto",
                }}
              >
                <IconButton size="small" color="success">
                  <Icon icon="material-symbols:check-circle-outline" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onReplyRequest(comment.id, comment.author)}
                >
                  <Icon icon="mdi:reply" />
                </IconButton>
                <IconButton size="small" color="error">
                  <Icon icon="material-symbols:restart-alt" />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* nếu là reply thì hiển thị tag */}
          {comment.replyTo && (
            <Chip
              label={`Trả lời ${comment.replyTo}`}
              color="success"
              size="small"
              sx={{ mt: 1 }}
            />
          )}

          <Typography variant="body1" mt={1}>
            {comment.content}
          </Typography>
        </Box>
      </Box>

      {/* replies hiển thị lùi 1 cấp */}
      {comment.replies && comment.replies.length > 0 && (
        <Box sx={{ mt: 2, ml: 6 }}>
          {comment.replies.map((r) => (
            <CommentItem
              key={r.id}
              comment={r}
              onReply={onReply}
              onReplyRequest={onReplyRequest}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
