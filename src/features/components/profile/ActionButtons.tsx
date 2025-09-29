"use client";

import { Box, Button, useTheme } from "@mui/material";

export default function ActionButtons({ onLogout }: { onLogout: () => void }) {
  const theme = useTheme();
  return (
    <Box display="flex" justifyContent="center" gap={2} mb={4}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 4,
          "&:hover": { bgcolor: theme.palette.primary.dark },
        }}
      >
        Theo dõi
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onLogout}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 4,
          "&:hover": { borderColor: theme.palette.secondary.dark },
        }}
      >
        Đăng xuất
      </Button>
    </Box>
  );
}
