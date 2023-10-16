import apiClient from "./axios";


export interface UserData {
  data:    User[];
  status:  boolean;
  message: string;
}

export interface User {
  id:        string;
  email:     string;
  nic:       string;
  firstName: string;
  lastName:  string;
  password:  string;
  avatarUrl: string;
  role:      string;
  isActive:  boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const fetchAllUsers = async ():Promise<UserData> => {
  try {
    const response = await apiClient.get("/user");
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

export const deleteUser = async (id: string) => {
  try {
    const response = await apiClient.delete(`/user/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};