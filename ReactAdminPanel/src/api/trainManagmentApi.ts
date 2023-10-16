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
    const response = await apiClient.get("/train/all");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// interface prop {
//   id: string;
//   value: Train;
// }

export const updateTrain = async (train: any) => {
  try {
    console.log(train.id);
    const response = await apiClient.patch(`/train/${train.id}`, train);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deteteTrain = async (train: any) => {
  try {
    const response = await apiClient.delete(`/train/${train.id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
