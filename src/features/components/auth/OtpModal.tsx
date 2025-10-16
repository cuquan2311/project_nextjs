"use client";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useAuth from "./hooks/useAuth";

interface OtpModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
}

export default function OtpModal({ open, onClose, email }: OtpModalProps) {
  const {loading,inputRefs, otpValues,setOtpValues,handleVerify} = useAuth()



  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; 

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
          onClick={()=> handleVerify(email, onClose)}
        >
          {loading ? "Đang xác thực..." : "Xác nhận"}
        </Button>
      </Box>
    </Modal>
  );
}
