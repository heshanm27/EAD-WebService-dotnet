import apiClient from "./axios";

interface TicketData {
  id: "string";
  ticketType: "string";
  ticketPrice: number;
  ticketCount: number;
  ticketBooked: number;
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
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
}

export interface Booking {
  id: string;
  reservedDate: string;
  isActive: boolean;
  reservedSeatCount: number;
  ticket: TicketData;
  reservationPrice: number;
  createdAt: string;
  userResponse: UserData;
  trainResponse: TrainData;
}

interface BookingData {
  data: Booking[];
}

export const fetchAllBooking = async (): Promise<BookingData> => {
  try {
    const response = await apiClient.get("/reservation");
    console.log("Booking Data", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

interface UpdateBooking {
  reservationDate: string;
  reservedTrainID: string;
  reservedUserId: string;
  reservationSeatCount: number;
  ticket: TicketData;
}

export const updateBooking = async (booking: any) => {
  try {
    const updateData: UpdateBooking = {
      reservationDate: booking.reservedDate,
      reservedTrainID: booking.trainResponse.id,
      reservedUserId: booking.userResponse.id,
      reservationSeatCount: booking.reservedSeatCount,
      ticket: booking.ticket,
    };

    console.log("inside api call", updateData);
    console.log("ID", booking.id);

    const response = await apiClient.patch(`/reservation/${booking.id}`, updateData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteBooking = async (id: any) => {
  try {
    const response = await apiClient.delete(`/reservation/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const createBooking = async (booking: any) => {
  try {
    const createData: UpdateBooking = {
      ...booking,
    };

    console.log("Create data", createData);

    const response = await apiClient.post(`/reservation`, createData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
