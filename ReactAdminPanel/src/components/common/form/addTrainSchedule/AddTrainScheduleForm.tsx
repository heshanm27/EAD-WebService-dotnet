import {
  Box,
  Button,
  Chip,
  Container,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { STATION_ARR } from "../../../../constant/GlobalConstant";
import { useFormik } from "formik";
import moment, { Moment } from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import { addTrain } from "../../../../api/trainManagmentApi";
export default function AddTrainScheduleForm() {
  const maxDate = moment().add(30, "days");

  const { mutate } = useMutation({
    mutationFn: addTrain,
    onSuccess: () => {},
    onError: () => {},
  });

  const { handleChange, values, handleBlur, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {
        trainName: "",
        trainNumber: "",
        startStation: "",
        endStation: "",
        trainStartTime: "",
        trainEndTime: "",
        departureDate: "",
      },
      onSubmit: (values) => {
        mutate(values);
      },
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

  const filteredStartStation = STATION_ARR.filter(
    (option) => option !== selectedStartStataion
  );
  const filteredEndStation = STATION_ARR.filter(
    (option) => option !== selectedEndStation
  );

  const [ticketData, changeTicketData] = useState({
    ticketType: "",
    ticketPrice: "",
    ticketCount: "",
  });

  const [ticketsList, changeTicketsList] = useState([
    {
      ticketType: "",
      ticketPrice: "",
      ticketCount: "",
    },
  ]);

  console.log(ticketData);

  return (
    <Box>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          name="trainName"
          value={values.trainName}
          id="outlined-basic"
          label="Train Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.trainNumber}
          name="trainNumber"
          id="outlined-basic"
          label="Train Number"
          variant="outlined"
          fullWidth
        />
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
          onChange={(newValue: any) =>
            setFieldValue(
              "departureDate",
              moment(newValue).format("YYYY-MM-DD")
            )
          }
        />

        <TimePicker
          sx={{ width: "100%" }}
          label="Train Departure Time"
          ampm={false}
          onChange={(newValue: any) =>
            setFieldValue("trainStartTime", moment(newValue).format("HH:mm"))
          }
        />
        <TimePicker
          sx={{ width: "100%" }}
          label="Train Arrival Time"
          ampm={false}
          onChange={(newValue: any) =>
            setFieldValue("trainEndTime", moment(newValue).format("HH:mm"))
          }
        />

        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            {ticketsList[0].ticketType === ""
              ? ""
              : ticketsList.map((ticket) => (
                  <Chip
                    label={`${ticket.ticketType} : ${ticket.ticketPrice}`}
                    onClick={() => {}}
                    onDelete={() => {}}
                    key={ticket.ticketType}
                  />
                ))}
          </Stack>

          <Stack direction="row" spacing={1}>
            <TextField
              label="Ticket Class"
              variant="outlined"
              onChange={(e) => {
                changeTicketData({ ...ticketData, ticketType: e.target.value });
              }}
            />
            <TextField
              label="Ticket Price"
              variant="outlined"
              onChange={(e) => {
                changeTicketData({
                  ...ticketData,
                  ticketPrice: e.target.value,
                });
              }}
            />
            <TextField
              label="Ticket Count"
              variant="outlined"
              onChange={(e) => {
                changeTicketData({
                  ...ticketData,
                  ticketCount: e.target.value,
                });
              }}
            />
          </Stack>
          <Button
            variant="outlined"
            onClick={() => {
              if (ticketsList[0].ticketType === "") {
                changeTicketsList([ticketData]);
              } else {
                changeTicketsList([...ticketsList, ticketData]);
              }
            }}
          >
            Add Tickets
          </Button>
        </Stack>

        <LoadingButton
          fullWidth
          loading={false}
          onClick={() => handleSubmit()}
          variant="outlined"
        >
          Submit
        </LoadingButton>

        {/* <TimePicker label="Train Departure Time" value={startTime} onChange={(newValue) => setStartTime(newValue)} />
        <TimePicker label="Train Arrival Time" value={endTime} onChange={(newValue) => setEndTime(newValue)} /> */}
      </Stack>
    </Box>
  );
}
