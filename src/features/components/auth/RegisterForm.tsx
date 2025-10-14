"use client";
import { AuthApi } from "@/api/authAPI";
import { registerSchema } from "@/schemas/authSchemas";
import { RegisterInput } from "@/types/authType";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import OtpModal from "./OtpModal";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      setLoading(true);
      const res = await AuthApi.registerUser(data);

      setRegisteredEmail(data.email);
      setOtpOpen(true);
      toast.success("Đăng ký thành công! Vui lòng kiểm tra email để lấy mã OTP.");
      console.log(" Register success:", res);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || "Đăng ký thất bại");
      console.error(" Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8f9fa",
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: 400,
          borderRadius: 4,
          textAlign: "center",
        }}
        elevation={6}
      >
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Đăng ký tài khoản
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} method="post" noValidate>
          <TextField
            fullWidth
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Tên đăng nhập"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Xác nhận mật khẩu"
            type="password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Số điện thoại (không bắt buộc)"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            margin="normal"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Đăng ký"}
          </Button>
        </form>
      </Paper>

      {otpOpen && (   
        <OtpModal
          open={otpOpen}
          email={registeredEmail}
          onClose={() => setOtpOpen(false)}
        />
      )}
    </Box>
  );
}
