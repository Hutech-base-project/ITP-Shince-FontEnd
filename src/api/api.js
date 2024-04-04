import axios from 'axios';


let store;

export const injectStore = (_store) => {
  store = _store;
};
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

async function refreshToken() {
  try {
    let token = "";
    let refreshToken = "";
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
    console.log(error)
    // sessionStorage.removeItem("id");
    // window.location = "/";
  }
}

// Axios Interceptor for outgoing requests
api.interceptors.request.use(
  async (config) => {
    let token = "";
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

export default api
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



// var token = "";
// var refreshToken = "";
// // Set up request interceptor
// api.interceptors.request.use(
//   async (config) => {
//     if (sessionStorage.getItem("id") !== null) {
//       await  axios.get(process.env.REACT_APP_API_URL+`/auth/Session/` + sessionStorage.getItem("id"))
//       .then(response => {
//         token = response.data.responseData.token;
//         refreshToken = response.data.responseData.refreshToken;
//         console.log("2")
//         config.headers.Authorization = `Bearer ${token}`;

//         return config;
//       })
//       .catch(error => {
//         console.log(error)
//         return error;
//       });
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


// api.interceptors.response.use(
//   (response) => {
//     console.log(response)
//     return response;
//   },
//   async (error) => {
//     console.log(error)
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const newAccessToken = await axios.post(process.env.REACT_APP_API_URL+`/login/refreshtoken`, {
//           token,
//           refreshToken,
//         });
//         token = newAccessToken.data.responseData.accessToken;

//         // Update the Authorization header with the new token
//         originalRequest.headers.Authorization = `Bearer ${token}`;

//         // Retry the original request
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Handle any refresh token errors
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;