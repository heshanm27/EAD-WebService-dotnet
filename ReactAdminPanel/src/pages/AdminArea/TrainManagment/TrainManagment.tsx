import { Box, Button, Container, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Delete, Edit, Train } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/redux-hooks";
import { deteteTrain, fetchAllTrains, updateTrain } from "../../../api/trainManagmentApi";
import ConfirmDialog from "../../../components/common/ConfirmDialog/ConfirmDialog";
import CustomSnackBar from "../../../components/common/snackbar/Snackbar";
import AddTrainScheduleForm from "../../../components/common/form/addTrainSchedule/AddTrainScheduleForm";
import CustomeDialog from "../../../components/common/CustomDialog/CustomDialog";

export default function TrainManagment() {
  const navigate = useNavigate();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["trains"],
    queryFn: fetchAllTrains,
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });
  const [selectedTrainId, setSelectedTrainId] = useState<string>("");
  const queryClient = useQueryClient();

  const { isLoading: isMutaionLoading, mutate } = useMutation({
    mutationFn: deteteTrain,
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

  const [open, setOpen] = useState(false);
  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "trainNumber", //access nested data with dot notation
        header: "Train Number",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "trainName",
        header: "Train Name",
      },
      {
        accessorKey: "departureDate",
        header: "Date",
      },
      {
        accessorFn: (row: any) => row.startStation + " / " + row.trainStartTime,
        header: "Start Place / Time",
      },
      {
        accessorFn: (row: any) => row.endStation + " / " + row.trainEndTime,
        header: "Destination / Time",
      },
    ],
    []
  );

  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mt: 5, mb: 5 }} fontWeight={"bold"}>
        Train Schedules
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
          console.log("editing");
          updateTrain(prop.row.original);
        }}
        onEditingRowCancel={() => {}}
        state={{
          isLoading,
          showAlertBanner: isError,
        }}
        rowCount={data?.data.length ?? 0}
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
                  setSelectedTrainId(row?.original?.id);
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button color="secondary" onClick={() => setOpen(true)} variant="contained">
            New Schedule
          </Button>
        )}
      />

      <ConfirmDialog
        isOpen={() => setIsConfirmDialogOpen(false)}
        onConfirm={() => mutate(selectedTrainId)}
        open={isConfirmDialogOpen}
        subTitle="This action can not be undone"
        title="Delete User"
        loading={isMutaionLoading}
      />
      <CustomeDialog open={open} setOpen={setOpen} title="Add New Train">
        <AddTrainScheduleForm />
      </CustomeDialog>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Container>
  );
}
