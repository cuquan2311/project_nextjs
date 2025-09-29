"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
  Stack,
  Rating,
} from "@mui/material";
import { Product } from "@/types/productType";
import { useTranslations } from "next-intl";

export default function ProductDetailModal({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: Product;
}) {
  const t = useTranslations("productForm")
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      {/* Header */}
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {product.title}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* Image */}
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
                maxHeight: 250,
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
          </Box>

          {/* Info */}
          <Stack spacing={1}>
            <Typography variant="body1">{product.description}</Typography>
            <Divider />

            <Typography variant="subtitle1" fontWeight="bold">
              {t("fields.price")}: <span style={{ color: "#22c55e" }}>${product.price}</span>
            </Typography>

            <Typography variant="subtitle2"> {t("fields.stock")}: {product.stock}</Typography>
            <Typography variant="subtitle2">{t("fields.brand")}: {product.brand}</Typography>
            <Typography variant="subtitle2">{t("fields.category")}: {product.category}</Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating
                value={product.rating ?? 0}
                precision={0.1}
                readOnly
                size="small"
              />
              <Typography variant="body2">
                {(product.rating ?? 0).toFixed(1)}
              </Typography>
            </Box>
          </Stack>

        </Stack>
      </DialogContent>
    </Dialog>
  );
}
