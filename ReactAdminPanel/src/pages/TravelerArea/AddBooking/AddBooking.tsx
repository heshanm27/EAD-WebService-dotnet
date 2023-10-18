import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import moment, { Moment } from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { searchTrains } from "../../../api/trainManagmentApi";
import { STATION_OBJ } from "../../../constant/GlobalConstant";
import CustomCirculerProgress from "../../../components/common/CustomCirculerProgress/CustomCirculerProgress";
import * as Yup from "yup";
import { createBooking } from "../../../api/bookingManagmentApi";
import { useAppSelector } from "../../../redux/redux-hooks";
import CustomSnackBar from "../../../components/common/snackbar/Snackbar";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANT } from "../../../routes/Constatnt";
interface Ticket {
  id: string;
  ticketType: string;
  ticketPrice: number;
  ticketCount: number;
}
interface BookType {
  startStation: string;
  endStation: string;
  departureDate: string;
}
export default function AddBooking() {
  const maxDate = moment().add(30, "days");
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => state.authSlice);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const validationSchema = Yup.object({
    nic: Yup.string().required("NIC is required"),
  });
  const initialFormValues: BookType = {
    startStation: "",
    endStation: "",
    departureDate: "",
  };

  const { handleChange, values, handleBlur, setFieldValue, handleSubmit } = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values) => {
      refetch();
    },
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Booking Added Successfully",
        type: "success",
        title: "Success",
      });
      navigate(ROUTE_CONSTANT.BOOKING_DASHBOARD);
    },
    onError: () => {
      setNotify({
        isOpen: true,
        message: "Booking Added Failed",
        type: "error",
        title: "Error",
      });
    },
  });
  const {
    handleChange: handleChange2,
    values: values2,
    handleBlur: handleBlur2,
    setFieldValue: setFieldValue2,
    handleSubmit: handleSubmit2,
    errors: errors2,
  } = useFormik({
    initialValues: {
      nic: "",
      reservationSeatCount: 1,
      ticket: {
        id: "",
        ticketType: "First Class",
        ticketPrice: 0,
        ticketCount: 0,
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({
        reservationDate: selecedTrain.departureDate,
        reservedTrainID: selecedTrain.id,
        reservedUserId: id,
        reservationSeatCount: values.reservationSeatCount,
        ticket: values.ticket,
      });
      mutate({
        reservationDate: selecedTrain.departureDate,
        reservedTrainID: selecedTrain.id,
        reservedUserId: id,
        reservationSeatCount: values.reservationSeatCount,
        ticket: values.ticket,
      });
    },
  });

  const { refetch, data, isInitialLoading } = useQuery({
    queryKey: ["trains-serach"],
    queryFn: () => searchTrains(values),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const [bookingStep, setBookingStep] = useState(1);
  const [selecedTrain, setSelectedTrain] = useState<any>(null);
  const [selectedTicket, setSelectedTicket] = useState("");

  const handleTicketSelection = (event: any) => {
    setSelectedTicket(event.target.value);
    setFieldValue2(
      "ticket",
      selecedTrain.tickets.filter((tkt: any) => {
        return tkt.ticketType === event.target.value;
      })[0]
    );
  };

  console.log("data", data, "Values", values);

  return (
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mt: 5, mb: 5 }} fontWeight={"bold"}>
        Add New Booking
      </Typography>
      <Paper
        sx={{
          padding: "5%",
          paddingTop: "20px",
        }}
      >
        <Box>
          {bookingStep === 1 && (
            <>
              <Typography variant="h6" fontWeight={"bold"}>
                Step 1: Select Train
              </Typography>
              <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} mt={5}>
                <Stack sx={{ width: "100%" }}>
                  <Typography variant="caption" fontWeight={"bold"}>
                    Select Start Station
                  </Typography>
                  <Select onChange={(val: any) => setFieldValue("startStation", val.value)} options={STATION_OBJ} />
                </Stack>
                <Stack spacing={0} sx={{ width: "100%" }}>
                  <Typography variant="caption" fontWeight={"bold"}>
                    Select End Station
                  </Typography>
                  <Select onChange={(val: any) => setFieldValue("endStation", val.value)} options={STATION_OBJ} />
                </Stack>

                <DatePicker
                  disablePast
                  maxDate={maxDate}
                  sx={{ width: "100%" }}
                  onChange={(newValue: any) => setFieldValue("departureDate", moment(newValue).format("YYYY-MM-DD"))}
                />
                <LoadingButton
                  fullWidth
                  loading={isInitialLoading}
                  onClick={() => {
                    setBookingStep(1);
                    refetch();
                  }}
                  variant="outlined"
                >
                  Search
                </LoadingButton>

                {isInitialLoading ? (
                  <CustomCirculerProgress />
                ) : (
                  <Grid container spacing={2}>
                    {data?.data.map((item: any, index: number) => {
                      return (
                        <Grid item xs={6}>
                          <CardActionArea
                            onClick={() => {
                              console.log(item);
                              setSelectedTrain(item);
                              setBookingStep(2);
                            }}
                          >
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                {item?.trainNumber + " " + item?.trainName}
                              </Typography>
                              <Stack direction="row" spacing={2}>
                                <Stack direction="column">
                                  <Typography>{` Start Station ${item?.startStation}`}</Typography>
                                  <Typography>{`Start Time ${item?.trainStartTime}`}</Typography>
                                </Stack>
                                <Stack direction="column">
                                  <Typography>{` End Station ${item?.endStation}`}</Typography>
                                  <Typography>{` End Time ${item?.trainEndTime}`}</Typography>
                                </Stack>
                              </Stack>
                              {/* <Button
                                variant="contained"
                                onClick={() => {
                                  setSelectedTrain(index);
                                  setBookingStep(2);
                                }}
                              >
                                Book Now
                              </Button> */}
                            </CardContent>
                          </CardActionArea>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </Stack>
            </>
          )}
          {bookingStep === 2 && (
            <>
              <Typography variant="h6" fontWeight={"bold"}>
                Step 2: Select Tickets
              </Typography>
              <Stack spacing={3} mt={5}>
                <TextField
                  name="nic"
                  fullWidth
                  id="user-nic"
                  value={values2.nic}
                  label="NIC"
                  onChange={handleChange2}
                  error={Boolean(errors2.nic)}
                  helperText={errors2.nic}
                ></TextField>

                <TextField
                  name="ticket"
                  fullWidth
                  id="ticket-select"
                  select
                  value={selectedTicket}
                  label="Select Ticket Type"
                  onChange={(e) => {
                    handleTicketSelection(e);
                  }}
                  helperText="Please select the ticket type"
                >
                  {selecedTrain.tickets.map((option: any, index: number) => (
                    <MenuItem key={option.id} value={option.ticketType}>
                      {option.ticketType}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  name="reservationSeatCount"
                  fullWidth
                  id="seat-count"
                  value={values2.reservationSeatCount}
                  label="Select Number Of Tickets"
                  onChange={handleChange}
                  helperText="Please select number of tickets"
                  select
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </TextField>

                <Typography variant="h6" fontWeight={"bold"}>
                  Booking Details
                </Typography>

                {values2.nic !== "" && <Typography fontWeight={"regular"}>{`Ticket Holder NIC : ${values2.nic}`}</Typography>}
                <Typography fontWeight={"regular"}>{`From : ${selecedTrain.startStation}`}</Typography>
                <Typography fontWeight={"regular"}>{`To : ${selecedTrain.endStation}`}</Typography>
                <Typography fontWeight={"regular"}>{`Date : ${selecedTrain.departureDate}`}</Typography>
                {values2.ticket?.ticketPrice !== 0 && <Typography fontWeight={"regular"}>{`Class : ${values2.ticket.ticketType}`}</Typography>}
                {values2.ticket?.ticketPrice !== 0 && <Typography fontWeight={"regular"}>{`Tickets Booked : ${values2.reservationSeatCount}`}</Typography>}
                {values2.ticket?.ticketPrice !== 0 && <Typography fontWeight={"regular"}>{`Ticket price : ${values2.ticket.ticketPrice}`}</Typography>}
                {values2.ticket?.ticketPrice !== 0 && (
                  <Typography fontWeight={"regular"}>{`Total : Rs. ${values2.ticket.ticketPrice * values2.reservationSeatCount}.00`}</Typography>
                )}

                <LoadingButton
                  fullWidth
                  loading={isLoading}
                  onClick={() => {
                    setBookingStep(2);
                    handleSubmit2();
                  }}
                  variant="contained"
                >
                  Book Now
                </LoadingButton>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setBookingStep(1);
                  }}
                >
                  Back
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Paper>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Container>
  );
}
