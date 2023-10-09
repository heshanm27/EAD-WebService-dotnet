import { Box, Paper, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface Iprop {
  width: string;
  height: string;
  children?: ReactNode;
}
export default function SummaryCard({ height, width, children }: Iprop) {
  return (
    <Paper>
      <Box sx={{ width: width, height: height }}>{children}</Box>
    </Paper>
  );
}
