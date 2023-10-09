import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper, Box, FormLabel, useTheme } from "@mui/material";
import { ProvincesInSriLanka } from "../../assets/cosntant/constatn";
import Select from "react-select";
import Navbar from "../../components/common/navbar/navbar";
import Footer from "../../components/common/footer/Footer";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  provience: string;
  postalCode: string;
  phoneno: string;
  password: string;
  confirmpassword: string;
  storename: string;
}
export default function SellerSignUp() {
  const theme = useTheme();
  const { errors, values, touched, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm } = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      provience: "",
      postalCode: "",
      phoneno: "",
      password: "",
      confirmpassword: "",
      storename: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      provience: Yup.string().required("Provience is required"),
      postalCode: Yup.string().required("Postal Code is required"),
      phoneno: Yup.string().required("Phone No is required"),
      password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
      storename: Yup.string().required("Store Name is required"),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: hadnleFormSubmit,
  });

  async function hadnleFormSubmit(values: FormValues, {}: FormikHelpers<FormValues>) {
    console.log(values);
    // await mutate({
    //   phoneno: values.phoneno,
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
    //   storename: values.storename,
    //   avatar,
    //   confirmPassword: values.confirmpassword,
    // });
  }
  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper sx={{ p: 2 }}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.firstName ? true : false}
                      helperText={errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.lastName ? true : false}
                      helperText={errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="storename"
                      required
                      fullWidth
                      id="storename"
                      label="Store Name"
                      autoFocus
                      value={values.storename}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.storename)}
                      helperText={errors.storename}
                    />
                  </Grid>

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
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="phoneno"
                      label="Phone No"
                      name="phoneno"
                      type="tel"
                      autoComplete="tel"
                      value={values.phoneno}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.phoneno)}
                      helperText={errors.phoneno}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.password)}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="confirmpassword"
                      label="Confirm Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={values.confirmpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.confirmpassword)}
                      helperText={errors.confirmpassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* <FormLabel error={Boolean(error)}>
                      {error && (
                        <Typography variant="caption" align="center" color={theme.palette.error.main}>
                          {error.message}
                        </Typography>
                      )}
                    </FormLabel> */}
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Paper>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
