import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'
// import { convertBase64 } from "../../util/custom";



export const generateOTP = createAsyncThunk(
    "auth/generateOTP",
    async (data, {rejectWithValue})=>{
        try{
            const response_auth = await api.post('/auth/generateOTP/'+ data.phoneNumber);
            return response_auth.data;
        }catch (err){
            console.log(err)
            return rejectWithValue(err.message); 
        }    
    }
)

export const validateOtp = createAsyncThunk(
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
