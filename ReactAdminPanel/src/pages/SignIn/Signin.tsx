import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CustomSnackBar from "../../components/common/snackbar/Snackbar";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import apiClient from "../../api/axios";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { login } from "../../redux/auth/authslice";
import { ROUTE_CONSTANT } from "../../routes/Constatnt";
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
  email: string;
  password: string;
}

export default function SignIn() {
  const dispatch = useAppDispatch();
  const { errors, values, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
    }),
    onSubmit: hadnleFormSubmit,
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  async function hadnleFormSubmit(values: FormValues, {}: FormikHelpers<FormValues>) {
    try {
      const resposne = await apiClient.post("/auth/signIn", values);
      console.log(values);
      dispatch(login(resposne.data));
      resetForm();
    } catch (e: any) {
      console.log("error", e);
      setNotify({
        isOpen: true,
        message: e.response.data.message,
        type: "error",
        title: "Error            ",
      });
    }

    // await mutate({
    //   password: values.password,
    //   email: values.email,

    // });
  }

  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, role } = useAppSelector((state) => state.authSlice);
  useEffect(() => {
    if (location.state) {
      setNotify({
        isOpen: true,
        message: location.state.message,
        type: "success",
        title: "Success            ",
      });
    }
  }, [location]);

  // useEffect(() => {
  //   switch (role) {
  //     case "admin":
  //       navigate("/admin/orders/live", { replace: true, preventScrollReset: true });
  //       return;
  //     case "seller":
  //       navigate("/seller/orders/live", { replace: true, preventScrollReset: true });
  //       return;
  //     case "user":
  //       navigate("/", { replace: true });
  //       return;
  //   }
  // }, [isLoggedIn]);
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            height: "80vh",
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
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href={ROUTE_CONSTANT.REGISTER} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Paper>
        </Box>
        <CustomSnackBar notify={notify} setNotify={setNotify} />
      </Container>
    </>
  );
}
