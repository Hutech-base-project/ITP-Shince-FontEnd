import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const get_all_services = createAsyncThunk(
    'get/Serce',
    async (data,{rejectWithValue})=>{
        try {
            const response = await api.get("/api/Serce", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const post_services = createAsyncThunk(
  "post/Serce",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      const obj = {
        seDescription: data.seDescription,
        seName: data.seName,
        sePrice: data.sePrice,
        seTurnOn: data.seTurnOn,
        isDelete: data.isDelete,
        createdAt: data.createdAt,
        updateAt: data.updateAt
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      formData.append("Mutifile", data.img1);
      formData.append("Mutifile", data.img2);
      formData.append("Mutifile", data.img3);
      formData.append("Mutifile", data.img4);
      formData.append("file", data.seImage);
      formData.append("json", JSON.stringify(obj));
      const response = await api.post("/api/Serce", formData, config)
      return response.status
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const put_services = createAsyncThunk(
  "put/Serce",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      let idChild = [];
      for (let index = 0; index < data.listImg.length; index++) {
        if(data.img1 != null && index === 0){
          idChild.push(data.listImg.at(index).serImgId);
          formData.append("Mutifile", data.img1);
        }
        if(data.img2 != null && index === 1){
          idChild.push(data.listImg.at(index).serImgId);
          formData.append("Mutifile", data.img2);
        }
        if(data.img3 != null && index === 2){
          idChild.push(data.listImg.at(index).serImgId);
          formData.append("Mutifile", data.img3);
        }
        if(data.img4 != null && index === 3){
          idChild.push(data.listImg.at(index).serImgId);
          formData.append("Mutifile", data.img4);
        }
      }
      
      const dataEdit = {
        seId: data.seId,
        seDescription:data.seDescription,
        seName: data.seName,
        sePrice: data.sePrice,
        seTurnOn: data.seTurnOn,
        createdAt: data.createdAt,
        isDelete:data.isDelete,
        idImgChild:idChild
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if (typeof data.seImage === "string") {
        formData.append("json", JSON.stringify(dataEdit));
      } else {
        formData.append("file", data.seImage);
        formData.append("json", JSON.stringify(dataEdit));
      }
      const response = await api.put(
        `/api/Serce/${dataEdit.seId}`,
        formData,
        config
      );
      return response.status;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const delete_services = createAsyncThunk(
  'delete/Serce',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/Serce/${data}`)
      return response.status
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const block_services = createAsyncThunk(
  "block/Serce",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      const dataEdit = {
        seId: data.seId,
        seDescription:data.seDescription,
        seName: data.seName,
        sePrice: data.sePrice,
        createdAt: data.createdAt,
        isDelete:data.isDelete,
        idImgChild:null,
        seTurnOn: data.seTurnOn === true ? false : true,
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      formData.append("json", JSON.stringify(dataEdit));
      const response = await api.put(
        `/api/Serce/${dataEdit.seId}`,
        formData,
        config
      );
      return response.status;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

