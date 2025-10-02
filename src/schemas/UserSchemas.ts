import * as yup from "yup";
export const userSchema = yup.object({
  firstName: yup.string().required("Họ không được để trống"),
  lastName: yup.string().required("Tên không được để trống"),
  age: yup
    .number()
    .typeError("Tuổi phải là số")
    .required("Tuổi không được để trống")
    .min(18, "Tuổi phải lớn hơn hoặc bằng 18")
    .max(100, "Tuổi phải nhỏ hơn 100"),
  gender: yup.string().required("Giới tính là bắt buộc"),
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),
  phone: yup
    .string()
    .required("SĐT không được để trống")
    .matches(/^\d{10,11}$/, "SĐT phải là 10 hoặc 11 số"),
  image: yup.string().required("Ảnh đại diện không được để trống"),
});
