"use client"
import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, useTheme } from '@mui/material';
import React, { ChangeEvent } from 'react'

export default function CoverPhoto({
  coverPhoto,
  onUpload
}: {
  coverPhoto: string;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const theme = useTheme();
  return (
    <Box
      height={{ xs: 150, md: 250 }}
      position="relative"
      sx={{
        bgcolor: theme.palette.grey[300],
        borderRadius: { xs: 0, md: 2 },
        overflow: "hidden"
      }}
    >
      {coverPhoto && (
        <img
          src={coverPhoto}
          alt="cover"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="cover-upload"
        type="file"
        onChange={onUpload}
      />
      <label htmlFor="cover-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<PhotoCamera />}
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            borderRadius: 2,
            textTransform: "none",
            boxShadow: theme.shadows[2],
            "&:hover": {
              boxShadow: theme.shadows[4],
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          Tải ảnh bìa
        </Button>
      </label>
    </Box>
  )
}
