import apiClient from "./axios";

export const fetchAllProductReviews = async (id: string) => {
  try {
    const response = await apiClient.get("/review/products/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const fetchAllSellerReviews = async (id: string) => {
  try {
    const response = await apiClient.get("/review/seller/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

interface productpros {
  seller?: string;
  rating: number;
  comment: string;
  product?: string;
}
export const addReview = async (data: productpros) => {
  try {
    const response = await apiClient.post("/review", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateReview = async (data: any) => {
  try {
    const response = await apiClient.patch("/review", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteReview = async (id: string) => {
  try {
    const response = await apiClient.delete(`/review/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
