"use client";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Product } from "@/types/productType";
import { useTranslations } from "next-intl";
import ProductForm from "./ProductModal/ProductForm";

export default function ProductModal({
  open,
  onClose,
  editProduct,
}: {
  open: boolean;
  onClose: () => void;
  editProduct?: Product | null;
}) {
  const t = useTranslations("productForm");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="product-modal__title">
        {editProduct ? t("titleEdit") : t("titleAdd")}
      </DialogTitle>
      <DialogContent className="product-modal__content">
        <ProductForm onClose={onClose} editProduct={editProduct} />
      </DialogContent>
    </Dialog>
  );
}
