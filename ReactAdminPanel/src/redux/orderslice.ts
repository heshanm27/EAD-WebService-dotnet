import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IItem {
  orderID: string;
}

const initialState: IItem = {
  orderID: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placedOrder: (state, action: PayloadAction<any>) => {
      state.orderID = action.payload;
    },
    clearOrder: (state) => {
      state.orderID = "";
    },
  },
});

export default orderSlice.reducer;
export const { clearOrder, placedOrder } = orderSlice.actions;
