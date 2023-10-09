import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import { Snackbar } from "@mui/material";

export default function CustomSnackBar({ notify, setNotify }: any) {
  const handleClose = () => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert variant="filled" severity={notify ? notify.type : "info"} onClose={handleClose}>
        <AlertTitle>{notify.title}</AlertTitle>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
