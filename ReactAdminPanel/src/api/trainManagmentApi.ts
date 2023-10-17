import apiClient from "./axios";

export interface Ticket {
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

interface AddTicket {
  ticketType: string;
  ticketPrice: number;
  ticketCount: number;
}

interface AddTrainData {
  trainName: string;
  trainNumber: string;
  startStation: string;
  endStation: string;
  trainStartTime: string;
  trainEndTime: string;
  departureDate: string;
  tickets: AddTicket[];
}

export const addTrain = async (train: any) => {
  try {
    const addTrainData: AddTrainData = {
      trainName: train.trainName,
      trainNumber: train.trainNumber,
      startStation: train.startStation,
      endStation: train.endStation,
      trainStartTime: train.trainStartTime,
      trainEndTime: train.trainEndTime,
      departureDate: train.departureDate,
      tickets: train.tickets,
    };

    const response = await apiClient.post("/train", addTrainData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

interface UpdateTrain {
  trainName: string;
  trainNumber: string;
  startStation: string;
  endStation: string;
  trainStartTime: string;
  trainEndTime: string;
  departureDate: string;
}

export const updateTrain = async (train: any) => {
  try {
    const updateData: UpdateTrain = {
      trainName: train.trainName,
      trainNumber: train.trainNumber,
      startStation: train.startStation,
      endStation: train.endStation,
      trainStartTime: train.trainStartTime,
      trainEndTime: train.trainEndTime,
      departureDate: train.departureDate,
    };

    const response = await apiClient.patch(`/train/${train.id}`, updateData);
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

export const searchTrains = async (train: any) => {
  try {
    const response = await apiClient.get(`/train?Page=1&PageSize=10&Order=asc&start=${train.startStation}&end=${train.endStation}&date=${train.departureDate}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
