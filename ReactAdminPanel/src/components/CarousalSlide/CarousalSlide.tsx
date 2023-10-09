import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface ICrousalProps {
  title: string;
  description: string;
  image: string;
  url?: string;
  button: string;
}
export default function CarousalSlide({ title, description, image, url, button }: ICrousalProps) {
  const navigate = useNavigate();
  return (
    <Paper>
      <Box height={300}>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ p: 2 }}>
            <Typography variant="h2" fontWeight={"bold"}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ width: "75%", mt: 2 }}>
              {description}
            </Typography>
            {button ? (
              <Button sx={{ mt: 2 }} variant="outlined" onClick={() => (url ? navigate(url) : navigate("/list"))}>
                {button}
              </Button>
            ) : null}
          </Grid>
          <Grid item xs={12} md={6} justifyContent={"end"} alignItems={"end"}>
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
              <img
                style={{
                  width: "40%",
                }}
                src={image}
                alt="random"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
