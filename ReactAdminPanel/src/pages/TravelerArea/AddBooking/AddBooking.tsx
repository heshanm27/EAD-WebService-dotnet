import { Box, Card, CardActionArea, CardContent, Container, Grid, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";

import { useFormik } from "formik";
import moment, { Moment } from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import { useQuery } from "@tanstack/react-query";
import { searchTrains } from "../../../api/trainManagmentApi";
import { STATION_ARR } from "../../../constant/GlobalConstant";
import CustomCirculerProgress from "../../../components/common/CustomCirculerProgress/CustomCirculerProgress";

export default function AddBooking() {
  const maxDate = moment().add(30, "days");

  const { handleChange, values, handleBlur, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      startStation: "",
      endStation: "",
      departureDate: "",
    },
    onSubmit: (values) => {
      refetch();
    },
  });

  const { refetch, data, isLoading } = useQuery({
    queryKey: ["trains-serach"],
    queryFn: () => searchTrains(values),
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const [selectedStartStataion, setSelectedStartStataion] = useState("");
  const [selectedEndStation, setSelectedEndStation] = useState("");

  const handleStartStataion = (event: any) => {
    console.log("startStation", event.target.value);
    setSelectedStartStataion(event.target.value);
    setFieldValue("startStation", event.target.value);
  };

  const handleEndStation = (event: any) => {
    setSelectedEndStation(event.target.value);
    setFieldValue("endStation", event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mt: 5, mb: 5 }} fontWeight={"bold"}>
        Add New Booking
      </Typography>
      <Paper
        sx={{
          height: "800px",
          padding: "5%",
          paddingTop: "5px",
        }}
      >
        <Box>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} mt={5}>
            <TextField
              fullWidth
              id="filled-select-currency"
              name="startStation"
              value={values.startStation}
              select
              label="Select"
              onChange={handleStartStataion}
              helperText="Please select start station"
              variant="filled"
            >
              {STATION_ARR.map((option: any) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="endStation"
              fullWidth
              id="filled-select-currency"
              value={values.endStation}
              select
              label="Select"
              onChange={handleEndStation}
              helperText="Please select end station"
              variant="filled"
            >
              {STATION_ARR.map((option: any) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker
              disablePast
              maxDate={maxDate}
              sx={{ width: "100%" }}
              onChange={(newValue: any) => setFieldValue("departureDate", moment(newValue).format("YYYY-MM-DD"))}
            />
            <LoadingButton fullWidth loading={false} onClick={() => handleSubmit()} variant="outlined">
              Search
            </LoadingButton>

            {false ? (
              <CustomCirculerProgress />
            ) : (
              <Grid container spacing={2}>
                {data?.data.map((item: any) => {
                  return (
                    <Grid item xs={4}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {item?.trainNumber + " " + item?.trainName}
                          </Typography>
                          <Stack direction="row" spacing={2}>
                            <Typography>{item?.startStation + " \n " + item?.trainStartTime}</Typography>
                            <Typography>{item?.endStation + " \n " + item?.trainEndTime}</Typography>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
