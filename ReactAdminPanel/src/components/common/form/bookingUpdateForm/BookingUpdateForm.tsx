import { Container, MenuItem, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { getTrainById } from "../../../../api/trainManagmentApi";
import { useFormik } from "formik";
import CustomCirculerProgress from "../../CustomCirculerProgress/CustomCirculerProgress";
import { updateBooking } from "../../../../api/bookingManagmentApi";
import LoadingButton from "@mui/lab/LoadingButton";
import apiClient from "../../../../api/axios";

export default function BookingUpdateForm({ reservation, setOpen, setNotify }: any) {
  const { data, isLoading } = useQuery({
    queryKey: ["booking-tickets"],
    queryFn: () => getTrainById(reservation?.trainResponse?.id),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
  const queryClient = useQueryClient();
  const [selectedTicket, setSelectedTicket] = useState(reservation?.ticket);

  const { handleChange, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      reservationSeatCount: reservation?.reservedSeatCount ?? 1,
      ticket: reservation?.ticket,
    },
    onSubmit: (values) => {
      console.log({
        reservationDate: reservation.reservedDate,
        reservedTrainID: reservation.trainResponse.id,
        reservedUserId: reservation.userResponse.id,
        reservationSeatCount: values.reservationSeatCount,
        ticket: values.ticket,
      });
      //   testMutate();
    },
  });
  const { mutate: testMutate, isLoading: isUpdateing } = useMutation({
    mutationFn: async () => {
      try {
        const updateData: any = {
          reservationDate: reservation.reservedDate,
          reservedTrainID: reservation.trainResponse.id,
          reservedUserId: reservation.userResponse.id,
          reservationSeatCount: values.reservationSeatCount,
          ticket: values.ticket,
        };

        const response = await apiClient.patch(`/reservation/${reservation.id}`, updateData);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["booking"]);
      setNotify({
        isOpen: true,
        message: "Updated Successfully",
        type: "success",
        title: "Success",
      });
      setOpen(false);
    },
    onError: () => {
      setOpen(false);
      setNotify({
        isOpen: true,
        message: "Updated Successfully",
        type: "success",
        title: "Success",
      });
    },
  });

  const handleTicketSelection = (event: any) => {
    setSelectedTicket(event.target.value);

    setFieldValue(
      "ticket",
      data?.data?.tickets?.filter((tkt: any) => {
        return tkt.ticketType === event.target.value;
      })[0]
    );
  };

  if (isLoading) {
    return <CustomCirculerProgress />;
  }

  return (
    <Container>
      {!isLoading && (
        <TextField
          name="ticket"
          fullWidth
          id="ticket-select"
          select
          value={values.ticket.ticketType}
          label="Select Ticket Type"
          onChange={handleTicketSelection}
          helperText="Please select the ticket type"
        >
          {data?.data.tickets?.map((option: any, index: number) => (
            <MenuItem key={option.id} value={option.ticketType}>
              {option.ticketType}
            </MenuItem>
          ))}
        </TextField>
      )}
      <TextField
        name="reservationSeatCount"
        fullWidth
        id="seat-count"
        value={values.reservationSeatCount}
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

      <LoadingButton
        loading={isUpdateing}
        fullWidth
        onClick={() => {
          testMutate();
        }}
        variant="contained"
      >
        Update Booking
      </LoadingButton>
    </Container>
  );
}
