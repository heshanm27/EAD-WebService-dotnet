import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import "react-medium-image-zoom/dist/styles.css";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAllCategories, fetchSubCategory } from "../../../../api/categoryApi";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CustomSnackBar from "../../snackbar/Snackbar";
import { addProduct } from "../../../../api/productApi";
import { useNavigate } from "react-router-dom";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function AddProductForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const [mainCategoryOption, setMainCategoryOption] = useState<any>([]);
  const [subCategoryOption, setSubCategoryOption] = useState<any>([]);
  const [richText, setRichText] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const { data: categorey, error, isLoading: categoreyIsLoading, isError } = useQuery({ queryKey: ["mainCategory"], queryFn: fetchAllCategories });
  const productMutatuion = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      navigate("/seller/products");
    },
    onError: (error: any) => {
      console.log("error", error);
      setNotify({
        isOpen: true,
        message: error.message,
        type: "error",
        title: "Error",
      });
    },
  });
  // Formik validation schema
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Product Name is required"),
    productBrand: Yup.string().required("Product Brand is required"),
    productPrice: Yup.number().required("Product Price is required").min(1, "Minimum value is 1").max(100000, "Maximum value is 100000"),
    productQuantity: Yup.number().required("Product Quantity is required").min(1, "Minimum value is 0").max(10000, "Maximum value is 10000"),
  });

  // Formik form state and submission logic
  const { values, handleSubmit, errors, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {
      productName: "",
      productBrand: "",
      productPrice: 1,
      productQuantity: 1,
      mainCategory: "",
      subCategory: [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(selectedFiles);
      productMutatuion.mutate({
        name: values.productName,
        price: values.productPrice,
        stock: values.productQuantity,
        category: values.mainCategory,
        subCategory: values.subCategory,
        description: richText,
        images: selectedFiles,
        brand: values.productBrand,
      });
    },
  });

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles),
    maxFiles: 6,
    multiple: true,
    accept: { "image/jpeg": [".jpeg", ".png"] },
    maxSize: 1000000,
  });

  const handleDrop = (acceptedFiles: any) => {
    // Create an array from the acceptedFiles object

    // Calculate the total number of files after adding the new files
    const totalFiles = selectedFiles.length + acceptedFiles.length;

    // If the total number of files exceeds 6, show an error or take appropriate action
    if (totalFiles > 6) {
      setNotify({
        isOpen: true,
        message: "You can only upload 6 images",
        type: "error",
        title: "Error",
      });
      // You can replace this with your desired action
      return;
    }
    const newFiles = Array.from(acceptedFiles);
    // Add the new files to the selectedFiles array
    setSelectedFiles([...selectedFiles, ...newFiles]);
  };

  const handleRemoveImage = (index: any) => {
    // Remove image from selectedFiles array
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleEditorChange = (content: any, editor: any) => {
    if (editorRef.current) {
      setRichText(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    if (categorey) {
      setMainCategoryOption(categorey?.categories.map((item: any) => ({ value: item._id, label: item.name })));
    }
    if (values.mainCategory) {
      const foundCategory = categorey?.categories?.find((item: any) => item._id === values.mainCategory);
      setSubCategoryOption(foundCategory?.subCategory?.map((item: any) => ({ value: item, label: item })));
    }
  }, [categorey, values]);

  if (categoreyIsLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item xs={12} sm={6}>
            <Stack direction={"column"} spacing={2}>
              <TextField
                label="Product Name"
                name="productName"
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus={errors.productName ? true : false}
                helperText={errors.productName ? errors.productName : null}
                error={errors.productName ? true : false}
              />
              <TextField
                label="Product Brand"
                name="productBrand"
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus={errors.productBrand ? true : false}
                helperText={errors.productBrand ? errors.productBrand : null}
                error={errors.productBrand ? true : false}
              />
              <TextField
                label="Product Price"
                name="productPrice"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                defaultValue={1}
                onBlur={handleBlur}
                autoFocus={errors.productPrice ? true : false}
                helperText={errors.productPrice ? errors.productPrice : null}
                error={errors.productPrice ? true : false}
                inputProps={{ min: "1", max: "100000", step: ".01" }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction={"column"} spacing={2}>
              <TextField
                type="number"
                label="Product Quantity"
                name="productQuantity"
                defaultValue={1}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus={errors.productQuantity ? true : false}
                helperText={errors.productQuantity ? errors.productQuantity : null}
                error={errors.productQuantity ? true : false}
                inputProps={{ min: "0", max: "10000" }}
              />
              <Box>
                <Typography>Select Main Categorey</Typography>
                <Select
                  name="mainCategory"
                  options={mainCategoryOption}
                  // value={values.mainCategory}
                  onChange={(option: any) => {
                    console.log(values.mainCategory);
                    setFieldValue("mainCategory", option.value);
                  }}
                  onBlur={handleBlur}
                />
              </Box>
              <Box>
                <Typography>Select Sub Categorey</Typography>
                <Select
                  isMulti
                  name="mainCategory"
                  isDisabled={subCategoryOption?.length < 0 || !values?.mainCategory ? true : false}
                  // value={values.subCategory}
                  options={subCategoryOption}
                  onChange={(item: any) => setFieldValue("subCategory", item)}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onBlur={handleBlur}
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                border: `2px dashed ${theme.palette.primary.main}`,
                borderRadius: theme.shape.borderRadius,
                padding: theme.spacing(2),
                textAlign: "center",
                alignItems: "center",
                cursor: "pointer",
                height: "400px",
                display: "flex", // Add display:flex
                justifyContent: "center", // Add justifyContent: center
              }}
              {...getRootProps()}
              ref={dropzoneRef}
            >
              <input {...getInputProps()} />
              {selectedFiles.length === 0 ? (
                <Typography variant="body1" align="center" color="textSecondary">
                  Drag and drop files here, or click to select files
                </Typography>
              ) : (
                <ImageList sx={{ height: "100%", overflow: "auto" }} cols={3} rowHeight={200}>
                  {selectedFiles.map((file: any, index: any) => (
                    <ImageListItem key={file.img}>
                      <img src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: "100%", maxHeight: "100%" }} loading="lazy" />
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        style={{ position: "absolute", top: 0, right: 0, backgroundColor: "white" }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography>Product Description</Typography>
            <Editor
              onInit={(evt, editor) => (editorRef!.current = editor)}
              onChange={handleEditorChange}
              apiKey="dzmmscs8w6nirjr0qay6mkqd0m5h0eowz658h3g6me0qe9s9"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help" +
                  "| image",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </Grid>
          <Grid item xs={8} justifyContent={"center"} alignItems={"center"}>
            <Button fullWidth variant="contained" type="submit" disabled={productMutatuion.isLoading ? true : false}>
              {productMutatuion.isLoading ? <CircularProgress /> : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Paper>
  );
}
