import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import AddProductForm from "../../components/common/form/addProductForm/addProductForm";

export default function AddProduct() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 5, pb: 5 }}>
        <Typography variant="h4">Add New Product</Typography>
      </Box>
      <Stack>
        <AddProductForm />
      </Stack>
    </Container>
  );
}
