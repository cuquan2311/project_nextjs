"use client";

import { AuthApi } from "@/api/authAPI";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface OtpModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
}

export default function OtpModal({ open, onClose, email }: OtpModalProps) {
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const route = useRouter()
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // chỉ cho nhập 1 chữ số

    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    //Tự động chuyển qua ô tiếp theo
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = otpValues.join("");
    if (otp.length !== 6) {
      toast.error("Vui lòng nhập đầy đủ 6 số trong OTP");
      return;
    }

    try {
      setLoading(true);
      await AuthApi.verifyOtp({ email, otp });
      toast.success("Xác thực thành công");
      onClose();
      route.push("/auth/login")
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "OTP không hợp lệ";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 5,
          width: 400,
          mx: "auto",
          mt: "12%",
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Nhập mã OTP
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Mã xác thực đã được gửi đến email: <strong>{email}</strong>
        </Typography>

        <Stack direction="row" spacing={1.5} justifyContent="center" mb={3}>
          {otpValues.map((digit, i) => (
            <TextField
              key={i}
              inputRef={(el) => (inputRefs.current[i] = el)}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              inputProps={{
                maxLength: 1,
                onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(i, e),
                style: {
                  textAlign: "center",
                  fontSize: "1.5rem",
                  width: "3rem",
                  height: "3rem",
                },
              }}
            />
          ))}
        </Stack>

        <Button
          fullWidth
          variant="contained"
          
          sx={{ mt: 1, fontWeight: 600 }}
          disabled={loading}
          onClick={handleVerify}
        >
          {loading ? "Đang xác thực..." : "Xác nhận"}
        </Button>
      </Box>
    </Modal>
  );
}
