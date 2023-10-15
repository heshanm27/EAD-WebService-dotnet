import apiClient from "./axios";

interface Ticket {
  id: "string";
  ticketType: "string";
  ticketPrice: 0;
  ticketCount: 0;
  ticketBooked: 0;
}

export interface Train {
  id: string;
  trainName: string;
  trainNumber: string;
  startStation: string;
  endStation: string;
  trainStartTime: string;
  trainEndTime: string;
  departureDate: string;
  tickets: Ticket[];
  reservations: string[];
  isActive: boolean;
  isPublished: boolean;
}

export interface TrainData {
  data: Train[];
  status: boolean;
  message: string;
}

export const fetchAllTrains = async (): Promise<TrainData> => {
  try {
    const response = await apiClient.get("/train", {
      params: {
        Page: 1,
        PageSize: 10,
        Order: "asc",
        start: "Ahangama",
        end: "Aluthgama",
        date: "2023-10-23",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const fetchUser = async (id: string) => {
  try {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

interface prop {
  id: string;
  value: any;
}
export const updateUser = async ({ id, value }: prop) => {
  try {
    const response = await apiClient.patch(`/user/${id}`, value);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
