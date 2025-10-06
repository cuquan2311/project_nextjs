"use client";
import { Paper, Box } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Product } from "@/types/productType";
import RowActions from "./RowActions";

export default function ProductDataGrid({
  rows,
  onEdit,
  onView,
  onDelete,
  columnsLabels,
  detailProduct,
}: {
  rows: GridRowsProp;
  onEdit: (p: Product) => void;
  onView: (p: Product) => void;
  onDelete: (id: string) => void;
  detailProduct: Product | null;
  columnsLabels: {
    id: string;
    image: string;
    name: string;
    price: string;
    stock: string;
    brand: string;
    desc: string;
    action: string;
  };
}) {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: String(columnsLabels.id),
      flex: 0.3,
      minWidth: 60,
    },
    {
      field: "thumbnail",
      headerName: columnsLabels.image,
      flex: 0.5,
      minWidth: 80,
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={params.value}
            alt={params.row.title}
            style={{
              maxWidth: "50px",
              maxHeight: "50px",
              objectFit: "contain",
              border: "1px solid",
              borderRadius: "50%",
            }}
          />
        </Box>
      ),
    },
    {
      field: "title",
      headerName: columnsLabels.name,
      flex: 1.5,
      minWidth: 150,
    },
    {
      field: "price",
      headerName: columnsLabels.price,
      flex: 1,
      minWidth: 80,
    },
    {
      field: "stock",
      headerName: columnsLabels.stock,
      flex: 1,
      minWidth: 80,
    },
    {
      field: "brand",
      headerName: columnsLabels.brand,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "category",
      headerName: columnsLabels.desc,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "actions",
      headerName: columnsLabels.action,
      flex: 1,
      minWidth: 100,
      sortable: false,
      align: "right",
      renderCell: (params) => (
        <RowActions
          product={params.row as Product}
          onEdit={onEdit}
          onView={onView}
          onDelete={onDelete}
          isCompact={Boolean(detailProduct)}
        />
      ),
    },
  ];

  return (
    <Paper
      className="product-data-grid"
      sx={{
        width: "100%",
        overflowX: "auto",
        p: { xs: 1, sm: 2 },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeader": {
            fontWeight: "bold",
            fontSize: { xs: "0.8rem", sm: "1rem" },
            whiteSpace: "nowrap",
          },
          "& .MuiDataGrid-cell": {
            fontSize: { xs: "0.75rem", sm: "0.9rem" },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }}
      />
    </Paper>
  );
}
