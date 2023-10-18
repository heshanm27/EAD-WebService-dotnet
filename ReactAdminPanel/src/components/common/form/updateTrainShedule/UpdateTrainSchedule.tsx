import { Box, Button, Chip, Container, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { useFormik } from "formik";
import moment, { Moment } from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTrain, updateTrain } from "../../../../api/trainManagmentApi";
import Select from "react-select";
import { STATION_OBJ } from "../../../../constant/GlobalConstant";
import * as Yup from "yup";
interface TrainData {
  id: string;
  trainName: string;
  trainNumber: string;
  startStation: string;
  endStation: string;
  trainStartTime: string;
  trainEndTime: string;
  departureDate: string;
}

interface UpdateTrainScheduleProps {
  trainData: TrainData;
  setNotify: any;
  closeDialog: any;
}
export default function UpdateTrainSchedule({ trainData, setNotify, closeDialog }: UpdateTrainScheduleProps) {
  const { trainName, trainNumber, startStation, endStation, trainStartTime, trainEndTime, departureDate } = trainData;
  const maxDate = moment().add(30, "days");
  const queryClient = useQueryClient();
  function removeAMPMIndicator(timeString: string): string {
    const timeParts = timeString.split(" ");
    console.log("timeParts", timeParts);
    timeParts.pop(); // remove AM/PM indicator
    return timeParts.join(":");
  }
  const { mutate, isLoading } = useMutation({
    mutationFn: updateTrain,
    onSuccess: () => {
      queryClient.invalidateQueries(["trains"]);
      setNotify({
        isOpen: true,
        message: "Train Updated Successfully",
        type: "success",
        title: "Success",
      });
      closeDialog(false);
    },
    onError: () => {
      setNotify({
        isOpen: true,
        message: "Train Update Failed",
        type: "error",
        title: "Error",
      });
      closeDialog(false);
    },
  });
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
      trainName: trainName,
      trainNumber: trainNumber,
      startStation: startStation,
      endStation: endStation,
      trainStartTime: trainStartTime,
      trainEndTime: trainEndTime,
      departureDate: departureDate,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values", {
        ...values,
        trainEndTime: removeAMPMIndicator(values.trainEndTime),
        trainStartTime: removeAMPMIndicator(values.trainStartTime),
      });
      mutate({
        ...values,
        trainEndTime: moment(values.trainEndTime, "HH:mm").format("HH:mm"),
        trainStartTime: moment(values.trainStartTime, "HH:mm").format("HH:mm"),
        id: trainData.id,
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

          <Select
            defaultValue={{ value: startStation, label: startStation }}
            onChange={(val: any) => setFieldValue("startStation", val.value)}
            options={STATION_OBJ}
          />
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
          <Select
            defaultValue={{ value: endStation, label: endStation }}
            onChange={(val: any) => setFieldValue("endStation", val.value)}
            options={STATION_OBJ}
          />
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
            defaultValue={moment(departureDate, "YYYY-MM-DD")}
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
            defaultValue={moment(trainStartTime, "HH:mm")}
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
            defaultValue={moment(trainEndTime, "HH:mm")}
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
        <LoadingButton fullWidth loading={isLoading} onClick={() => handleSubmit()} variant="outlined">
          Update
        </LoadingButton>
      </Stack>
    </Box>
  );
}
