//api.js

import {applyAuthTokenInterceptor} from 'react-native-axios-jwt';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const BASE_URL = 'https://c639-102-89-33-33.eu.ngrok.io/v1';

// const BASE_URL = 'http://10.0.2.2:8080/v1';
// https://api.thevillalife.com/v1
// const BASE_URL = 'https://api.thevillalife.com/v1';
const BASE_URL = 'https://sandbox-villa-life-server.herokuapp.com/v1';
// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({baseURL: BASE_URL});

// 2. Define token refresh function.
const requestRefresh = async refresh => {
  // Notice that this is the global axios instance, not the axiosInstance!
  const response = await axios.post(`${BASE_URL}/auth/refresh_token`, {
    refresh,
  });

  return response.data.token;
};

// 3. Apply interceptor
// Notice that this uses the axiosInstance instance.
// applyAuthTokenInterceptor(axiosInstance, {
//   requestRefresh,
//   header: 'authorization', // header name
//   headerPrefix: `Bearer `,
// });
