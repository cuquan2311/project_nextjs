"use client";

import { Box, Paper, Typography, useTheme } from "@mui/material";

type Post = {
  content: string;
  date: string;
};

export default function PostList({ posts }: { posts: Post[] }) {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Bài viết
      </Typography>
      {posts.length === 0 ? (
        <Typography color="text.secondary">Chưa có bài viết nào</Typography>
      ) : (
        posts.map((post, index) => (
          <Paper
            key={index}
            sx={{
              p: 3,
              mb: 2,
              borderRadius: 2,
              boxShadow: theme.shadows[1],
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[3],
              },
            }}
          >
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {post.content}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.date}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
}
