import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cart: [],
};

export const CartPage = createSlice({
  name: "cart",
  initialState,
  //don't use api
  reducers: {
    addToCart: (state, action) => {
      const checkExists = state.cart?.find((item) => item.productId === action.payload.productId);
      if (checkExists === undefined) {
        state.cart.push(action.payload);
        state.checkOut = false;
      } else {
        const cart = state.cart.map(item =>
          item.productId === action.payload.productId
            ? { ...item, proQuantity: parseInt(action.payload.proQuantity) }
            : { ...item }
        );
        state.cart = cart;
        state.checkOut = false;
      }
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.productId !== action.payload)
      state.checkOut = false;
    },
    clearCart: (state, action) => {
      state.cart = [];
      state.checkOut = false;
    },
  },
  //use pai
  extraReducers: (builder) => {
    // builder.addDefaultCase((state, action) => { });
  },
});
export const {
  addToCart,
  removeCart,
  clearCart,
} = CartPage.actions;

export default CartPage.reducer;