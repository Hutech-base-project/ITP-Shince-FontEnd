import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const get__all_categories = createAsyncThunk(
  'get/category',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/Category", data)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
)

export const post_category = createAsyncThunk(
  'post/category',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/Category", data)
      return response.status
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);
export const put_category = createAsyncThunk(
  'put/category',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/Category`, data)

      return response.status
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);

export const delete_category = createAsyncThunk(
  'delete/category',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/Category/${data}`)
      return response.status
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);
