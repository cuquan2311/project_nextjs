import { GridColDef } from "@mui/x-data-grid";

export const userColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
];

export const productColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "stock", headerName: "Stock", width: 100 },
  { field: "brand", headerName: "Brand", width: 150 },
];
