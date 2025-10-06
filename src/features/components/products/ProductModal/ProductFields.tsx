"use client";
import { Grid, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProductInput } from "@/types/productType";

type Props = {
  register: UseFormRegister<ProductInput>;
  errors: FieldErrors<ProductInput>;
};

export default function ProductFields({ register, errors }: Props) {
  return (
    <>
      <Grid size = {{ xs: 12 , sm : 6}}>
        <TextField
          label="Title"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
        />
      </Grid>

      <Grid size = {{ xs: 12 , sm : 6}}>
        <TextField
          label="Description"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
        />
      </Grid>

      <Grid size = {{ xs: 12 , sm : 6}}>
        <TextField
          label="Price"
          type="number"
          {...register("price")}
          error={!!errors.price}
          helperText={errors.price?.message}
          fullWidth
        />
      </Grid>

      <Grid size = {{ xs: 12 , sm : 6}}>
        <TextField
          label="Stock"
          type="number"
          {...register("stock")}
          error={!!errors.stock}
          helperText={errors.stock?.message}
          fullWidth
        />
      </Grid>

      <Grid size = {{ xs: 12 , sm : 6}}>
        <TextField
          label="Discount %"
          type="number"
          {...register("discountPercentage")}
          error={!!errors.discountPercentage}
          helperText={errors.discountPercentage?.message}
          fullWidth
        />
      </Grid>

      <Grid size = {{ xs: 12 , sm : 6}}>
        <TextField
          label="Rating"
          type="number"
          {...register("rating")}
          error={!!errors.rating}
          helperText={errors.rating?.message}
          fullWidth
        />
      </Grid>

      <Grid size = {{ xs: 12 , sm : 6}}>
        <TextField
          label="Thumbnail URL"
          {...register("thumbnail")}
          error={!!errors.thumbnail}
          helperText={errors.thumbnail?.message}
          fullWidth
        />
      </Grid>

      <Grid size = {{ xs: 12 , sm : 6}}>
        <TextField
          label="Brand"
          {...register("brand")}
          error={!!errors.brand}
          helperText={errors.brand?.message}
          fullWidth
        />
      </Grid>

      <Grid size = {{ xs: 12 , sm : 6}}>
        <TextField
          label="Category"
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
          fullWidth
        />
      </Grid>
    </>
  );
}
