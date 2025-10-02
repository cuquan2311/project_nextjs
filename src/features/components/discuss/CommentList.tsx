"use client";
import { Box, Typography } from "@mui/material";
import CommentItem from "./commentItems/CommentItem";
import { Comment } from "@/types/commentType";
import { useTranslations } from "next-intl";

type Props = {
  comments: Comment[];
  onReplyRequest: (id: string, author: string) => void;
};

export default function CommentList({ comments, onReplyRequest }: Props) {
  const t = useTranslations("discussion")
  const countComments = (list: Comment[]): number =>
    list.reduce((acc, c) => acc + 1 + (c.replies ? countComments(c.replies) : 0), 0);

  return (
    <Box>
      <Box
        sx={{
          border: "1px solid #dadadaee",
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      >
        <Typography sx={{ margin: "10px", fontWeight: "bold" }}>
          {countComments(comments)} {t("comments")}
        </Typography>
      </Box>

      {comments.map((c) => (
        <CommentItem
          key={c.id}
          comment={c}
          onReplyRequest={onReplyRequest}
        />
      ))}
    </Box>
  );
}
