import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomeDialog({ open, setOpen, children, title }: any) {
  const theme = useTheme();

  //style objects
  const displaywraper = {
    position: "absolute",
    top: 10,
  };

  const iconbtn = {
    "&.MuiIconButton-colorPrimary": {
      color: theme.palette.error.light,
    },
    "&:hover": {
      backgroundColor: "#ffcdd2",
    },
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth sx={displaywraper} maxWidth={"md"}>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography variant="h5">{title}</Typography>
          <IconButton color="primary" sx={iconbtn} onClick={() => setOpen(false)} size="large">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
