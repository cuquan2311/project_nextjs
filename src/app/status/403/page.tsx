"use client";
import { Icon } from "@iconify/react";
import { ErrorOutline, Home, Lock } from "@mui/icons-material";
import { Box, Button, Typography, alpha } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function ForbiddenPage() {
  return (
    <Box
      className="forbidden"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        justifyItems:"center",
        textAlign: "center",
        // px: 2,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
        },
      }}
    >
      {/* Container chính */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          p: { xs: 4, md: 6 },
          maxWidth: 500,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          animation: "fadeInUp 0.6s ease-out",
          "@keyframes fadeInUp": {
            from: {
              opacity: 0,
              transform: "translateY(30px)",
            },
            to: {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 140,
              height: 140,
              borderRadius: "50%",
            }}
          />
          <Icon
            icon="guidance:forbidden-2"
            style={{
              fontSize: 200
            }}
          />
          {/* <Lock
            className="forbidden__icon"
            sx={{
              fontSize: 80,
              position: "relative",
            }}
          /> */}
        </Box>

        {/* Mã lỗi */}
        <Typography
          className="forbidden__code"
          sx={{
            fontSize: { xs: 60, md: 80 },
            fontWeight: 800,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            letterSpacing: "-2px",
          }}
        >
          403
        </Typography>

        {/* Tiêu đề */}
        <Typography
          className="forbidden__title"
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Truy cập bị từ chối
        </Typography>

        {/* Thông báo */}
        <Typography
          className="forbidden__message"
          variant="body1"
          sx={{
            mb: 4,
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          Rất tiếc, bạn không có quyền truy cập vào trang này. Vui lòng liên hệ
          quản trị viên nếu bạn cho rằng đây là lỗi.

        </Typography>

        {/* Nút hành động */}
       <Box  >
         <Button
          className="forbidden__button"
          component={Link}
          href="/"
          variant="contained"
          startIcon={<Home />}
          sx={{
            mb: 1,
            marginRight: 1,
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: 3,
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >
          Quay lại trang chủ
        </Button>
        <Button
          className="forbidden__button"
          component = {Link}
          href="/contactSupport"
          variant="outlined"
          startIcon = {
            <Icon icon="ic:baseline-contact-support"/>
          }
          sx={{
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: 3,
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >

          Liên hệ hỗ trợ
        </Button>
       </Box>
      </Box>
    </Box>
  );
}