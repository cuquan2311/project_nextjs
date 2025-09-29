"use client";
import React from "react";
import { Box, Grid, Card, Typography, Divider } from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export default function AnalyticsPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  type CartProduct = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
  };

  type Cart = {
    id: number;
    products: CartProduct[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
  };

  const [carts, setCarts] = React.useState<Cart[]>([]);

  React.useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products?limit=100").then(res => res.json()),
      fetch("https://dummyjson.com/carts?limit=100").then(res => res.json())
    ]).then(([pRes, cRes]) => {
      setProducts(pRes.products);
      setCarts(cRes.carts);
    }).catch(console.error);
  }, []);

  // --- Top Cart Categories (Donut) ---
  const cartCategoryCount: Record<string, number> = {};
  carts.forEach(c => {
    c.products.forEach(p => {
      const prod = products.find(pr => pr.id === p.id);
      if (prod) cartCategoryCount[prod.category] = (cartCategoryCount[prod.category] || 0) + p.quantity;
    });
  });
  const topCartCategories = Object.entries(cartCategoryCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const cartOptions: ApexOptions = {
    chart: { type: "donut" },
    labels: topCartCategories.map(([k]) => k),
    tooltip: { theme: "dark" },
    colors: ["#1976d2", "#2e7d32", "#f57c00", "#9c27b0", "#03a9f4"]
  };
  const cartSeries = topCartCategories.map(([_, v]) => v);

  // --- Top 10 Users by Cart Total ---
  const topUsers = carts.sort((a, b) => b.total - a.total).slice(0, 10);
  const userBarOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: "45%" } },
    dataLabels: { enabled: true },
    colors: ["#2e7d32"],
    xaxis: { categories: topUsers.map(c => "User " + c.userId) },
    tooltip: { theme: "dark" }
  };
  const userBarSeries = [{ name: "Cart Total", data: topUsers.map(c => c.total) }];

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Typography variant="h3" gutterBottom>Analytics</Typography>
      <Typography variant="subtitle1" color="text.secondary">Insights on carts and user trends</Typography>
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 3, p: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Typography variant="h6" mb={1}>Top Categories in Cart</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Most popular product categories in carts
            </Typography>
            <Chart options={cartOptions} series={cartSeries} type="donut" height={350} />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 3, p: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Typography variant="h6" mb={1}>Top 10 Users by Cart Value</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>Users with highest cart totals</Typography>
            <Chart options={userBarOptions} series={userBarSeries} type="bar" height={350} />
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid size={12}>
          <Card sx={{ borderRadius: 3, p: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Typography variant="h6" mb={1}>Insights</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Highlights and trends for decision making
            </Typography>
            <Box sx={{ p: 2, borderRadius: 2 }}>
              <Typography>Electronics is the most added category in carts</Typography>
              <Typography>Brand X dominates 25% of product listings</Typography>
              <Typography>Users with high cart value can be targeted for promotions</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
