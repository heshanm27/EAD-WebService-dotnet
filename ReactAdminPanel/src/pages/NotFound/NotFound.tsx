import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import React from "react";

export default function NotFound() {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"}>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            404
          </Typography>
          <Divider variant="fullWidth" orientation="vertical" sx={{ ml: 2, mr: 2 }} />
          <Typography variant="h2">This Page Could Not Found</Typography>
        </Stack>
      </Box>
    </Container>
  );
}
