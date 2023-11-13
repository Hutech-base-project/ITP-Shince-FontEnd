import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const get_all_products = createAsyncThunk(
  'get/product',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/Product`, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
export const get_product_by_id = createAsyncThunk(
  'get/product',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/Product/${data}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const post_product = createAsyncThunk(
  "post/product",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      const obj = {
        category_id: data.category_id,
        proBrand: data.proBrand,
        proContent: data.proContent,
        proName: data.proName,
        proPrice: data.proPrice,
        proTurnOn: data.proTurnOn,
        isDelete: data.isDelete
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
      formData.append("file", data.featureImgPath);
      formData.append("json", JSON.stringify(obj));
      const response = await api.post("/api/Product", formData, config)
      return response.status
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const put_product = createAsyncThunk(
  "put/products",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      let idChild = [];
      for (let index = 0; index < data.listImg.length; index++) {
        if(data.img1 != null && index === 0){
          idChild.push(data.listImg.at(index).proImgId);
          formData.append("Mutifile", data.img1);
        }
        if(data.img2 != null && index === 1){
          idChild.push(data.listImg.at(index).proImgId);
          formData.append("Mutifile", data.img2);
        }
        if(data.img3 != null && index === 2){
          idChild.push(data.listImg.at(index).proImgId);
          formData.append("Mutifile", data.img3);
        }
        if(data.img4 != null && index === 3){
          idChild.push(data.listImg.at(index).proImgId);
          formData.append("Mutifile", data.img4);
        }
      }
      const dataEdit = {
        proId: data.proId,
        category_id: data.category_id,
        proBrand: data.proBrand,
        proContent:data.proContent,
        proName: data.proName,
        proPrice: data.proPrice,
        proTurnOn: data.proTurnOn,
        createdAt: data.createdAt,
        isDelete:data.isDelete,
        idImgChild:idChild,
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if (typeof data.featureImgPath === "string") {
        formData.append("json", JSON.stringify(dataEdit));
      } else {
        formData.append("file", data.featureImgPath);
        formData.append("json", JSON.stringify(dataEdit));
      }
      const response = await api.put(
        `/api/Product/${dataEdit.proId}`,
        formData,
        config
      );
      return response.status;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const delete_product = createAsyncThunk(
  'delete/product',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/Product/${data}`)
      return response.status
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const block_product = createAsyncThunk(
  "block/products",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      const dataEdit = {
        proId: data.proId,
        category_id: data.category_id,
        proBrand: data.proBrand,
        proContent:data.proContent,
        proName: data.proName,
        proPrice: data.proPrice,
        createdAt: data.createdAt,
        isDelete:data.isDelete,
        idImgChild:null,
        proTurnOn: data.proTurnOn === true ? false : true,
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      formData.append("json", JSON.stringify(dataEdit));
      const response = await api.put(
        `/api/Product/${dataEdit.proId}`,
        formData,
        config
      );
      return response.status;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
