import {
  Box,
  Button,
  Container,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef, MaterialReactTableProps } from "material-react-table";
import { Close, Delete, Edit } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllUsers } from "../../../api/userApi";
import { deleteUser } from "../../../api/userApi";
import { updateUser } from "../../../api/userApi";
import ConfirmDialog from "../../../components/common/ConfirmDialog/ConfirmDialog";
import CustomSnackBar from "../../../components/common/snackbar/Snackbar";
export default function UserManagmentPage() {
  const [open, setOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>();
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [userStatusDialogOpen, setUserStatusDialogOpen] = useState(false);
  const [updatedUserStatus, setUpdatedUserStatus] = useState("active");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });
  const queryClient = useQueryClient();
  const { isLoading: isMutaionLoading, mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
        title: "Deleted",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsConfirmDialogOpen(false);
    },
    onError: () => {
      setNotify({
        isOpen: true,
        message: "Deleted Failed",
        type: "error",
        title: "Deleted",
      });
    },
  });
  const [tableData, setTableData] = useState<any>();

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUpdatedUserStatus(event.target.value as string);
  };

  const handleUpdateStatusConfirm = () => {
    updateUser({
      id: selectedUser.id,
      value: { isActive: updatedUserStatus === "active" },
    })
      .then((response) => {
        const updatedTableData = tableData.map((user: { id: any }) =>
          user.id === selectedUser.id ? { ...user, isActive: updatedUserStatus === "active" } : user
        );

        setTableData(updatedTableData);
        setUpdatedUserStatus("active");
      })
      .catch((error) => {
        console.error("Error updating user status", error);
      });

    setUserStatusDialogOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setTableData(data.data);
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
        enableEditing: true,
        Edit: ({ row, cell, column, table }) => {
          console.log(cell);
          return (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Is Active</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={row.original?.isActive} onChange={(e) => {}} label="Is Active">
                <MenuItem value={"true"}>Active</MenuItem>
                <MenuItem value={"false"}>Deactive</MenuItem>
              </Select>
            </FormControl>
          );
        },

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
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={row.original?.role}
                onChange={(e) => {
                  tableData[row.index].role = e.target.value as string;
                }}
                label="Role"
              >
                <MenuItem value={"user"}>User</MenuItem>
                <MenuItem value={"user-agent"}>Travel Agent</MenuItem>
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
    console.log("row", row);
    console.log("row values", values);
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
        rowCount={tableData?.length ?? 0}
        columns={columns}
        data={tableData ?? []}
        editingMode="row"
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
                  table.setEditingRow(row);
                  setSelectedUser(row.original);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() => {
                  table.setEditingRow(null);
                }}
              >
                <Close />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="left" title="Delete">
              <IconButton
                onClick={() => {
                  setSelectedUserId(row.original.id);
                  setIsConfirmDialogOpen(true);
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
      <Dialog open={userStatusDialogOpen} onClose={() => setUserStatusDialogOpen(false)}>
        <DialogTitle>Update User Status</DialogTitle>
        <DialogContent>
          <p>Select the user status:</p>
          <FormControl fullWidth>
            <InputLabel id="user-status-label">User Status</InputLabel>
            <Select
              labelId="user-status-label"
              id="user-status"
              value={updatedUserStatus}
              onChange={(e) => setUpdatedUserStatus(e.target.value as string)}
              label="User Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="deactivate">Deactivate</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserStatusDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateStatusConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        isOpen={() => setIsConfirmDialogOpen(false)}
        onConfirm={() => mutate(selectedUserId)}
        open={isConfirmDialogOpen}
        subTitle="This action can not be undone"
        title="Delete User"
        loading={isMutaionLoading}
      />
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Container>
  );
}
