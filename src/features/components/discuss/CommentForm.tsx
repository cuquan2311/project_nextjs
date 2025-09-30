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
  const t = useTranslations("discussion");
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          multiline
          maxRows={4}
          placeholder={t("reply")}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          // InputProps={{
          //   disableUnderline: true,
          //   sx: {
          //     px: 1,
          //   },
          // }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              padding: "4px 8px", // giảm padding mặc định
              fontSize: "0.9rem", // chữ nhỏ lại
              lineHeight: 1.3, // bỏ viền mặc định
            },
            "& .MuiInputBase-inputMultiline": {
              padding: 0, // bỏ padding extra của multiline
            },
            bgcolor: "transparent",
          }}
        />

        <Button
          variant="contained"
          endIcon={<Icon icon="iconamoon:send-bold" width={22} height={22} />}
          onClick={handleSubmit}
          sx={{
            borderRadius: "50px",
          }}
        >
          {t("comments")}
        </Button>
      </Box>
    </Box>
  );
}
