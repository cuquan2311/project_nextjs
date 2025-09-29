"use client";

import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import React, { ChangeEvent } from "react";

export default function AvatarSection({
  avatar,
  fullName,
  email,
  onUpload,
}: {
  avatar: string;
  fullName: string;
  email: string;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const theme = useTheme();

  return (
    <Box textAlign="center" position="relative" mb={4} sx={{ pt: 2 }}>
      <Avatar
        src={avatar}
        alt={fullName}
        sx={{
          width: { xs: 100, md: 140 },
          height: { xs: 100, md: 140 },
          mx: "auto",
          border: `4px solid ${theme.palette.background.paper}`,
          boxShadow: theme.shadows[2],
        }}
      />
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="avatar-upload"
        title="avatar-upload"
        type="file"
        onChange={onUpload}
      />
      <label htmlFor="avatar-upload">
        <IconButton
          color="primary"
          component="span"
          sx={{
            position: "absolute",
            bottom: "70px",
            right: "calc(50% - 60px)",
            borderRadius: "50%",
            p: 1,
            zIndex: 1,
            "&:hover": { bgcolor: theme.palette.action.hover },
          }}
        >
          <PhotoCamera fontSize="small" />
        </IconButton>
      </label>
      <Typography variant="h5" fontWeight="bold" mt={3}>
        {fullName}
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={1}>
        {email}
      </Typography>
    </Box>
  );
}
