import axios from "axios";
import { logout } from "../redux/Auth/auth_page_reducer";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

var jwt = [];
const accessToken = (previousAPI) => {
  const innerAccessToken = async () => {
    try {
   
      var refreshToken;
      var token;
      if(localStorage.getItem("id")!== null){
        jwt = await api.get(`/auth/Session/`+localStorage.getItem("id"));
        refreshToken = jwt.responseData.refreshToken;
        token = jwt.responseData.accessToken;
      }
   
      await api.post(`/login/refreshtoken`, {
        token,
        refreshToken,
      });
      previousAPI.headers.Authorization = `Bearer ${token}`;
      return api.request(previousAPI);
    } catch (error) {
      throw error;
    }
  };
  return innerAccessToken;
};

api.interceptors.request.use(
  function (config) {
    let token;
    if (localStorage.getItem("id")!== null) {
        token = jwt.responseData.accessToken;
    } 
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(null, function (error) {
  if (
    error.config &&
    error.response?.status === 401 &&
    !error.config.__isRetry
  ) {
    return new Promise((resolve, reject) => {
      const callAccess = accessToken(error.config);
      callAccess(error.config)
        .then((result) => {
          resolve(console.log("result", result));
        })
        .catch((err) => {
          reject(console.log("err", err));
          store.dispatch(logout());
          window.location = "/";
        });
    });
  }
  return Promise.reject(error);
});

export default api;
