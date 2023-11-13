import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'

export const generate_otp = createAsyncThunk(
    "auth/generateOTP",
    async (data, {rejectWithValue})=>{
        try{
            const response_auth = await api.post('/auth/generateOTP/'+ data.phoneNumber);
            return response_auth.data;
        }catch (err){
            return rejectWithValue(err.message); 
        }    
    }
)

export const validate_otp = createAsyncThunk(
    "auth/validateOtp",
    async (data, {rejectWithValue})=>{
        try{
            const response_auth = await api.post('/auth/validateOtp', data.dataOtp);
            return response_auth.status;
        }catch (err){
            return rejectWithValue(err.message); 
        }    
    }
)
