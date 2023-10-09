import apiClient from "./axios";
import store from "../redux/store";
import { placedOrder } from "../redux/orderslice";

export const addOrder = async (data: any) => {
  try {
    const response = await apiClient.post("/order", data);
    store.dispatch(placedOrder(response.data.orderId));
    window.location.href = response.data.url;
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const response = await apiClient.delete(`/order/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const fetchAllLiveOrders = async () => {
  try {
    const response = await apiClient.get("/order/live");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const fetchUserOrder = async () => {
  try {
    const response = await apiClient.get("/order/user");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
export const fetchAllOrderHistory = async () => {
  try {
    const response = await apiClient.get("/order/history");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const fetchOneOrder = async (id: string) => {
  try {
    const reponse = await apiClient.get(`/order/${id}`);
    return reponse.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateOrderStatus = async (input: any) => {
  try {
    const response = await apiClient.patch(`/order/${input.id}`, { status: input.status });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
