import { Box, Container, MenuItem, Stack, TextField } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { STATION_ARR } from "../../../../constant/GlobalConstant";
import { useFormik } from "formik";
import moment, { Moment } from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addTrain, searchTrains } from "../../../../api/trainManagmentApi";
export default function SearchTrainScheduleForm() {
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

  const { refetch } = useQuery({
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

  const filteredStartStation = STATION_ARR.filter((option) => option !== selectedStartStataion);
  const filteredEndStation = STATION_ARR.filter((option) => option !== selectedEndStation);
  return (
    <Box>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
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
          {STATION_ARR.map((option) => (
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
          {STATION_ARR.map((option) => (
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

        {/* <TimePicker label="Train Departure Time" value={startTime} onChange={(newValue) => setStartTime(newValue)} />
        <TimePicker label="Train Arrival Time" value={endTime} onChange={(newValue) => setEndTime(newValue)} /> */}
      </Stack>
    </Box>
  );
}
