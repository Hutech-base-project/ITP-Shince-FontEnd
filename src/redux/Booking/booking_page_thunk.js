import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_all_booking = createAsyncThunk(
  "fetch/orderSer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/OrdersSer");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const get_booking_by_user = createAsyncThunk(
  "fetch/orderSer/userId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/OrdersSer/User/${data}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const post_booking = createAsyncThunk(
  "post/orderSer",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await api.post("/api/OrdersSer", data);
      return response.status;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

