import { Box, Button, Container, IconButton, MenuItem, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANT } from "../../../routes/Constatnt";
import { deleteBooking, fetchAllBooking, updateBooking } from "../../../api/bookingManagmentApi";
import ConfirmDialog from "../../../components/common/ConfirmDialog/ConfirmDialog";
import CustomSnackBar from "../../../components/common/snackbar/Snackbar";
import BookingUpdateForm from "../../../components/common/form/bookingUpdateForm/BookingUpdateForm";
import CustomeDialog from "../../../components/common/CustomDialog/CustomDialog";

export default function Booking() {
  const navigate = useNavigate();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isUpdateTrainScheduleDialogOpen, setIsUpdateTrainScheduleDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
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
    onError: (e: any) => {
      setNotify({
        isOpen: true,
        message: e?.message ?? "Error",
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
        enableEditing: false,
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
        enableEditing: false,
      },
      {
        accessorKey: "reservedDate",
        header: "Reservation Date",
        enableEditing: false,
      },
      {
        accessorFn: (row: any) => row.userResponse.firstName + " " + row.userResponse.lastName,
        header: "Name Of Reservation",
        enableEditing: false,
      },
      {
        accessorKey: "trainResponse.startStation",
        header: "Start Location",
        enableEditing: false,
      },
      {
        accessorKey: "trainResponse.endStation",
        header: "End Location",
        enableEditing: false,
      },
      {
        accessorKey: "reservedSeatCount",
        header: "Number Of Tickets",
        Edit: ({ row, cell, column, table }) => {
          console.log(cell);
          return (
            <TextField
              name="reservationSeatCount"
              fullWidth
              id="seat-count"
              // value={values2.reservationSeatCount}
              label="Select Number Of Tickets"
              // onChange={handleChange}
              helperText="Please select number of tickets"
              select
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </TextField>
          );
        },
      },
      {
        accessorKey: "ticket.ticketType",
        header: "Class",
      },
      {
        accessorKey: "reservationPrice",
        header: "Amount",
        enableEditing: false,
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
              <IconButton
                onClick={() => {
                  setIsUpdateTrainScheduleDialogOpen(true);
                  setSelectedReservation(row?.original);
                }}
              >
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
          <Button color="secondary" onClick={() => navigate(ROUTE_CONSTANT.ADD_BOOKING_DASHBOARD)} variant="contained">
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
      <CustomeDialog open={isUpdateTrainScheduleDialogOpen} setOpen={setIsUpdateTrainScheduleDialogOpen} title="Update Reservation">
        <BookingUpdateForm reservation={selectedReservation} setOpen={setIsUpdateTrainScheduleDialogOpen} setNotify={setNotify} />
      </CustomeDialog>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Container>
  );
}
