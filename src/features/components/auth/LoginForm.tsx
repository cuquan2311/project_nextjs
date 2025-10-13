"use client"

import { AuthApi } from "@/api/authAPI";
import { loginSchema } from "@/schemas/authSchemas";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginInput } from "@/types/authType";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Link, Paper, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setLoading(true);
      const res = await AuthApi.login(data);
      // lưu vào zutand

      if(!res.user) {
        throw new Error("Không nhận được dữ liệu user từ server")
      }

      setAuth(res.user, res.access_token);
      toast.success("Đăng nhập thành công");

      // điều hướng theo quyền
      if (res.user.role === "superAdmin" || res.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const message =
        error.response?.data?.message || error.message || "Đăng nhập thất bại";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return(
    <Box 
      sx = {{
        maxHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
      }}
    >
      <Paper 
        sx={{
          p: 5,
          width: 400,
          borderRadius: 4,
          textAlign: "center",
          boxShadow: 5
        }}
        elevation={6}
      >
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Đăng nhập
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Email hoặc Tên đăng nhập"
            margin="normal"
            {...register("loginField")}
            helperText={errors.loginField?.message}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <FormControlLabel
            control={<Checkbox defaultChecked color="primary" />}
            label="Ghi nhớ đăng nhập"
            sx={{ mt: 1 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, py: 1 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Đăng nhập"}
          </Button>

           <Box mt={3}>
            <Typography variant="body2" color="text.secondary">
              Chưa có tài khoản?{" "}
              <Link href="/auth/register" underline="hover">
                Đăng ký ngay
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
