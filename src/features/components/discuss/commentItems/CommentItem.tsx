"use client";
import { Box, Avatar, Card, Typography } from "@mui/material";
import CommentHeader from "./CommentHeader";
import CommentActions from "./CommentActions";
import CommentContent from "./CommentContent";
import { Comment } from "@/types/commentType";
import ReplyIcon from "@mui/icons-material/Reply";
import { useTranslations } from "next-intl";

type Props = {
  comment: Comment;
  onReplyRequest: (id: string, author: string) => void;
  disableBorder?: boolean;
};

export default function CommentItem({
  comment,
  onReplyRequest,
  disableBorder,
}: Props) {
  const isReply = !!comment.isReply;
  const t = useTranslations("discussion")
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: isReply ? "#f0fdf4" : "white",
        overflow: "hidden",
        paddingRight: "7px"
      }}
    >
      {/* 🔹 Thanh highlight nằm trên cùng nếu là reply */}
      {isReply && comment.replyTo && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#dcfce7",
            color: "#16a34a",
            px: 1.5,
            py: 0.5,
            borderRadius: "6px",
            fontSize: "0.85rem",
            fontWeight: 500,
            gap: 0.75,
            mb: 1,
          }}
        >
          <Box
            sx={{ width: 4, height: 18, bgcolor: "#16a34a", borderRadius: 1 }}
          />
          <ReplyIcon sx={{ fontSize: 18 }} />
          <Typography component="span">
           {t("replied")}{" "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {comment.replyTo}
            </Box>
          </Typography>
        </Box>   
      )}

      <Card
        elevation={0}
        sx={{
          gap: 1.5,
          alignItems: "flex-start",
          p: isReply ? 0 : 2,
          mb: 1,
          border: disableBorder ? "none" : "1px solid #dadadaee",
          borderRadius: disableBorder ? 0 : "10px",
          boxShadow: "none",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 , with : "100%" }}>
          <Avatar src={comment.avatar} alt={comment.author} />
          <CommentHeader author={comment.author} date = {comment.createdAt.date} time = {comment.createdAt.time} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <CommentContent
              content={comment.content}
              isReply={isReply}
              // replyTo={comment.replyTo}
              onReply={() => onReplyRequest(comment.id, comment.author)}
            />
          </Box>
        </Box>
      </Card>

      {/* replies */}
      {comment.replies && comment.replies.length > 0 && (
        <Box sx={{ ml: 6 }}>
          {comment.replies.map((r) => (
            <Card
              elevation={0}
              key={r.id}
              sx={{
                border: "1px solid #dadadaee",
                borderRadius: "10px",
                mb: 1,
                p: 1,
              }}
            >
              <CommentItem
                comment={r}
                onReplyRequest={onReplyRequest}
                disableBorder
              />
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
