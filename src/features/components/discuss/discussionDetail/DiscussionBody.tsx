"use client";

import { Box, Typography } from "@mui/material";
import { DiscussTopics } from "@/data/discussData";

type Props = {
  topicId: number;
};

export default function DiscussionBody({ topicId }: Props) {
  const topic = DiscussTopics.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <Box>
        <Typography color="text.secondary">❌ Không tìm thấy chủ đề</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 2 }}>
      {/* Tiêu đề nhỏ */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {topic.titlePost}
      </Typography>

      {/* Nội dung */}
      <Typography
        variant="body2" 
        sx={{ lineHeight: 1.5 }}
      >
        {topic.content}
      </Typography>
    </Box>
  );
}
