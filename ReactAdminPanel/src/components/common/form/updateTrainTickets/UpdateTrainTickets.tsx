import { Box, Button, Chip, Container, MenuItem, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addTrain } from "../../../../api/trainManagmentApi";
import * as Yup from "yup";
interface TicketType {
  id: string;
  ticketType: string;
  ticketPrice: string;
  ticketCount: string;
}
interface TrainData {
  id: string;
  trainName: string;
  trainNumber: string;
  startStation: string;
  endStation: string;
  trainStartTime: string;
  trainEndTime: string;
  departureDate: string;
  tickets: TicketType[];
}

interface UpdateTrainScheduleProps {
  trainData: TrainData;
  setNotify: any;
  closeDialog: any;
}
export default function UpdateTrainTickets({ trainData, setNotify, closeDialog }: UpdateTrainScheduleProps) {
  const { mutate } = useMutation({
    mutationFn: addTrain,
    onSuccess: () => {},
    onError: () => {},
  });
  const [ticketData, changeTicketData] = useState({
    ticketType: "",
    ticketPrice: "",
    ticketCount: "",
  });
  const validationSchema = Yup.object({
    ticketType: Yup.string().required("Ticket type is required"),
    ticketPrice: Yup.number().typeError("Ticket price must be a number").required("Ticket price is required"),
    ticketCount: Yup.number()
      .typeError("Ticket count must be a number")
      .required("Ticket count is required")
      .positive("Ticket count must be a positive number"),
  });

  const [ticketsList, changeTicketsList] = useState<any>(trainData.tickets);

  const { handleChange, values, handleBlur, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      ticketType: "",
      ticketPrice: "",
      ticketCount: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      changeTicketsList([...ticketsList, values]);
      console.log(values, "values");
    },
  });

  return (
    <Box>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            {ticketsList.length === 0
              ? ""
              : ticketsList.map((ticket: any) => (
                  <Chip
                    label={`${ticket.ticketType} : ${ticket.ticketPrice}`}
                    onClick={() => {
                      setFieldValue("ticketType", ticket.ticketType);
                      setFieldValue("ticketPrice", ticket.ticketPrice);
                      setFieldValue("ticketCount", ticket.ticketCount);
                    }}
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
              name="ticketType"
              value={values.ticketType}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.ticketType)}
              helperText={errors.ticketType}
            />
            <TextField
              label="Ticket Price"
              variant="outlined"
              name="ticketPrice"
              value={values.ticketPrice}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.ticketPrice)}
              helperText={errors.ticketPrice}
            />
            <TextField
              label="Ticket Count"
              variant="outlined"
              name="ticketCount"
              value={values.ticketCount}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.ticketCount)}
              helperText={errors.ticketCount}
            />
          </Stack>
          <Button variant="outlined" onClick={() => handleSubmit()}>
            Add Tickets
          </Button>
          <Button variant="outlined" onClick={() => handleSubmit()}>
            Update Train
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
