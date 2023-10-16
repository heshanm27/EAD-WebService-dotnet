import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useQuery } from "@tanstack/react-query";
import { Delete, Edit, Label, Padding } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { fetchAllProductsForSeller } from "../../../api/productApi";
import { useAppSelector } from "../../../redux/redux-hooks";
import { ROUTE_CONSTANT } from "../../../routes/Constatnt";

export default function AddBooking() {
  // const navigate = useNavigate();
  // const { data, error, isLoading, isError } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: fetchAllProductsForSeller,
  // });

  const [open, setOpen] = useState(false);
  // const columns = useMemo<MRT_ColumnDef[]>(
  //   () => [
  //     {
  //       accessorKey: "productCode", //access nested data with dot notation
  //       header: "Product Code",
  //       enableGlobalFilter: false,
  //     },
  //     {
  //       accessorKey: "name",
  //       header: "Product Name",
  //     },
  //     {
  //       accessorKey: "price",
  //       header: "Product Price",
  //       Cell: ({ renderedCellValue, row }: any) => {
  //         return "$" + row.original.price.toFixed(2);
  //       },
  //     },
  //     {
  //       accessorKey: "stock",
  //       header: "Product Stock",
  //       Cell: ({ renderedCellValue, row }: any) => {
  //         return row.original.stock + " units";
  //       },
  //     },
  //   ],
  //   []
  // );

  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mt: 5, mb: 5 }} fontWeight={"bold"}>
        Add New Booking
      </Typography>
      <Paper
        sx={{
          height: "800px",
          padding: "5%",
          paddingTop: "5px",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }} fontWeight={"regular"}>
            Select Schedule
          </Typography>

          <FormControl fullWidth>
            <Select id="demo-simple-select" value={10} onChange={() => {}}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6" sx={{ mt: 2, mb: 2 }} fontWeight={"regular"}>
            Select Class
          </Typography>

          <FormControl fullWidth>
            <Select id="demo-simple-select" value={10} onChange={() => {}}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6" sx={{ mt: 2, mb: 2 }} fontWeight={"regular"}>
            Number Of Tickets
          </Typography>

          <FormControl fullWidth>
            <Select id="demo-simple-select" value={10} onChange={() => {}}>
              <MenuItem value={10}>One</MenuItem>
              <MenuItem value={20}>Two</MenuItem>
              <MenuItem value={30}>Three</MenuItem>
              <MenuItem value={30}>Four</MenuItem>
              <MenuItem value={30}>Five</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth style={{ marginTop: "20px" }}>
            <Button variant="contained">Contained</Button>
          </FormControl>
        </Box>
      </Paper>
    </Container>
  );
}
