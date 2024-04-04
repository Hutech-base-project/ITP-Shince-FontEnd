import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const get__all_vouchers = createAsyncThunk(
  'get/vouchers',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/Voucher", data)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
)

export const get__vouchers_by_id = createAsyncThunk(
  'get/voucher/id',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/Voucher/${data}`, data)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
)

export const get__vouchers_by_user_id = createAsyncThunk(
  'get/voucher/user-id',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/Voucher/User/${data}`, data)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
)

export const post_voucher = createAsyncThunk(
  'post/voucher',
  async (data, { rejectWithValue }) => {
    try {
      let obj = {
        createdAt: new Date(data.createdAt),
        expirationDate:  new Date(data.expirationDate),
        voCount: data.voCount,
        voDescription: data.voDescription,
        voName: data.voName,
        voPrice: data.voPrice,
        voProduct: data.voProduct,
        voService: data.voService,
        voTypeAuto: data.voTypeAuto
      }

      const response = await api.post("/api/Voucher", obj)
      return response.status
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);

export const post_voucher_auto = createAsyncThunk(
  'post/voucher',
  async (data, { rejectWithValue }) => {
    try {
      let obj = {
        createdAt: new Date(data.createdAt),
        expirationDate:  new Date(data.expirationDate),
        voCount: data.voCount,
        phoneNumber:data.phoneNumber,
        userId:data.userId,
        voDescription: data.voDescription,
        voName: data.voName,
        voPrice: data.voPrice,
        voProduct: data.voProduct,
        voService: data.voService,
        voTypeAuto: data.voTypeAuto
      }

      const response = await api.post("/api/Voucher-Auto", obj)
      return response.status
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);

export const post_check_voucher = createAsyncThunk(
  'put/check/voucher',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/Voucher/Check/${data.codeVoucher}/${data.phoneNumber}`, )
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);

export const put_voucher = createAsyncThunk(
  'put/voucher',
  async (data, { rejectWithValue }) => {
    try {
      let obj = {
        createdAt: new Date(data.createdAt),
        expirationDate:  new Date(data.expirationDate),
        isDelete: data.isDelete,
        voCount: data.voCount,
        voDescription: data.voDescription,
        voId: data.voId,
        voName: data.voName,
        voPrice: data.voPrice,
        voProduct: data.voProduct,
        voService: data.voService,
        voTypeAuto: data.voTypeAuto
      }
      const response = await api.put(`/api/Voucher/${data.voId}`, obj)

      return response.status
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);

export const put_use_voucher = createAsyncThunk(
  'put/use/voucher',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/Voucher/Use/${data.codeVoucher}/${data.phoneNumber}`, data)
      return response.status
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);

export const delete_voucher = createAsyncThunk(
  'delete/voucher',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/Voucher/${data}`)
      return response.status
    } catch (err) {
      return rejectWithValue(err.response.data.responseMessage);
    }
  }
);
