/**
 * src/config/api/http.js
 */

import axios from "axios";
import qs from "qs";

// eslint-disable-next-line no-undef
const url = process.env.REACT_APP_BASE_URL;
// eslint-disable-next-line no-undef
const timeout = process.env.REACT_APP_TIMEOUT;
/**
 *
 * parse error response
 */
function parseError(error) {
  // error
  if (error) {
    if (error.status === 403) {
      // refreshToken();
      return Promise.reject({ message: "Forbidden Access" });
    } else if (error.status === 401) {
      // refreshToken();
      return Promise.reject({ message: "Session Expired" });
    } else {
      return Promise.reject({ message: error.data.message });
    }
  } else {
    return Promise.reject({ message: "Something Went Wrong" });
  }
}

/**
 * axios instance
 */
let instance = axios.create({
  baseURL: url,
  timeout: timeout,
  paramsSerializer: function (params) {
    return qs.stringify(params, { indices: false });
  },
});

// function refreshToken() {
//   const refreshToken = localStorage.getItem(sessionStorageKeys.refreshToken);
//   alert(refreshToken);
//   try {
//     const body = {
//       refresh_token: refreshToken,
//     };
//     const { data } = instance.post("auth/refresh", body);
//     localStorage.setItem(sessionStorageKeys.token, data.token);
//     alert(JSON.stringify(data));
//   } catch (e) {
//     localStorage.removeItem(sessionStorageKeys.token);
//     alert("Error getting Token");
//   }
// }

// request header
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    config.headers = {
      // Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response parse
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response) {
      return parseError(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);

export const http = instance;
