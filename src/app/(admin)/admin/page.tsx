"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useUserStore } from "@/store/userStore/userStore";
import { useProductStore } from "@/store/productStore/productStore";
import { useTranslations } from "next-intl";
import TopCards from "@/components/admin/TopCards";
import OverviewChart from "@/components/admin/OverviewChart";
import DataTables from "@/components/admin/DataTables";

interface DashboardPageProps {
  isSidebarOpen: boolean;
  collapsedWidth: number;
  drawerWidth: number;
}

export default function DashboardPage({
  isSidebarOpen,
  collapsedWidth,
  drawerWidth,
}: DashboardPageProps) {
  const [mounted, setMounted] = useState(false);
  const { users, fetchUsers, isLoading: loadingUsers, error: errorUsers } = useUserStore();
  const { products, fetchProducts, isLoading: loadingProducts, error: errorProducts } = useProductStore();

  const t = useTranslations("dashboard");

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    setMounted(true);
  }, []);

  const loading = loadingUsers || loadingProducts;
  const error = errorUsers || errorProducts;

  const salesData = useMemo(
    () => products.map((p, i) => ({ name: p.title, value: i + Math.random() * 10 })),
    [products]
  );
  const usersData = useMemo(
    () => (users ?? []).map((u, i) => ({ name: u.firstName, value: Math.floor(Math.random() * 100) })),
    [users]
  );
  const visitsData = useMemo(
    () => products.map((p, i) => ({ name: p.title, value: Math.floor(Math.random() * 1000) })),
    [products]
  );
  const overviewData = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        day: `Day ${i + 1}`,
        users: users?.length ? Math.floor(Math.random() * users?.length) : 0,
        products: products?.length ? Math.floor(Math.random() * products?.length) : 0,
      })),
    [users?.length, products?.length]
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return mounted ? (
    <Box
      sx={{
        width: "100%",
        p: { xs: 2, md: 3 },
        maxWidth: {
          sm: `calc(100vw - ${isSidebarOpen ? drawerWidth : collapsedWidth}px)`,
        },
        boxSizing: "border-box",
        top: 0
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        {t("title")}
      </Typography>

      <TopCards salesData={salesData} usersData={usersData} visitsData={visitsData} />
      <OverviewChart overviewData={overviewData} />
      <DataTables users={users} products={products} />
    </Box>
  ) : null;
}
