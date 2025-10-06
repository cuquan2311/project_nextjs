"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, DialogActions, Button } from "@mui/material";
import { Product, ProductInput } from "@/types/productType";
import { useProductStore } from "@/store/productStore/productStore";
import ProductFields from "./ProductFields";
import { productSchema } from "@/schemas/ProductSchemas";

type Props = {
  editProduct?: Product | null;
  onClose: () => void;
};

export default function ProductForm({ editProduct, onClose }: Props) {
  const { addProduct, updateProduct } = useProductStore();

   const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductInput>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      stock: 0,
      brand: "",
      category: "",
      discountPercentage: undefined,
      rating: undefined,
      thumbnail: "",
    },
  });

  const onSubmit = (data: ProductInput) => {
    if (editProduct) {
      updateProduct(editProduct.id, data);
    } else {
      addProduct(data);
    }
    onClose();
  };

  useEffect(() => {
    if (editProduct) {
      reset(editProduct);
    }
  }, [editProduct, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <ProductFields register={register} errors={errors} />
      </Grid>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {editProduct ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </form>
  );
}
