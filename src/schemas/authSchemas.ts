import { RegisterInput } from "@/types/authType";
import * as yup from "yup";

export const registerSchema: yup.ObjectSchema<RegisterInput> = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Bắt buộc"),
  username: yup.string().min(4, "Tối thiểu 4 ký tự").required("Bắt buộc"),
  password: yup.string().min(6, "Tối thiểu 6 ký tự").required("Bắt buộc"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không khớp")
    .required("Bắt buộc"),
  phone: yup.string().optional(),
});

export const loginSchema = yup.object({
  loginField: yup.string().required("Bắt buộc"),
  password: yup.string().required("Bắt buộc"),
});
