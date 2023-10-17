import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";

import { useFormik } from "formik";
import moment, { Moment } from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import { useQuery } from "@tanstack/react-query";
import { searchTrains } from "../../../api/trainManagmentApi";
import { STATION_ARR } from "../../../constant/GlobalConstant";
import CustomCirculerProgress from "../../../components/common/CustomCirculerProgress/CustomCirculerProgress";
import { Padding } from "@mui/icons-material";

export default function AddBooking() {
  const maxDate = moment().add(30, "days");

  const { handleChange, values, handleBlur, setFieldValue, handleSubmit } =
    useFormik({
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

  const [bookingStep, setBookingStep] = useState(1);
  const [selecedTrain, setSelectedTrain] = useState(0);

  console.log(data);

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
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                mt={5}
              >
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
                  onChange={(newValue: any) =>
                    setFieldValue(
                      "departureDate",
                      moment(newValue).format("YYYY-MM-DD")
                    )
                  }
                />
                <LoadingButton
                  fullWidth
                  loading={false}
                  onClick={() => {
                    setBookingStep(1);
                    // handleSubmit();
                    refetch();
                  }}
                  variant="outlined"
                >
                  Search
                </LoadingButton>

                {false ? (
                  <CustomCirculerProgress />
                ) : (
                  <Grid container spacing={2}>
                    {data?.data.map((item: any, index: number) => {
                      return (
                        <Grid item xs={4}>
                          <CardActionArea>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {item?.trainNumber + " " + item?.trainName}
                              </Typography>
                              <Stack direction="row" spacing={2}>
                                <Typography>
                                  {item?.startStation +
                                    " \n " +
                                    item?.trainStartTime}
                                </Typography>
                                <Typography>
                                  {item?.endStation +
                                    " \n " +
                                    item?.trainEndTime}
                                </Typography>
                              </Stack>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  setSelectedTrain(index);
                                  setBookingStep(2);
                                }}
                              >
                                Book Now
                              </Button>
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
                  // value={values.endStation}
                  value=""
                  label="NIC"
                  onChange={() => {}}
                  helperText="Please select NIC od User"
                ></TextField>
                <TextField
                  name="ticketSelect"
                  fullWidth
                  id="ticket-select"
                  select
                  // value={values.endStation}
                  value=""
                  label="Select Ticket Type"
                  onChange={() => {}}
                  helperText="Please select the number of tickets"
                >
                  {data?.data[selecedTrain].tickets.map((option: any) => (
                    <MenuItem key={option.id} value={option.ticketPrice}>
                      {option.ticketType}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  name="seatCount"
                  fullWidth
                  id="seat-count"
                  // value={values.endStation}
                  value={1}
                  label="Select Number Of Tickets"
                  onChange={() => {}}
                  helperText="Please select end station"
                  select
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </TextField>
                <Button
                  variant="contained"
                  onClick={() => {
                    setBookingStep(2);
                  }}
                >
                  Book Now
                </Button>
                <Button
                  variant="contained"
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
    </Container>
  );
}
