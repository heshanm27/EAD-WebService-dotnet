import { Skeleton, Divider, Stack } from "@mui/material";
import React from "react";

export default function SkeltonCard() {
  return (
    <Stack spacing={1}>
      <Skeleton animation={"wave"} variant="rectangular" width={280} height={280} />
      <Skeleton animation={"wave"} variant="rounded" width={280} height={60} />
    </Stack>
  );
}
