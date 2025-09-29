"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslations } from "next-intl";
import { userColumns, productColumns } from "./columns";

interface User {
  id: number | string;
}

interface Product {
  id: number | string;
}

interface DataTablesProps {
  users: User[];
  products: Product[];
}

export default function DataTables({ users, products }: DataTablesProps) {
  const [showUsers, setShowUsers] = useState(true);
  const t = useTranslations("dashboard");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return isLargeScreen ? (
    // Desktop: 2 bảng cạnh nhau
    <Grid container spacing={2}>
      <Grid size={{
        xs: 12,
        md: 6
      }}>
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t("users")}
          </Typography>
          <DataGrid
            autoHeight
            rows={users}
            columns={userColumns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } }
            }}
            disableRowSelectionOnClick
          />
        </Paper>
      </Grid>
      <Grid size={{
        xs: 12,
        md: 6
      }}>
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t("products")}
          </Typography>
          <DataGrid
            autoHeight
            rows={products}
            columns={productColumns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } }
            }}
            disableRowSelectionOnClick
          />
        </Paper>
      </Grid>
    </Grid>
  ) : (
    // Mobile: toggle giữa 2 bảng
    <>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <Button
          variant={showUsers ? "contained" : "outlined"}
          onClick={() => setShowUsers(true)}
        >
          {t("users")}
        </Button>
        <Button
          variant={!showUsers ? "contained" : "outlined"}
          onClick={() => setShowUsers(false)}
        >
          {t("products")}
        </Button>
      </Box>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        {showUsers ? (
          <DataGrid
            autoHeight
            rows={users}
            columns={userColumns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } }
            }}
            disableRowSelectionOnClick
          />
        ) : (
          <DataGrid
            autoHeight
            rows={products}
            columns={productColumns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } }
            }}
            disableRowSelectionOnClick
          />
        )}
      </Paper>
    </>
  );
}
