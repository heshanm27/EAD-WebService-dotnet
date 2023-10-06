import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Replace 'your-types' with the appropriate path to your types

export interface IItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
  totalPrice: number;
}
interface CartState {
  items: IItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const { productID, productName, productPrice, productImg, productStock } = action.payload;
      console.log("add to cart", state);
      const existingItem = state.items.find((item) => item.product === productID);
      if (existingItem) {
        console.log("existing item", existingItem);
        if (existingItem.quantity === existingItem.stock) return;
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * productPrice;
      } else {
        state.items.push({
          product: productID,
          name: productName,
          price: productPrice,
          image: productImg,
          stock: productStock,
          quantity: 1,
          totalPrice: productPrice,
        });
      }
      state.total += productPrice;
    },
    increaceQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.product === itemId);
      if (existingItem) {
        if (existingItem.quantity === existingItem.stock) {
          console.error("Quantity cannot exceed stock.");
          return;
        }
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        state.total += existingItem.price;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.product === itemId);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.product !== itemId);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.quantity * existingItem.price;
        }
        state.total -= existingItem.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      console.log("remove from cart", itemId);
      const existingItem = state.items.find((item) => item.product === itemId);
      console.log("existing item", existingItem);
      if (existingItem) {
        state.items = state.items.filter((item) => item.product !== itemId);
        state.total -= existingItem.quantity * existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart, decreaseQuantity, increaceQuantity } = cartSlice.actions;
