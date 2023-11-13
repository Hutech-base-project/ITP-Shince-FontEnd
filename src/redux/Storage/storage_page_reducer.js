import { createSlice, } from "@reduxjs/toolkit";


const initialState = {
  checkOut: false,
};

export const StoragePage = createSlice({
  name: "storage_page",
  initialState,
  //don't use api
  reducers: {
    OnChekOut: (state, action) => {
      state.checkOut = true;
    },
    OffChekOut: (state, action) => {
      state.checkOut = false;
    },
  },
  //use pai
  extraReducers: (builder) => {
    builder.addDefaultCase((state, action) => { });
  },
});
export const {
  OnChekOut,
  OffChekOut,
} = StoragePage.actions;

export default StoragePage.reducer;