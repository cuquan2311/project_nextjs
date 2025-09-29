"use client";

import { Box, Typography, useTheme } from "@mui/material";

export default function StatsSection() {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      mb={4}
      sx={{
        bgcolor: theme.palette.grey[400],
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box textAlign="center">
        <Typography variant="h6" fontWeight="bold">
          10
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Bạn bè
        </Typography>
      </Box>
      <Box textAlign="center">
        <Typography variant="h6" fontWeight="bold">
          24
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Bài viết
        </Typography>
      </Box>
      <Box textAlign="center">
        <Typography variant="h6" fontWeight="bold">
          100
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Người theo dõi
        </Typography>
      </Box>
    </Box>
  );
}
