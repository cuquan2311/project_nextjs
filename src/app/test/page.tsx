"use client";
import { useState } from "react";
import { Box, Typography, TextField, Button, Chip } from "@mui/material";
import CommentItem from "./CommentItem";
import { Comment } from "./types";

const initialData: Comment[] = [
  {
    id: "1",
    author: "Giang NTH",
    avatar: "https://i.pravatar.cc/40?img=1",
    content:
      "Tính đến ngày 04/06/2025, đơn vị thi công đã hoàn thành 80% khối lượng công việc phần san nền...",
    createdAt: "14/09/2023 09:25",
    replies: []
  },
  {
    id: "2",
    author: "Phạm Thoại",
    avatar: "https://i.pravatar.cc/40?img=2",
    content: "Đã gọi điện xác nhận, bên cung cấp hứa giao sắt D16 vào 10h sáng...",
    createdAt: "14/09/2023 09:25",
     replies: []
  },
];

export default function CommentList() {
  const [comments, setComments] = useState<Comment[]>(initialData);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; author: string } | null>(
    null
  );

 // sửa handleReply
const handleReply = (id: string, replyContent: string) => {
  setComments((prev) =>
    prev.map((c) =>
      c.id === id
        ? {
            ...c,
            replies: [
              ...(c.replies || []),
              {
                id: Date.now().toString(),
                author: "Bạn",
                avatar: "https://i.pravatar.cc/40?img=3",
                content: replyContent,
                createdAt: new Date().toLocaleString(),
                isReply: true,
                replyTo: c.author,
                replies: [], 
              },
            ],
          }
        : c
    )
  );
};

// thêm hàm tính tổng
const countComments = (list: Comment[]): number =>
  list.reduce(
    (acc, c) => acc + 1 + (c.replies ? countComments(c.replies) : 0),
    0
  );  

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    if (replyTo) {
      handleReply(replyTo.id, newComment);
      setReplyTo(null);
    } else {
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          author: "Bạn",
          avatar: "https://i.pravatar.cc/40?img=4",
          content: newComment,
          createdAt: new Date().toLocaleString(),
        },
      ]);
    }

    setNewComment("");
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        {countComments(comments)} bình luận
      </Typography>

      {comments.map((c) => (
        <CommentItem
          key={c.id}
          comment={c}
          onReply={handleReply}
          onReplyRequest={(id, author) => setReplyTo({ id, author })}
        />
      ))}

      {/* form thêm bình luận */}
      <Box
        sx={{
          mt: 2,
          borderTop: "1px solid #e5e7eb",
          pt: 2,
        }}
      >
        {replyTo && (
          <Box mb={1}>
            <Chip
              label={`Đang trả lời ${replyTo.author}`}
              onDelete={() => setReplyTo(null)}
              color="primary"
            />
          </Box>
        )}
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Viết bình luận..."
            size="small"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddComment}>
            Gửi
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
