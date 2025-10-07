"use client";

import {
  Typography,
  Box,
  Divider,
  Stack,
  Rating,
  IconButton,
  DialogActions,
  Button,
  Chip,
} from "@mui/material";
import { Product } from "@/types/productType";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function ProductDetailPanel({
  product,
  onEdit,
  onClose,
}: {
  product: Product;
  onEdit: (p: Product) => void;
  onClose: () => void;
}) {
  return (
    <Box
      sx={{
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        borderRadius: "16px 16px 0 0",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          borderBottom: "1px solid ",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {product.title}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Scroll nội dung */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          px: 3,
          py: 2,
        }}
      >
        {/* Hình ảnh */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
            borderRadius: 4,
            boxShadow: "0 2px 8px ",
            mb: 3,
          }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              maxHeight: 300,
              maxWidth: "100%",
              objectFit: "contain",
              borderRadius: 12,
            }}
          />
        </Box>

        {/* Thông tin chi tiết */}
        <Stack spacing={2}>
          <Typography variant="body1">
            {product.description || "Không có mô tả"}
          </Typography>

          <Divider />

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
            <Typography>
               <b>Giá:</b> {product.price.toLocaleString()} VND
            </Typography>
            <Typography>
               <b>Giảm giá:</b> {product.discountPercentage ?? 0}%
            </Typography>
            <Typography>
               <b>Thương hiệu:</b> {product.brand}
            </Typography>
            <Typography>
               <b>Tồn kho:</b> {product.stock}
            </Typography>
            <Typography>
               <b>Danh mục:</b> {product.category}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            
            <Rating
              value={product.rating ?? 0}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography variant="body2">
              {product.rating ? product.rating.toFixed(1) : "Chưa có đánh giá"}
            </Typography>
          </Box>

          <Divider />

          {/* Thông tin thời gian */}
          <Box sx={{ fontSize: 14}}>
            <Typography>
               <b>Ngày tạo:</b>{" "}
              {product.createdAt
                ? format(new Date(product.createdAt), "dd/MM/yyyy HH:mm", {
                    locale: vi,
                  })
                : "Không có dữ liệu"}
            </Typography>
            <Typography>
               <b>Cập nhật lần cuối:</b>{" "}
              {product.updatedAt
                ? format(new Date(product.updatedAt), "dd/MM/yyyy HH:mm", {
                    locale: vi,
                  })
                : "Không có dữ liệu"}
            </Typography>
          </Box>

          <Chip
            label={`ID: ${product.id || product.id}`}
            variant="outlined"
            size="small"
            sx={{ mt: 1, fontSize: 12 }}
          />
        </Stack>
      </Box>

      {/* Footer */}
      <DialogActions
        sx={{
          flexShrink: 0,
          justifyContent: "space-between",
          px: 3,
          py: 2,
          borderTop: "1px solid ",
        }}
      >
        <Button onClick={onClose}  variant="outlined">
          Đóng
        </Button>
        <Button variant="contained"  onClick={() => onEdit(product)}>
          Sửa sản phẩm
        </Button>
      </DialogActions>
    </Box>
  );
}
