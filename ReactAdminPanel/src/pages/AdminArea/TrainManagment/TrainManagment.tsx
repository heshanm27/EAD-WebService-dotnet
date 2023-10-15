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
import { useQuery } from "@tanstack/react-query";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { fetchAllProductsForSeller } from "../../../api/productApi";
import { useAppSelector } from "../../../redux/redux-hooks";
import { fetchAllTrains } from "../../../api/trainManagmentApi";

export default function TrainManagment() {
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["trains"],
    queryFn: fetchAllTrains,
  });

  console.log("Train Data", data);

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
        onEditingRowSave={() => {}}
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
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => setOpen(true)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => navigate("/seller/products/add")}
            variant="contained"
          >
            New Schedule
          </Button>
        )}
      />
    </Container>
  );
}
