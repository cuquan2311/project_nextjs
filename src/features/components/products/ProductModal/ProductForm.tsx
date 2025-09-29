"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, DialogActions, Button } from "@mui/material";
import { Product } from "@/types/productType";
import { useProductStore } from "@/store/productStore/productStore";
import { productSchema } from "@/schemas/ProductSchemas";
import ProductFields from "./ProductFields";
import { useTranslations } from "next-intl";
export default function ProductForm({
  editProduct,
  onClose,
}: {
  editProduct?: Product | null;
  onClose: () => void;
}) {
  const { addProduct, updateProduct } = useProductStore();
  const t = useTranslations("productForm");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      id: 0,
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      thumbnail: "",
      brand: "",
      category: "",
    },
  });
  useEffect(() => {
    if (editProduct) {
      reset(editProduct);
    } else {
      reset({
        id: 0,
        title: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        thumbnail: "",
        brand: "",
        category: "",
      });
    }
  }, [editProduct, reset]);
  const onSubmit = (data: Product) => {
    if (editProduct) {
      updateProduct(editProduct.id, data);
    } else {
      addProduct(data);
    }
    onClose();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {" "}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {" "}
        <ProductFields register={register} errors={errors} />{" "}
      </Grid>{" "}
      <DialogActions>
        {" "}
        <Button onClick={onClose} className="product-modal__actions--cancel">
          {" "}
          {t("actions.cancel")}{" "}
        </Button>{" "}
        <Button type="submit" variant="contained">
          {" "}
          {editProduct ? t("actions.save") : t("actions.add")}{" "}
        </Button>{" "}
      </DialogActions>{" "}
    </form>
  );
}
