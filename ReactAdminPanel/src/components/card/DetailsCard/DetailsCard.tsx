import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  value: number;
  Icon: any;
  color: string;
  animate?: boolean;
  iconColor?: string;
}
export default function DetailsCard({ title, value, Icon, color, animate, iconColor }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack direction={"row"} justifyContent={"space-evenly"} alignItems={"baseline"} spacing={5}>
        <Box
          sx={{
            borderRadius: "50%",
            backgroundColor: color,

            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80px",
            height: "80px",
          }}
        >
          <FontAwesomeIcon icon={Icon} size="xl" bounce={animate && value > 0 ? true : false} repeatCount={1} color={iconColor ? iconColor : "#212121"} />
        </Box>

        <Stack direction={"column"}>
          <Typography variant="h2" fontWeight={"bold"} align="center">
            {value}
          </Typography>
          <Typography variant="caption" noWrap>
            {title}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
