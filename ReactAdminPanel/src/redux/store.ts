import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./auth/authslice";
import { cartSlice } from "./cartslice";
import { orderSlice } from "./orderslice";

const persistConfig = {
  key: "dynamic",
  version: 1,
  storage,
  blacklist: ["dilaogState"],
};

const rootReducer = combineReducers({
  authSlice: authSlice.reducer,
  cartSlice: cartSlice.reducer,
  orderSlice: orderSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export let persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
