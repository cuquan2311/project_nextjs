"use client";
import { Paper, Box } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import RowActions from "./RowActions";
import { User } from "@/types/userType";

export default function UserDataGrid({
  rows,
  onEdit,
  onView,
  onDelete,
  columnsLabels,
  detailUser,
}: {
  rows: GridRowsProp;
  onEdit: (p: User) => void;
  onView: (p: User) => void;
  onDelete: (id: number) => void;
  detailUser: User | null;
  columnsLabels: {
    image: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    action: string;
  };
}) {
  const columns: GridColDef[] = [
    {
      field: "image",
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
      field: "firstName",
      headerName: columnsLabels.firstName,
      flex: 1.5,
      minWidth: 150,
    },
    {
      field: "lastName",
      headerName: columnsLabels.lastName,
      flex: 1,
      minWidth: 80,
    },
    {
      field: "email",
      headerName: columnsLabels.email,
      flex: 1,
      minWidth: 80,
    },
    {
      field: "phone",
      headerName: columnsLabels.phone,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "gender",
      headerName: columnsLabels.gender,
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
          user={params.row as User}
          onEdit={onEdit}
          onView={onView}
          onDelete={onDelete}
          isCompact={Boolean(detailUser)}
        />
      ),
    },
  ];

  return (
    <Paper
      className="User-data-grid"
      sx={{
        width: "100%",
        overflowX: "auto",
        p: { xs: 1, sm: 2 },
      }}
    >
      <Box sx={{ width: "100%", minHeight: 400 }}>
        <DataGrid 
        getRowId={(row) => row._id} 
          rows={rows}
          columns={columns}
          autoHeight
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
      </Box>
    </Paper>
  );

}
