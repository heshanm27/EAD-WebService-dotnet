import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../api/axios";
import CustomSnackBar from "../../components/common/snackbar/Snackbar";

export default function VerifyArea() {
  const params = useParams();
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const [error, setError] = React.useState<string | null>(null);
  const hadnleClick = async () => {
    try {
      const res = await apiClient.get(`/auth/verify/${params.token}`);
      //   console.log("navigate");
      //   setNotify({
      //     isOpen: true,
      //     message: "Account Verified Successfully",
      //     type: "error",
      //     title: "Error",
      //   });
      navigate(res.data.redirectUrl, { replace: true, state: { from: res.data.redirectUrl, message: res.data.message } });
    } catch (error: any) {
      setNotify({
        isOpen: true,
        message: error.response.data.message,
        type: "error",
        title: "Error",
      });
      setError(error.response.data.message);
    }
  };
  console.log("VerifyArea -> location", params);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ width: "500px", height: "200px", p: 4 }}>
          <Typography align="center">Verify Your Account</Typography>
          <Stack direction={"row"} spacing={2} sx={{ mt: 5 }}>
            <Button variant="outlined" fullWidth onClick={() => navigate("/", { replace: true })}>
              Cancle
            </Button>
            <Button variant="contained" fullWidth onClick={hadnleClick}>
              Verify
            </Button>
          </Stack>
          {error && (
            <Typography align="center" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Paper>
      </Box>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Container>
  );
}
