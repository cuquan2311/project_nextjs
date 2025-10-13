import {
  AuthResponse,
  LoginInput,
  RegisterInput,
  UserAuth,
  VerifyOtpInput,
} from "@/types/authType";
import api from "./gobalAPI";

export const AuthApi = {
  //! Đăng kí
  registerUser: async (data: RegisterInput): Promise<void> => {
    const res = await api.post("/auth/register", data);
    console.log("🚀 ~ Đăng kí --->:", res.data);
    return res.data;
  },

  //! Xác thực OTP
  verifyOtp: async (data: VerifyOtpInput): Promise<void> => {
    await api.post("/auth/verify-otp", data);
  },

  //! Đăng nhập
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/auth/login", data);
    console.log("🚀 ~ Đăng nhập --->:", res.data);
    return res.data;
  },

  //! Cập nhật user
  updateUser: async (_id: string, data: Partial<UserAuth>) => {
    const res = await api.put(`/auth/update/${_id}`, data);
    return res.data;
  },
};
