import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const get__all_whish_list_by_user_id = createAsyncThunk(
  'get/whish_list',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/WhishList/${data}`, data)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
)

export const post_whish_list = createAsyncThunk(
  'post/whish_list',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/WhishList", data)
      return response.status
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);

export const delete_whish_list = createAsyncThunk(
  'delete/whish_list',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/WhishList/${data}`)
      return response.status
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);
