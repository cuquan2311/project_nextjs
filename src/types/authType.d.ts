export type Role = "user" | "admin" | "superAdmin";

export interface UserAuth {
  _id: string;
  email: string;
  username: string;
  phone?: string;
  avatar?: string;
  password?: string;
  role: Role;
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type RegisterInput = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  avatar?: [""];
};

export interface LoginInput {
  loginField: string;
  password: string;
}

export interface VerifyOtpInput {
  email: string;
  otp: string;
}

export interface AuthResponse {
  access_token: string;
  role: "user" | "admin" | "superAdmin";
  user?: {
    _id: string;
    email: string;
    username: string;
    role: Role;
    isVerified: boolean;
    avatar?: string;
  };
}
