//login.js

import {
  isLoggedIn,
  setAuthTokens,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from 'react-native-axios-jwt';
import {axiosInstance} from '../api';

// 4. Log in by POST-ing the email and password and get tokens in return
// and call setAuthTokens with the result.
const login = async params => {
  const response = await axiosInstance.post('/auth/login', params);

  // save tokens to storage
  await setAuthTokens({
    accessToken: response.data.token,
    // refreshToken: response.data.refresh_token
  });
};

// 5. Log out by clearing the auth tokens from AsyncStorage
const logout = () => clearAuthTokens();

// Check if refresh token exists
if (isLoggedIn()) {
  // assume we are logged in because we have a refresh token
}

// Get access to tokens
const accessToken = getAccessToken().then(accessToken =>
  console.log(accessToken),
);
const refreshToken = getRefreshToken().then(refreshToken =>
  console.log(refreshToken),
);

// Now just make all requests using your axiosInstance instance
// axiosInstance.get('/api/endpoint/that/requires/login').then(response => { })
