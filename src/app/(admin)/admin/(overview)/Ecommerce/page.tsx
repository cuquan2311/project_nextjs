"use client";
import React from "react";
import { Box, Grid, Card, Typography, Divider } from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Inventory2, People, ShoppingCart, AttachMoney, TrendingUp } from "@mui/icons-material";

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

export default function EcommercePage() {
  const [products, setProducts] = React.useState<Product[]>([]);

  type Cart = {
    id: number;
    products: { id: number; quantity: number; price: number; total: number; discountPercentage: number; discountedPrice: number; title: string; }[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
  };

  const [carts, setCarts] = React.useState<Cart[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products?limit=100").then(res => res.json()),
      fetch("https://dummyjson.com/carts?limit=100").then(res => res.json())
    ]).then(([pRes, cRes]) => {
      setProducts(pRes.products);
      setCarts(cRes.carts);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  // --- KPI ---
  const totalProducts = products.length;
  const totalUsers = Array.from(new Set(carts.map(c => c.userId))).length;
  const totalCarts = carts.length;
  const avgCartValue = totalCarts ? Math.round(carts.reduce((a, b) => a + b.total, 0) / totalCarts) : 0;

  const kpis = [
    { title: "Total Products", value: totalProducts, icon: <Inventory2 />, color: "#1976d2", desc: "All products" },
    { title: "Total Users", value: totalUsers, icon: <People />, color: "#2e7d32", desc: "Registered users" },
    { title: "Total Carts", value: totalCarts, icon: <ShoppingCart />, color: "#f57c00", desc: "Active carts" },
    { title: "Avg Cart Value", value: `$${avgCartValue}`, icon: <AttachMoney />, color: "#9c27b0", desc: "Average order" }
  ];

  // --- Top Categories ---
  const categoryCount: Record<string, number> = {};
  products.forEach(p => categoryCount[p.category] = (categoryCount[p.category] || 0) + 1);
  const topCategories = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const categoryOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, borderRadius: 6, columnWidth: "55%" } },
    dataLabels: { enabled: false },
    colors: ["#1976d2"],
    xaxis: { categories: topCategories.map(([k]) => k) },
    tooltip: { theme: "dark" },
    grid: { borderColor: "#eee" }
  };
  const categorySeries = [{ name: "Products", data: topCategories.map(([_, v]) => v) }];

  // --- Top Brands ---
  const brandCount: Record<string, number> = {};
  products.forEach(p => brandCount[p.brand] = (brandCount[p.brand] || 0) + 1);
  const topBrands = Object.entries(brandCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const brandOptions: ApexOptions = {
    chart: { type: "pie" },
    labels: topBrands.map(([k]) => k),
    legend: { position: "bottom" },
    colors: ["#1976d2", "#2e7d32", "#f57c00", "#9c27b0", "#03a9f4"],
    tooltip: { theme: "dark" }
  };
  const brandSeries = topBrands.map(([_, v]) => v);

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Typography variant="h3" gutterBottom>E-commerce</Typography>
      <Typography variant="subtitle1" color="text.secondary">Overview of products, brands, and categories</Typography>
      <Divider sx={{ my: 2 }} />

      {/* KPI */}
      <Grid container spacing={3} mb={4}>
        {kpis.map((k, i) => (
          <Grid size={{ xs: 12, md: 3 }} key={i}>
            <Card sx={{ borderRadius: 3, p: 3, color: "white", bgcolor: k.color, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ fontSize: 40 }}>{k.icon}</Box>
              <Box>
                <Typography variant="subtitle2">{k.title}</Typography>
                <Typography variant="h5" fontWeight="bold">{k.value} <TrendingUp sx={{ fontSize: 20, verticalAlign: "middle" }} /></Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>{k.desc}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 3, p: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Typography variant="h6" mb={1}>Top 5 Product Categories</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Electronics dominates 35% of total products
            </Typography>
            <Chart options={categoryOptions} series={categorySeries} type="bar" height={350} />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3, p: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Typography variant="h6" mb={1}>Top 5 Brands</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>Most listed brands overview</Typography>
            <Chart options={brandOptions} series={brandSeries} type="pie" height={350} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
