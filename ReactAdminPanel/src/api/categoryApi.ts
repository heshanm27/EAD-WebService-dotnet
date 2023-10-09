import apiClient from "./axios";

export const fetchAllCategories = async () => {
  try {
    const response = await apiClient.get("/category");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const fetchSubCategory = async (id: string) => {
  try {
    const response = await apiClient.get(`/category/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

interface Category {
  name: string;
  subCategory: string[];
}

export const addCategory = async (value: Category) => {
  try {
    const response = await apiClient.post("/category", value);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateCategory = async (id: string, value: Category) => {
  try {
    const response = await apiClient.put(`/category/${id}`, value);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await apiClient.delete(`/category/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteSubCategory = async (id: string, subId: string) => {
  try {
    const response = await apiClient.delete(`/category/${id}/${subId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateSubCategory = async (id: string, value: string) => {
  try {
    const response = await apiClient.put(`/category/${id}`, { subCategory: value });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
