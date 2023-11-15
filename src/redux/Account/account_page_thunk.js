import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { convertBase64 } from "../../utils/custom";

export const get_all_user = createAsyncThunk(
    "get/allUser",
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.get("/api/Users", data);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
  
  export const post_user = createAsyncThunk(
    "post/user",
    async (data, { rejectWithValue }) => {
      try {
        let formData = new FormData();
        const obj = {
          usUserName: data.data.usUserName,
          usPassword: data.data.usPassword,
          usDob: data.data.usDob,
          usAddress: data.data.usAddress,
          usPhoneNo: data.data.usPhoneNo,
          usEmailNo: data.data.usEmailNo,
          usNote: data.data.usNote,
          isAdmin: true,
          isDelete: data.isDelete,
          listRole:data.listRole
        };
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        formData.append("json", JSON.stringify(obj));
        formData.append("file", data.data.usImage);
        const response = await api.post(
          `/api/Users`,
          formData,
          config
        );
        return response.status;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
  
  export const update_password = createAsyncThunk(
    "update/password",
    async (data, { rejectWithValue }) => {
      try {
        let formData = new FormData();
        const obj = {
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          usId: data.usId,
          usUserName: data.usUserName,
          usPassword: data.usPassword,
          usDob: data.usDob,
          usAddress: data.usAddress,
          usPhoneNo: data.usPhoneNo,
          usEmailNo: data.usEmailNo,
          usNote: data.usNote,
          isAdmin: false,
          isDelete: data.isDelete,
        };
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        if (typeof data.usImage === "object") {
          formData.append("file", data.usImage);
          formData.append("data_json", JSON.stringify(obj));
        } else {
          const responseUser = await api.get(`/api/Users/${data.usId}`);
          formData.append(
            "data_json",
            JSON.stringify({ ...obj, usImage: responseUser.data.usImage })
          );
        }
  
        const response = await api.put(`/api/Users`, formData, config);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
  
  export const get_user_by_id = createAsyncThunk(
    "get/userById",
    async (data, { rejectWithValue }) => {
      try {
        
        const responseUser = await api.get(`/api/Users/${data}`);
        if (responseUser.data.responseData.usImage === null) {
          return responseUser.data.responseData;
        } else {
          const response = await api.get(
            `/image/user/${responseUser.data.responseData.usImage}`
          );
          const base64Response = await fetch(
            `data:image/jpeg;base64,${response.data}`
          );
          const blob = await base64Response.blob();
          const base64 = await convertBase64(blob);    
          const result = { ...responseUser.data.responseData, usImage: base64 };
          return result;
        }
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
  
  export const change_password = createAsyncThunk(
    "change/password",
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.put("/api/UserChangePassword", data);
        return response.status;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const put_user = createAsyncThunk(
    "put/user",
    async (data, { rejectWithValue }) => {
      try {
        let formData = new FormData();
        const obj = {
          createdAt: data.data.createdAt,
          usUserName: data.data.usUserName,
          usPassword: data.data.usPassword,
          usDob: data.data.usDob,
          usAddress: data.data.usAddress,
          usPhoneNo: data.data.usPhoneNo,
          usEmailNo: data.data.usEmailNo,
          usNote: data.data.usNote,
          isAdmin: data.data.isAdmin,
          isDelete: data.data.isDelete,
          listRole:data.listRole
        };
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        formData.append("data_json", JSON.stringify(obj));
        formData.append("file", data.data.usImage);  
        const response = await api.put(`/api/Users/${data.data.usId}`, formData, config);     
        return response.status;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const block_user = createAsyncThunk(
    "block/user",
    async (data, { rejectWithValue }) => {
      try {
        let formData = new FormData();
        const dataEdit = {
          ...data,
          listRole: [],
          isBlock: data.isBlock === true ? false : true,
        };
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        formData.append("data_json", JSON.stringify(dataEdit));
        const response = await api.put(
          `/api/Users/${data.usId}`,
          formData,
          config
        );
        return response.status;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );