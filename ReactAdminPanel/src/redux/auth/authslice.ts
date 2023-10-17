import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  firstName: string;
  lastName: string;
  role: string;
  message: string;
  logOutMessage: string;
  avatar: string;
}

export interface LoginResponse {
  accessToken: string;
  firstName: string;
  role: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: "",
  firstName: "",
  lastName: "",
  role: "",
  message: "",
  logOutMessage: "",
  avatar: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.data.token;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.role = action.payload.data.role;
      state.isLoggedIn = true;
      state.avatar = action.payload.data.avatarUrl;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = "";
      state.logOutMessage = "";
    },
    logOut: (state, action) => {
      state.accessToken = "";
      state.firstName = "";
      state.role = "";
      state.logOutMessage = action.payload;
      state.isLoggedIn = false;
      state.avatar = "";
    },
  },
});

export default authSlice.reducer;
export const { login, logOut, setMessage, clearMessage } = authSlice.actions;
