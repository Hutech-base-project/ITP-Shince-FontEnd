
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

async function refreshToken() {
  try {
    const token = "";
    const refreshToken = "";
    if (sessionStorage.getItem("id") !== null) {
      await  axios.get(process.env.REACT_APP_API_URL+`/auth/Session/` + sessionStorage.getItem("id"))
      .then(response => {
        token = response.data.responseData.token;
        refreshToken = response.data.responseData.refreshToken;
      })
      .catch(error => {
        console.log(error)
      });
      const response = await axios.post(process.env.REACT_APP_API_URL+`/login/refreshtoken`, {
        token,
        refreshToken,
      });
  
      return response.data.responseData.token;
    }
   
  } catch (error) {
    reject(console.log("err", err));
    sessionStorage.removeItem("id");
    window.location = "/";
  }
}

// Axios Interceptor for outgoing requests
api.interceptors.request.use(
  async (config) => {
    const token = "";
    if (sessionStorage.getItem("id") !== null) {
      await  axios.get(process.env.REACT_APP_API_URL+`/auth/Session/` + sessionStorage.getItem("id"))
      .then(response => {
        token = response.data.responseData.token;
      })
      .catch(error => {
        console.log(error)
      });
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      const newToken = await refreshToken();

      originalConfig.headers.Authorization = `Bearer ${newToken}`;

      return axios(originalConfig);
    }

    return Promise.reject(error);
  }
);

// async function getToken() {
//   try {
//     const response = await axios.get('/your-token-endpoint');
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Call the API to get the token
// getToken();

