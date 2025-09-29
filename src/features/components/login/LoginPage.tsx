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
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import image from "@/assets/image/Security_1-Photo-KS_02-11@2x.png"
import Image from "next/image";

export default function LoginPage() {
  const { login } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(form.email, form.password);
    if (success) {
      router.push("/");
    } else {
      alert("Sai email hoặc mật khẩu!");
    }
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
            Welcome Back 👋
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Sign in to continue to your account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              placeholder="Username or Email"
              fullWidth
              multiline
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3 },
              }}
            />

            <TextField
              placeholder="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3 },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 14,
              }}
            >
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <Link href="#" style={{ fontSize: 14 }}>
                Forgot password?
              </Link>
            </Box>

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
              Log in
            </Button>

            <Typography align="center" sx={{ mt: 2, fontSize: 15 }}>
              Don’t have an account?{" "}
              <Link
                href="/register"
                style={{ fontWeight: "bold" }}
              >
                Create your account
              </Link>
            </Typography>
          </Box>
        </Grid>

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
