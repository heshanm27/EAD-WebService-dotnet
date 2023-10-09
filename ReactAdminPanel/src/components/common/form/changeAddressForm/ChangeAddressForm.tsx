import { Container, Grid, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import { ProvincesInSriLanka } from "../../../../assets/cosntant/constatn";
import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import Select from "react-select";
interface FormValues {
  street: string;
  city: string;
  provience: string;
  postalCode: string;
}
export default function ChangeAddressForm() {
  const theme = useTheme();
  const { errors, values, touched, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm } = useFormik<FormValues>({
    initialValues: {
      street: "",
      city: "",
      provience: "",
      postalCode: "",
    },
    validationSchema: Yup.object({
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      provience: Yup.string().required("Provience is required"),
      postalCode: Yup.string().required("Postal Code is required"),
      phoneno: Yup.string().required("Phone No is required"),
    }),
    onSubmit: hadnleFormSubmit,
  });
  //   const { mutate, isLoading, error } = useMutation({
  //     mutationFn: SignUpApiCall,
  //     onSuccess: (data) => {
  //       setNotify({
  //         isOpen: true,
  //         message: data.message,
  //         type: "success",
  //         title: "Success",
  //       });
  //       resetForm();
  //     },
  //     onError: (error: any) => {
  //       setNotify({
  //         isOpen: true,
  //         message: error.message,
  //         type: "error",
  //         title: "Error",
  //       });
  //     },
  //   });

  async function hadnleFormSubmit(values: FormValues, {}: FormikHelpers<FormValues>) {
    // console.log(values);
    // await mutate({
    //   contactNo: values.phoneno,
    //   password: values.password,
    //   email: values.email,
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    //   address: {
    //     street: values.street,
    //     city: values.city,
    //     provience: values.provience,
    //     postalCode: values.postalCode,
    //   },
    //   avatar,
    //   confirmPassword: values.confirmpassword,
    // });
  }
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="street"
            label="Street"
            name="street"
            value={values.street}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.street)}
            helperText={errors.street}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.city)}
            helperText={errors.city}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            name="provience"
            options={ProvincesInSriLanka}
            // value={values.provience}
            onChange={(option: any) => {
              console.log(option);
              setFieldValue("provience", option.value);
            }} // Set formik field value
            onBlur={handleBlur}
            styles={{
              control: (base: any) => ({
                ...base,
                height: 56,
                minHeight: 56,
                borderColor: errors.provience && touched.provience ? theme.palette.error.main : "#ced4da",
                color: errors.provience && touched.provience ? theme.palette.error.main : "#495057",
              }),
              placeholder: (base: any) => ({
                ...base,
                color: errors.provience && touched.provience ? theme.palette.error.main : "#495057",
              }),
            }}
            placeholder="Select Provience"
          />

          {touched.provience && errors.provience && (
            <Typography variant="caption" color={theme.palette.error.main}>
              {errors.provience}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="postalCode"
            label="Postal Code"
            name="postalCode"
            value={values.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.postalCode)}
            helperText={errors.postalCode}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
