import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cart";

export type IRootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
