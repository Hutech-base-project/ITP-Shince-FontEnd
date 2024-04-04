import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const get_all_roles = createAsyncThunk(
    'get/category',
    async (data,{rejectWithValue})=>{
        try {
            const response = await api.get("/api/Role", data)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data.responseMessage);
        }
    }
)


