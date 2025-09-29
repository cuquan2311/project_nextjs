"use client";
import { NoEncryptionGmailerrorred } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useRouter } from "next/navigation";
import React from 'react'

export default function NotLoggedIn() {
  const router = useRouter();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      sx={{ px: 2 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 3,
          maxWidth: 400
        }}
      >
        <NoEncryptionGmailerrorred color='primary' sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant='h6' fontWeight="bold" gutterBottom>
          Bạn chưa đăng nhập
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Đăng nhập để sử dụng các tính năng của trang web !
        </Typography>
        <Box >
          <Button
            variant='outlined'
            fullWidth
            sx={{
              marginTop: "10px"
            }}
            onClick={() => router.push("/login")}
          >
            Về trang chủ
          </Button>
          <Button
            variant='contained'
            fullWidth
            sx={{
              marginTop: "10px"
            }}
            onClick={() => router.push("/login")}
          >
            Đăng nhập ngay
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
