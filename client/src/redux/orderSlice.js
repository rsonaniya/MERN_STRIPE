import { createSlice, isAction } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: { cartItems: [] },
  reducers: {
    addItemsToCart(state, action) {
      const foundItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (foundItem) {
        foundItem.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItemsFromCart(state, action) {
      const foundItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      console.log(foundItem);

      if (foundItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        foundItem.quantity--;
      }
    },
  },
});

export const { addItemsToCart, removeItemsFromCart } = orderSlice.actions;
export default orderSlice.reducer;
