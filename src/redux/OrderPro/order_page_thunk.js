import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_all_orders = createAsyncThunk(
  'get/ordersPro',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/OrdersPro", data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const get_order_by_user_id = createAsyncThunk(
  "get/orderProduct/userId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/OrdersPro/User/${data}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const post_order = createAsyncThunk(
  "post/orderPro",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/OrdersPro", data);
      return response.status;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const put_order = createAsyncThunk(
  "put/orderPro",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/OrdersPro/${data.orProId}`, data);
      return response.status;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// export const getOrderProDetail = createAsyncThunk(
//   "get/orderProdetail",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/api/OrderProDetail/${data}`)
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

