import React, { useState, ChangeEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Paper, useTheme } from "@mui/material";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { ProvincesInSriLanka } from "../../assets/cosntant/constatn";
import { useNavigate } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import CircularProgress from "@mui/material/CircularProgress";
import { SignUpApiCall } from "../../api/authApi";
import CustomSnackBar from "../../components/common/snackbar/Snackbar";
import Navbar from "../../components/common/navbar/navbar";
import Footer from "../../components/common/footer/Footer";
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        NaturaAyur
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
  phoneno: string;
  password: string;
  confirmpassword: string;
}
export default function SignUp() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const { errors, values, touched, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm } = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneno: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phoneno: Yup.string().required("Phone No is required"),
      password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: hadnleFormSubmit,
  });
  const { mutate, isLoading, error } = useMutation({
    mutationFn: SignUpApiCall,
    onSuccess: (data) => {
      setNotify({
        isOpen: true,
        message: data.message,
        type: "success",
        title: "Success",
      });
      resetForm();
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

  const [avatar, setAvatar] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  async function hadnleFormSubmit(values: FormValues, {}: FormikHelpers<FormValues>) {
    console.log(values);
    await mutate({
      contactNo: values.phoneno,
      password: values.password,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      avatar,
      confirmPassword: values.confirmpassword,
    });
  }

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            height: "90vh",
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5" color={theme.palette.primary.main}>
                Sign up
              </Typography>
              <label htmlFor="image-input">
                <Avatar src={avatar ? URL.createObjectURL(avatar) : ""} sx={{ width: 120, height: 120 }}>
                  {!avatar && <CameraAltIcon />}
                </Avatar>
              </label>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} id="image-input" />
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
                  {/* <Grid item xs={12}>
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
                  </Grid> */}
                  <Grid item xs={12} sm={12}>
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
                    <FormLabel error={Boolean(error)}>
                      {error && (
                        <Typography variant="caption" align="center" color={theme.palette.error.main}>
                          {error.message}
                        </Typography>
                      )}
                    </FormLabel>
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {!isLoading ? "Sign Up" : <CircularProgress color="inherit" />}
                </Button>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Link href="/register/seller" variant="body2">
                      Register as Seller
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Paper>
        </Box>
        <CustomSnackBar notify={notify} setNotify={setNotify} />
      </Container>
      <Footer />
    </>
  );
}
