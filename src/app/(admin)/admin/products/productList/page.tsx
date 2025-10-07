"use client"
import React, { useEffect, useState } from "react";

import { Grid, Container, Typography, TextField } from "@mui/material";
import { useProductStore } from "@/store/productStore/productStore";
import ProductCard from "@/features/components/productCard/ProductCard";

export default function ProductManager() {
  const { products, fetchProducts, deleteProduct } = useProductStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      deleteProduct(id);
    }
  };

  // const handleEdit = (product) => {
  //   console.log("Edit", product);
  // };

  // const handleView = (product) => {
  //   console.log("View", product);
  // };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" mb={3}>
        Quản lý sản phẩm
      </Typography>

      <TextField
        label="Tìm kiếm sản phẩm"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid size = {{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3
          }} key={product.id}>
            <ProductCard
              product={product}
              // onEdit={handleEdit}
              onDelete={handleDelete}
              // onView={handleView}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
