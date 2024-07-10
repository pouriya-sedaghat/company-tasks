import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../../interface/Product";

import { Cookies } from "typescript-cookie";

type CartSlice = { cartItems: Product[] };

const initialState: CartSlice = Cookies.get("cart")
  ? JSON.parse(Cookies.get("cart") as string)
  : {
      cartItems: [],
    };

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    ADD_ITEM: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.slug === newItem.slug
      );

      const cartItems = existingItem
        ? state.cartItems.map((item) =>
            item.title === existingItem.title ? newItem : item
          )
        : [...state.cartItems, newItem];

      Cookies.set("cart", JSON.stringify({ ...state, cartItems }));

      state.cartItems = cartItems;
    },
    REMOVE_ITEM: (state, action) => {
      const cartItems = state.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );

      Cookies.set("cart", JSON.stringify({ ...state, cartItems }));

      state.cartItems = cartItems;
    },
  },
});

export const { ADD_ITEM, REMOVE_ITEM } = cartSlice.actions;
export default cartSlice.reducer;
