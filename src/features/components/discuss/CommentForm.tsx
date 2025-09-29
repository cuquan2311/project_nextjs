"use client";
import { useState, useEffect } from "react";
import { Box, TextField, Button, Chip } from "@mui/material";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

type Props = {
  onAddComment: (
    content: string,
    replyTo?: { id: string; author: string } | null
  ) => void;
  replyTo: { id: string; author: string } | null;
  onCancelReply: () => void;
};

export default function CommentForm({
  onAddComment,
  replyTo,
  onCancelReply,
}: Props) {
  const [newComment, setNewComment] = useState("");
  const t = useTranslations("discussion")
  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment, replyTo);
    setNewComment("");
    onCancelReply();
  };

  // reset khi replyTo đổi
  useEffect(() => {
    setNewComment("");
  }, [replyTo]);

  return (
    <Box sx={{ borderTop: "1px solid #e5e7eb", pt: 1, p: 1 }}>
      {replyTo && (
        <Box mb={1}>
          <Chip
            label={` ${t("replying_to")} ${replyTo.author}`}
            onDelete={onCancelReply}
            color="primary"
          />
        </Box>
      )}
      <Box sx={{ display: "flex" , height: "30px" , gap : "15px" }}>
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          fullWidth
          placeholder={t("reply")}
          size="medium"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{width: "85%"}}
        />
          <Button 
          variant="contained" 
          endIcon={<Icon icon="iconamoon:send-bold" width={22} height={22} />}
          onClick={handleSubmit}
          sx={{
            borderRadius: "50px"
          }}
          >
          {t("comments")}
        </Button>
      </Box>
    </Box>
  );
}
