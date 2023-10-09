import {
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  CircularProgress,
  FormLabel,
  useTheme,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import { addCategory } from "../../../../api/categoryApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomSnackBar from "../../snackbar/Snackbar";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
const SubCategories = ["Sub Category 1", "Sub Category 2", "Sub Category 3"];
interface FormValues {
  name: string;
}
interface Props {
  setOpen: (open: boolean) => void;
}
export default function AddCategoryForm({ setOpen }: Props) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [subCategoryValue, setSubCategoryValue] = useState<string>("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const { errors, values, handleChange, handleBlur, handleSubmit, resetForm } = useFormik<FormValues>({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required"),
    }),
    onSubmit: hadnleFormSubmit,
  });

  const { mutate, isLoading, error } = useMutation({
    mutationFn: addCategory,

    onSuccess: (data) => {
      queryClient.invalidateQueries(["categories"]);
      setNotify({
        isOpen: true,
        message: data.message,
        type: "success",
        title: "Success",
      });
      resetForm();
      setOpen(false);
    },
    onError: (error: any) => {
      setNotify({
        isOpen: true,
        message: error.message,
        type: "error",
        title: "Error",
      });
    },
  });

  async function hadnleFormSubmit(values: FormValues, formikHelpers: FormikHelpers<FormValues>) {
    await mutate({
      name: values.name,
      subCategory,
    });
  }

  const handleAddSubCategory = () => {
    if (subCategoryValue && !subCategory.includes(subCategoryValue)) {
      setSubCategory((prev) => [...prev, subCategoryValue]);
      setSubCategoryValue("");
    }
  };

  const handleDeleteSubCategory = (subCategory: string) => {
    setSubCategory((prev) => prev.filter((item) => item !== subCategory));
  };
  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Categorey Name"
        value={values.name}
        name="name"
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
      />

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Add Sub Categories
      </Typography>
      <Stack direction={"row"} spacing={2} sx={{ p: 2 }}>
        <TextField fullWidth label="Sub Categorey Name" name="subCategorey" value={subCategoryValue} onChange={(e) => setSubCategoryValue(e.target.value)} />
        <Button variant="contained" endIcon={<AddIcon />} onClick={handleAddSubCategory}>
          Add
        </Button>
      </Stack>
      <List>
        {subCategory.map((sub) => {
          return (
            <ListItem
              key={sub}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSubCategory(sub)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={sub} />
            </ListItem>
          );
        })}
      </List>

      <Button color="primary" fullWidth sx={{ mt: 2 }} variant="contained" type="submit">
        {isLoading ? <CircularProgress /> : "Add Category"}
      </Button>
      <FormLabel error={Boolean(error)}>
        {error && (
          <Typography variant="caption" align="center" color={theme.palette.error.main}>
            {error.message}
          </Typography>
        )}
      </FormLabel>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Box>
  );
}
