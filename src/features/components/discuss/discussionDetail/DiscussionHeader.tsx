"use client";

import { Box, Typography, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { DiscussTopics } from "@/data/discussData"; // import danh sách topic

type Props = {
  topicId: number;
};

export default function DiscussionDetailHeader({ topicId }: Props) {
  const topic = DiscussTopics.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <Typography variant="h6" color="success">
        Không tìm thấy chủ đề
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height : "25px"
      }}
    >
      {/* Tiêu đề bên trái */}
      <Typography variant="h5" fontWeight="bold" color="success">
        {topic.title}
      </Typography>

      {/* Các nút icon bên phải */}
      <Box display="flex" >
        <IconButton color="primary">
          <Icon icon="material-symbols:attach-file" width={20} height={20} />
        </IconButton>
        <IconButton color="primary">
          <Icon icon="material-symbols:warning-rounded" width={20} height={20} />
        </IconButton>
        <IconButton color="primary">
          <Icon icon="mdi:dots-vertical" width={20} height={20} />
        </IconButton>
      </Box>
    </Box>
  );
}
