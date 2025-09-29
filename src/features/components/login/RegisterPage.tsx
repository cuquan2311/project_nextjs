"use client";

import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { useAuthStore } from "@/store/AuthStore";
import image from "@/assets/image/Security_1-Photo-KS_02-11@2x.png"
import Image from "next/image";

export default function RegisterPage() {
  const { register } = useAuthStore();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
    confirmPassword: ""
  })
  const handleSubmit = (e: React.FormEvent) => {

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      ...form,
      avatar:
        form.avatar || `https://i.pravatar.cc/150?u=${form.email || form.fullName}`,
    };

    e.preventDefault();
    register(userData);
    alert("Đăng ký thành công! Giờ bạn có thể đăng nhập.");
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Grid
        container
        component={Paper}
        elevation={0}
        sx={{
          width: "100%",
          minHeight: "100vh",
          borderRadius: 0,
          overflow: "hidden",
        }}
      >
        {/* Form bên trái */}
        <Grid
          size={{
            xs: 12,
            md: 6
          }}
          sx={{
            p: { xs: 4, md: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Create Account ✨
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "gray" }}>
            Sign up to get started with your account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              placeholder="Full Name"
              fullWidth
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3 },
              }}
            />

            <TextField
              placeholder="Email"
              fullWidth
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3 },
              }}
            />

            <TextField
              placeholder="Password"
              type="password"
              fullWidth
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3 },
              }}
            />

            <TextField
              placeholder="Confirm Password"
              type="password"
              fullWidth
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3 },
              }}
            />

            <FormControlLabel
              control={<Checkbox />}
              label="I agree to the Terms & Conditions"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
              }}
            >
              Sign Up
            </Button>

            <Typography align="center" sx={{ mt: 2, fontSize: 15 }}>
              Already have an account?{" "}
              <Link
                href="/login"
                style={{ color: "#1976d2", fontWeight: "bold" }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Grid>

        {/* 3D minh hoạ bên phải */}
        <Grid
          size={{
            xs: 12,
            md: 6
          }}
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={image}
              alt="Login illustration"
              fill
              style={{
                objectFit: "cover",
                border: "none",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
