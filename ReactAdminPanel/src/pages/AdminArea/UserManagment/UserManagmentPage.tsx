import { Box, Button, Container, IconButton, Tooltip, Typography, Chip, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef, MaterialReactTableProps } from "material-react-table";
import { Edit } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import CustomeDialog from "../../../components/common/CustomDialog/CustomDialog";
import AddCategoryForm from "../../../components/common/form/addCategoryForm/AddCategoryForm";
import { fetchAllUsers } from "../../../api/userApi";
import UpdateUserForm from "../../../components/common/form/updateUserForm/UpdateUserForm";
export default function UserManagmentPage() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>();
  const { data, error, isLoading, isError, isSuccess } = useQuery({ queryKey: ["users"], queryFn: fetchAllUsers });
  const [tableData, setTableData] = useState<any>();
  console.log(data);

  useEffect(() => {
    if (isSuccess) {
      setTableData(data);
    }
  }, [data]);
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row: any) => row.firstName + " " + row.lastName, //access nested data with dot notation
        header: "User Name",
        enableGlobalFilter: true,
        enableEditing: false,
      },
      {
        accessorKey: "email", //access nested data with dot notation
        header: "Email",
        enableGlobalFilter: true,
        enableEditing: false,
      },
      {
        accessorKey: "isActive", //access nested data with dot notation
        header: "IsAcvtive",
        enableGlobalFilter: true,
        enableEditing: false,
        Cell: ({ renderedCellValue, row }: any) => {
          return row.original.isVerified ? <Chip label="Active" color="primary" /> : <Chip label="DeActive" color="warning" />;
        },
      },
      {
        accessorKey: "role", //access nested data with dot notation
        header: "User Role",
        enableGlobalFilter: true,

        Edit: ({ row, cell, column, table }) => {
          console.log(cell);
          return (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={row.original?.role}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                label="Role"
              >
                <MenuItem value={"user"}>User</MenuItem>
                <MenuItem value={"seller"}>Seller</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
              </Select>
            </FormControl>
          );
        },
        Cell: ({ renderedCellValue, row }: any) => {
          switch (row.original.role) {
            case "admin":
              return <Chip label="Admin" color="error" />;
            case "seller":
              return <Chip label="Seller" color="warning" />;
            default:
              return <Chip label="User" color="primary" />;
          }
        },
      },
    ],
    []
  );
  const handleSaveRowEdits: MaterialReactTableProps<any>["onEditingRowSave"] = async ({ exitEditingMode, row, values }) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
    tableData[row.index] = values;
    //send/receive api updates here
    setTableData([...tableData]);

    exitEditingMode();
  };
  console.log("tableData", tableData);
  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mt: 5, mb: 5 }}>
        User Managment
      </Typography>

      <MaterialReactTable
        positionActionsColumn="last"
        muiTopToolbarProps={{
          sx: {
            p: 2,
            justifyContent: "end",
          },
        }}
        localization={{
          noRecordsToDisplay: "No records to display",
        }}
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        state={{
          isLoading,
          showAlertBanner: isError,
        }}
        rowCount={tableData?.users?.length ?? 0}
        columns={columns}
        data={tableData?.users ?? []}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() => {
                  setSelectedUser(row.original);
                  setOpen(true);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
      <CustomeDialog open={open} setOpen={setOpen} title={"Update User Role"}>
        <UpdateUserForm user={selectedUser} setOpen={setOpen} />
      </CustomeDialog>
    </Container>
  );
}
