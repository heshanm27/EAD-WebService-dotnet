import { Box, Button, Chip, Container, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { STATION_OBJ } from "../../../../constant/GlobalConstant";
import { useFormik } from "formik";
import moment, { Moment } from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTrain } from "../../../../api/trainManagmentApi";
import Select from "react-select";
import * as Yup from "yup";
interface TicketType {
  ticketType: string;
  ticketPrice: string;
  ticketCount: string;
}
export default function AddTrainScheduleForm({ closeDialog, setNotify }: any) {
  const maxDate = moment().add(30, "days");
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: addTrain,
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Train Added Successfully",
        type: "success",
        title: "Success",
      });
      closeDialog(false);
      queryClient.invalidateQueries(["trains"]);
    },
    onError: () => {
      setNotify({
        isOpen: true,
        message: "Train Added Failed",
        type: "error",
        title: "Error",
      });
      closeDialog(false);
    },
  });
  const [ticketData, changeTicketData] = useState({
    ticketType: "",
    ticketPrice: "",
    ticketCount: "",
  });

  const [ticketsList, changeTicketsList] = useState<any>([]);
  const validationSchema = Yup.object({
    trainName: Yup.string().required("Train name is required"),
    trainNumber: Yup.string().required("Train number is required"),
    startStation: Yup.string().required("Start station is required"),
    endStation: Yup.string().required("End station is required"),
    trainStartTime: Yup.string().required("Train start time is required"),
    trainEndTime: Yup.string().required("Train end time is required"),
    departureDate: Yup.date().required("Departure date is required"),
  });

  const { handleChange, values, handleBlur, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      trainName: "",
      trainNumber: "",
      startStation: "",
      endStation: "",
      trainStartTime: "",
      trainEndTime: "",
      departureDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate({
        ...values,
        tickets: ticketsList,
      });
    },
  });

  return (
    <Box>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          name="trainName"
          value={values.trainName}
          id="outlined-basic"
          label="Train Name"
          variant="outlined"
          fullWidth
          error={Boolean(errors.trainName)}
          helperText={errors.trainName}
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
          error={Boolean(errors.trainNumber)}
          helperText={errors.trainNumber}
        />
        <Stack sx={{ width: "100%" }}>
          <Typography variant="caption">Select Start Station</Typography>

          <Select onChange={(val: any) => setFieldValue("startStation", val.value)} options={STATION_OBJ} />
          {errors.startStation && (
            <div>
              {
                <Typography variant="caption" color="red">
                  {errors.startStation}{" "}
                </Typography>
              }
            </div>
          )}
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Typography variant="caption">Select End Station</Typography>
          <Select onChange={(val: any) => setFieldValue("endStation", val.value)} options={STATION_OBJ} />
          {errors.endStation && (
            <div>
              {
                <Typography variant="caption" color="red">
                  {errors.endStation}{" "}
                </Typography>
              }
            </div>
          )}
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <DatePicker
            disablePast
            maxDate={maxDate}
            sx={{ width: "100%" }}
            onChange={(newValue: any) => setFieldValue("departureDate", moment(newValue).format("YYYY-MM-DD"))}
          />
          {errors.departureDate && (
            <div>
              {
                <Typography variant="caption" color="red">
                  {errors.departureDate}{" "}
                </Typography>
              }
            </div>
          )}
        </Stack>

        <Stack sx={{ width: "100%" }}>
          <TimePicker
            sx={{ width: "100%" }}
            label="Train Departure Time"
            ampm={false}
            onChange={(newValue: any) => setFieldValue("trainStartTime", moment(newValue).format("HH:mm"))}
          />
          {errors.startStation && (
            <div>
              {
                <Typography variant="caption" color="red">
                  {errors.trainStartTime}{" "}
                </Typography>
              }
            </div>
          )}
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <TimePicker
            sx={{ width: "100%" }}
            label="Train Arrival Time"
            ampm={false}
            onChange={(newValue: any) => setFieldValue("trainEndTime", moment(newValue).format("HH:mm"))}
          />
          {errors.trainEndTime && (
            <div>
              {
                <Typography variant="caption" color="red">
                  {errors.trainEndTime}{" "}
                </Typography>
              }
            </div>
          )}
        </Stack>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            {ticketsList.length === 0
              ? ""
              : ticketsList.map((ticket: any) => (
                  <Chip
                    label={`${ticket.ticketType} : ${ticket.ticketPrice}`}
                    onClick={() => {}}
                    onDelete={() => {
                      changeTicketsList(ticketsList.filter((t: any) => t.ticketType !== ticket.ticketType));
                    }}
                    key={ticket.ticketType}
                  />
                ))}
          </Stack>
          <Stack direction="row" spacing={1}>
            <TextField
              label="Ticket Class"
              variant="outlined"
              required
              onChange={(e) => {
                changeTicketData({ ...ticketData, ticketType: e.target.value });
              }}
            />
            <TextField
              label="Ticket Price"
              variant="outlined"
              required
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
              required
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
              if (ticketsList.length === 0) {
                changeTicketsList([ticketData]);
              } else {
                changeTicketsList([...ticketsList, ticketData]);
              }
            }}
          >
            Add Tickets
          </Button>
          {ticketsList.length === 0 && <Typography variant="caption">Please add at least one ticket</Typography>}
        </Stack>

        <LoadingButton fullWidth loading={isLoading} onClick={() => handleSubmit()} variant="outlined">
          Submit
        </LoadingButton>

        {/* <TimePicker label="Train Departure Time" value={startTime} onChange={(newValue) => setStartTime(newValue)} />
        <TimePicker label="Train Arrival Time" value={endTime} onChange={(newValue) => setEndTime(newValue)} /> */}
      </Stack>
    </Box>
  );
}
