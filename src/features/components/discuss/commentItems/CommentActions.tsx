"use client";
import { Box, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

type Props = {
  isReply: boolean | undefined;
  onReply: () => void;
};

export default function CommentActions({ isReply, onReply }: Props) {



  if(!isReply) {
    return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
      <IconButton size="small" color="success">
        <Icon icon="material-symbols:check-circle-outline" />
      </IconButton>
      <IconButton size="small" color="success" onClick={onReply}>
        <Icon icon="mdi:reply" />
      </IconButton>
      <IconButton size="small" color="error">
        <Icon icon="humbleicons:restart" />
      </IconButton>
    </Box>
  )
  }else {
    return (
      <Box sx={{ml: "auto"}}>
        <IconButton size="small" color="error">
        <Icon icon="humbleicons:restart" />
      </IconButton>
      </Box>
    )
  }
}
