import React from "react";
import { Product } from "@/types/productType";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from "@mui/material";

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export default function ProductCard({ product,  onDelete }: ProductCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <Box sx={{ height: 180, overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="180"
          image={product.thumbnail }
          alt={product.title}
          sx={{ objectFit: "cover", width: "100%" }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ height: 40, overflow: "hidden" }}>
          {product.description || "No description"}
        </Typography>
        <Typography variant="h6" color="primary" mt={1}>
          ${product.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">
          View
        </Button>
        <Button size="small" >
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(product.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
