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
  updateUser: async (
    _id: string,
    data: Partial<UserAuth> | FormData,
    isFormData = false
  ) => {
    if (isFormData) {
      return (
        await api.put(`/auth/update/${_id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data;
    }
    return (await api.put(`/auth/update/${_id}`, data)).data;
  },
};
