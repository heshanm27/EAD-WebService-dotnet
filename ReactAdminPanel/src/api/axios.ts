import axios from "axios";
import store from "../redux/store";
import { logOut } from "../redux/auth/authslice";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const excludedEndpoints: string[] = ["/auth/signIn", "/auth/signup"]; // List of excluded endpoints
apiClient.interceptors.request.use((config) => {
  // Check if the request URL matches any of the excluded endpoints
  if (!excludedEndpoints.some((endpoint) => config.url?.includes(endpoint))) {
    config.headers.Authorization = `Bearer ${store.getState().authSlice.accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Error: interceptor Token Expired", store.getState().authSlice.accessToken);
    console.log("Error: interceptor");
    if (error.response.status === 401) {
      // Remove the current token from the Redux store by dispatching a Redux action
      store.dispatch(logOut("Unauthorized,Please Sign Again")); // Dispatch your Redux action to remove the token
      window.location.href = "/signin";
    }

    // If the error is not related to token expiration, return it as is
    return Promise.reject(error);
  }
);

export default apiClient;
