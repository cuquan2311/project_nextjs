"use client";

import { Typography, Box, Divider, Stack, Rating, IconButton, DialogActions, Button } from "@mui/material";
import { Product } from "@/types/productType";
import { useTranslations } from "next-intl";
import CloseIcon from "@mui/icons-material/Close";

export default function ProductDetailPanel({
  product,
  onEdit,
  onClose,
}: {
  product: Product;
  onEdit: (p: Product) => void;
  onClose: () => void;
}) {
  const t = useTranslations("productForm");

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          {product.title}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Hình ảnh */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            maxHeight: 200,
            maxWidth: "100%",
            objectFit: "contain",
            borderRadius: 8,
          }}
        />
      </Box>

      {/* Thông tin */}
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Divider />

        <Typography variant="subtitle1" fontWeight="bold">
          {t("fields.price")}: <span style={{ color: "#22c55e" }}>${product.price}</span>
        </Typography>

        <Typography variant="subtitle2">{t("fields.stock")}: {product.stock}</Typography>
        <Typography variant="subtitle2">{t("fields.brand")}: {product.brand}</Typography>
        <Typography variant="subtitle2">{t("fields.category")}: {product.category}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Rating value={product.rating ?? 0} precision={0.1} readOnly size="small" />
          <Typography variant="body2">{(product.rating ?? 0).toFixed(1)}</Typography>
        </Box>

        <DialogActions>
          <Button onClick={onClose} className="product-modal__actions--cancel">
            {t("actions.cancel")}
          </Button>
          <Button type="submit" variant="contained" onClick={() => onEdit(product)}>
            Sửa sản phẩm
          </Button>
        </DialogActions>
      </Stack>
    </Stack>
  );
}
