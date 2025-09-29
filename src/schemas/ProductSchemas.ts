import * as yup from "yup";

export const productSchema = yup.object({
  id: yup.number().required(""),
  title: yup.string().required("Tên không được để trống"),
  description: yup.string().required("Mô tả không được để trống"),
  price: yup
    .number()
    .typeError("Giá phải là số")
    .min(0, "Giá phải lớn hơn 0")
    .required("Giá không được để trống"),
  discountPercentage: yup
    .number()
    .typeError("Giảm giá phải là số")
    .min(0, "Giảm giá không âm")
    .max(100, "Giảm giá không quá 100%")
    .required("Giảm giá không được để trống"),
  rating: yup
    .number()
    .typeError("Đánh giá phải là số")
    .min(0, "Đánh giá không được âm")
    .max(5, "Đánh giá không quá 5")
    .required("Đánh giá không được để trống"),
  stock: yup
    .number()
    .typeError("Tồn kho phải là số")
    .min(0, "Tồn kho không âm")
    .required("Tồn kho không được để trống"),
  brand: yup.string().required("Thương hiệu không được để trống"),
  category: yup.string().required("Danh mục không được để trống"),
  thumbnail: yup.string().required("Ảnh không được để trống"),
});
