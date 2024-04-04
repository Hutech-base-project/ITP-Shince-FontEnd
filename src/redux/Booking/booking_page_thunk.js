import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_all_booking = createAsyncThunk(
  "fetch/booking",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/Booking");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);

export const get_booking_by_emloyee = createAsyncThunk(
  "fetch/booking/employyeId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/Booking/Employye/${data}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);

export const get_booking_by_user = createAsyncThunk(
  "fetch/booking/userId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/Booking/User/${data}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);

export const post_booking = createAsyncThunk(
  "post/booking",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/Booking", data);
      return response.status;
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);

export const put_booking = createAsyncThunk(
  "put/booking",
  async (data, { rejectWithValue }) => {
    try {
      const dataFinal = {
        boEndTime: data.boEndTime,
        boStartTime: data.boStartTime,
        boPhoneNo: data.boPhoneNo,      
        boStatus: data.boStatus,
        boTotal: data.boTotal,
        employeeId: data.employeeId,
        userId: data.userId
      }
      const response = await api.put(`/api/Booking/${data.boId}`,dataFinal);
      return response.status;
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);

