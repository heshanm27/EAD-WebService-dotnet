import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANT } from "../../../routes/Constatnt";
import {
  deleteBooking,
  fetchAllBooking,
} from "../../../api/bookingManagmentApi";
import ConfirmDialog from "../../../components/common/ConfirmDialog/ConfirmDialog";
import CustomSnackBar from "../../../components/common/snackbar/Snackbar";

export default function Booking() {
  const navigate = useNavigate();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });
  const [selectedBookingId, setSelectedBookingId] = useState<string>("");
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["booking"],
    queryFn: fetchAllBooking,
  });

  const queryClient = useQueryClient();
  const { isLoading: isMutaionLoading, mutate } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
        title: "Deleted",
      });
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      setIsConfirmDialogOpen(false);
    },
    onError: () => {
      setNotify({
        isOpen: true,
        message: "Deletetion Failed",
        type: "error",
        title: "Deleted",
      });
    },
  });

  console.log(data);

  const [open, setOpen] = useState(false);
  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "Ticket ID",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
      },
      {
        accessorKey: "reservedDate",
        header: "Reservation Date",
      },
      {
        accessorFn: (row: any) =>
          row.userResponse.firstName + " " + row.userResponse.lastName,
        header: "Name Of Reservation",
      },
      {
        accessorKey: "trainResponse.startStation",
        header: "Start Location",
      },
      {
        accessorKey: "trainResponse.endStation",
        header: "End Location",
      },
      {
        accessorKey: "reservedSeatCount",
        header: "Number Of Tickets",
      },
      {
        accessorKey: "ticket.ticketType",
        header: "Class",
      },
      {
        accessorKey: "reservationPrice",
        header: "Amount",
      },
    ],
    []
  );

  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mt: 5, mb: 5 }} fontWeight={"bold"}>
        Booking Management
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
        onEditingRowSave={(prop) => {
          updateBooking(prop.row.original);
        }}
        onEditingRowCancel={() => {}}
        state={{
          isLoading,
          showAlertBanner: isError,
        }}
        rowCount={data?.data?.length ?? 0}
        columns={columns}
        data={data?.data ?? []}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
        renderRowActions={({ row, table }: any) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton
                color="error"
                onClick={() => {
                  console.log(row?.original?.id);
                  setIsConfirmDialogOpen(true);
                  setSelectedBookingId(row?.original?.id);
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => navigate(ROUTE_CONSTANT.ADD_BOOKING_DASHBOARD)}
            variant="contained"
          >
            Add New Booking
          </Button>
        )}
      />
      <ConfirmDialog
        isOpen={() => setIsConfirmDialogOpen(false)}
        onConfirm={() => mutate(selectedBookingId)}
        open={isConfirmDialogOpen}
        subTitle="This action can not be undone"
        title="Delete User"
        loading={isMutaionLoading}
      />
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Container>
  );
}
