import * as yup from "yup";

export const productSchema = yup.object({
  title: yup.string().required("Tên không được để trống"),
  description: yup.string().required("Mô tả không được để trống"),
  price: yup
    .number()
    .typeError("Giá phải là số")
    .min(0, "Giá phải lớn hơn 0")
    .required("Giá không được để trống"),
  stock: yup
    .number()
    .typeError("Tồn kho phải là số")
    .min(0, "Tồn kho không âm")
    .required("Tồn kho không được để trống"),
  brand: yup.string().required("Thương hiệu không được để trống"),
  category: yup.string().required("Danh mục không được để trống"),

  discountPercentage: yup
    .number()
    .typeError("Giảm giá phải là số")
    .min(0)
    .max(100)
    .notRequired(), // 🔑 dùng notRequired thay vì optional()
  rating: yup
    .number()
    .typeError("Đánh giá phải là số")
    .min(0)
    .max(5)
    .notRequired(),
  thumbnail: yup.string().url("Ảnh phải là URL hợp lệ").notRequired(),
});
