"use client"
import { Box, Button, Typography, Container, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AutoStories } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function HeroBanner() {
  const t = useTranslations("hero");

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        textAlign: "center",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Stack spacing={2} alignItems="center">
            {/* Label nhỏ */}
            <Typography
              variant="h4"
              sx={{ letterSpacing: 2, color: "primary.main", fontWeight: 700 }}
            >
              User Manager
            </Typography>

            {/* Tiêu đề chính */}
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                lineHeight: 1.2,
              }}
            >
              {t("title")}
            </Typography>

            {/* Mô tả */}
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.8,
                maxWidth: 600,
              }}
            >
              {t("desc") || "Quản lý người dùng dễ dàng..."}
            </Typography>

            {/* Buttons */}
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                startIcon={<DashboardIcon />}
                sx={{
                  fontWeight: "bold",
                  px: 4,
                  py: 1.5,
                  borderRadius: "999px",
                }}
                component={Link}
                href="/admin"
              >
                {t("button") || "Vào quản trị"}
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<AutoStories />}
                sx={{
                  fontWeight: "bold",
                  px: 4,
                  py: 1.5,
                  borderRadius: "999px",
                }}
                component={Link}
                href="/features"
              >
                Docs
              </Button>
            </Stack>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
