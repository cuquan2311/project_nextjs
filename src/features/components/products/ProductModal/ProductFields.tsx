"use client";

import { Grid, TextField } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Product } from "@/types/productType";
import { useTranslations } from "next-intl";

export default function ProductFields({
  register,
  errors,
}: {
  register: UseFormRegister<Product>;
  errors: FieldErrors<Product>;
}) {
  const t = useTranslations("productForm");

  return (
    <>
      {/* Title */}
      <Grid size={12}>
        <TextField
          label={t("fields.name")}
          fullWidth
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
      </Grid>

      {/* Price & Stock */}
      <Grid size={6}>
        <TextField
          label={t("fields.price")}
          type="number"
          fullWidth
          {...register("price")}
          error={!!errors.price}
          helperText={errors.price?.message}
          inputProps={{ step: "any" }}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          label={t("fields.stock")}
          type="number"
          fullWidth
          {...register("stock")}
          error={!!errors.stock}
          helperText={errors.stock?.message}
          inputProps={{ step: "any" }}
        />
      </Grid>

      {/* Thumbnail */}
      <Grid size={12}>
        <TextField
          label={t("fields.thumbnail")}
          fullWidth
          {...register("thumbnail")}
          error={!!errors.thumbnail}
          helperText={errors.thumbnail?.message}
        />
      </Grid>

      {/* Brand & Category */}
      <Grid size={6}>
        <TextField
          label={t("fields.brand")}
          fullWidth
          {...register("brand")}
          error={!!errors.brand}
          helperText={errors.brand?.message}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          label={t("fields.category")}
          fullWidth
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
        />
      </Grid>

      {/* Description */}
      <Grid size={12}>
        <TextField
          label={t("fields.description")}
          fullWidth
          multiline
          rows={4}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </Grid>
    </>
  );
}
