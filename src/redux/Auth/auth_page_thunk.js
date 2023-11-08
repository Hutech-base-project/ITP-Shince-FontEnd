import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'
// import { convertBase64 } from "../../util/custom";


export const login = createAsyncThunk(
    "auth/login",
    async (data, {rejectWithValue})=>{
        try{
            const response_auth = await api.post('/auth/signin', data.data);
            console.log(response_auth);
            return response_auth.data;
        }catch (err){
            return rejectWithValue(err.message); 
        }    
    }
)

export const checkLogin = createAsyncThunk(
    "auth/checkLogin",
    async (data, {rejectWithValue})=>{
        try{
            const response_auth = await api.post('/auth/checkLogin', data.dataLogin);
            return response_auth.data;
        }catch (err){
            return rejectWithValue(err.message); 
        }    
    }
)

export const checkRegister = createAsyncThunk(
    "auth/checkRegister",
    async (data, {rejectWithValue})=>{
        try{
            const response_auth = await api.post('/auth/checkRegister/' + data.phoneNumber);
            return response_auth.data;
        }catch (err){
            return rejectWithValue(err.message); 
        }    
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (data, {rejectWithValue})=>{
        try{
            console.log(data.data);
            const response_auth = await api.post('/auth/signup', data.data);
            return response_auth.status;
        }catch (err){
            return rejectWithValue(err.message); 
        }    
    }
)

export const getSession = createAsyncThunk(
    "auth/getSession",
    async (data, {rejectWithValue})=>{
        try{
         
            const response_auth = await api.get('/auth/Session/'+  data.id);
            return response_auth.data;
        }catch (err){
            return rejectWithValue(err.message); 
        }    
    }
)
