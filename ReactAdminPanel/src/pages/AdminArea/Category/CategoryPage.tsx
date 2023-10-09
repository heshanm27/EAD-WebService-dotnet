import {
  Box,
  Button,
  Container,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "../../../api/categoryApi";
import CustomeDialog from "../../../components/common/CustomDialog/CustomDialog";
import AddCategoryForm from "../../../components/common/form/addCategoryForm/AddCategoryForm";
import ConfirmDialog from "../../../components/common/ConfirmDialog/ConfirmDialog";
import CustomSnackBar from "../../../components/common/snackbar/Snackbar";
type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};
// const data: Person[] = [
//   {
//     name: {
//       firstName: "John",
//       lastName: "Doe",
//     },
//     address: "261 Erdman Ford",
//     city: "East Daphne",
//     state: "Kentucky",
//   },
//   {
//     name: {
//       firstName: "Jane",
//       lastName: "Doe",
//     },
//     address: "769 Dominic Grove",
//     city: "Columbus",
//     state: "Ohio",
//   },
//   {
//     name: {
//       firstName: "Joe",
//       lastName: "Doe",
//     },
//     address: "566 Brakus Inlet",
//     city: "South Linda",
//     state: "West Virginia",
//   },
//   {
//     name: {
//       firstName: "Kevin",
//       lastName: "Vandy",
//     },
//     address: "722 Emie Stream",
//     city: "Lincoln",
//     state: "Nebraska",
//   },
//   {
//     name: {
//       firstName: "Joshua",
//       lastName: "Rolluffs",
//     },
//     address: "32188 Larkin Turnpike",
//     city: "Omaha",
//     state: "Nebraska",
//   },
//   {
//     name: {
//       firstName: "Joshua",
//       lastName: "Rolluffs",
//     },
//     address: "32188 Larkin Turnpike",
//     city: "Omaha",
//     state: "Nebraska",
//   },
//   {
//     name: {
//       firstName: "Joshua",
//       lastName: "Rolluffs",
//     },
//     address: "32188 Larkin Turnpike",
//     city: "Omaha",
//     state: "Nebraska",
//   },
//   {
//     name: {
//       firstName: "Joshua",
//       lastName: "Rolluffs",
//     },
//     address: "32188 Larkin Turnpike",
//     city: "Omaha",
//     state: "Nebraska",
//   },
//   {
//     name: {
//       firstName: "Joshua",
//       lastName: "Rolluffs",
//     },
//     address: "32188 Larkin Turnpike",
//     city: "Omaha",
//     state: "Nebraska",
//   },
// ];

export default function CategoryPage() {
  const [open, setOpen] = useState(false);
  const [openConfirmDialog, setConfirmDialog] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const { data, error, isLoading, isError } = useQuery({ queryKey: ["categories"], queryFn: fetchAllCategories });

  // const deleteCategory = useMutation({
  //   mutationFn: SignUpApiCall,
  //   onSuccess: (data) => {
  //     setNotify({
  //       isOpen: true,
  //       message: data.message,
  //       type: "success",
  //       title: "Success",
  //     });
  //     resetForm();
  //   },
  //   onError: (error: any) => {
  //     setNotify({
  //       isOpen: true,
  //       message: error.message,
  //       type: "error",
  //       title: "Error",
  //     });
  //   },
  // });
  // const deleteSubCategory = useMutation({});
  // const updateCategory = useMutation({});
  // const updateSubCategory = useMutation({});
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Category Name",
        enableGlobalFilter: false,
      },
    ],
    []
  );

  const handleDeleteAction = () => {};
  return (
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mt: 5, mb: 5 }}>
        Categories
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
        rowCount={data?.categories.length ?? 0}
        columns={columns}
        data={data?.categories ?? []}
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="justify">Subcategory Name</TableCell>
                    <TableCell align="justify">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.categories[row.index]?.subCategory.map((item: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell align="justify">{item}</TableCell>
                      <TableCell align="justify">
                        <IconButton edge="end" aria-label="delete">
                          <Edit />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => setConfirmDialog(true)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {data?.categories[row.index]?.subCategory.length === 0 && (
                    <TableRow>
                      <TableCell align="center">{"No Sub categories"}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
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
              <IconButton onClick={() => setOpen(true)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => setConfirmDialog(true)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button color="secondary" onClick={() => setOpen(true)} variant="contained">
            Add Category
          </Button>
        )}
      />
      <CustomeDialog open={open} setOpen={setOpen} title={"Create new note"}>
        <AddCategoryForm setOpen={setOpen} />
      </CustomeDialog>
      <ConfirmDialog
        open={openConfirmDialog}
        title="Delete"
        isOpen={() => setConfirmDialog(false)}
        subTitle="Are you sure you want to delete this item?"
        // loading={deleteLoading}
        onConfirm={handleDeleteAction}
      />
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Container>
  );
}
