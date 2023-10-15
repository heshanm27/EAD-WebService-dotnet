import { Box, Button, Container, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useQuery } from "@tanstack/react-query";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { fetchAllProductsForSeller } from "../../../api/productApi";
import { useAppSelector } from "../../../redux/redux-hooks";
import { ROUTE_CONSTANT } from "../../../routes/Constatnt";

export default function AddBooking() {
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["products"], queryFn: fetchAllProductsForSeller });

  const [open, setOpen] = useState(false);
  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "productCode", //access nested data with dot notation
        header: "Product Code",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "name",
        header: "Product Name",
      },
      {
        accessorKey: "price",
        header: "Product Price",
        Cell: ({ renderedCellValue, row }: any) => {
          return "$" + row.original.price.toFixed(2);
        },
      },
      {
        accessorKey: "stock",
        header: "Product Stock",
        Cell: ({ renderedCellValue, row }: any) => {
          return row.original.stock + " units";
        },
      },
    ],
    []
  );

  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mt: 5, mb: 5 }} fontWeight={"bold"}>
        Find Your Train Here
      </Typography>
      <Paper
        sx={{
          height: "800px",
        }}
      ></Paper>
    </Container>
  );
}
