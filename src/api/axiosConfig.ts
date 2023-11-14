import axios from 'axios';
import { getAccessToken, setAccessToken } from './authToken';
import { refreshToken } from './user';

/**
 * Set the `withCredentials` property to `true` for all Axios requests.
 * This allows cookies to be sent with cross-origin requests.
 */
axios.defaults.withCredentials = true;

/**
 * Add an Axios request interceptor to add the access token to the request headers.
 * @param config The Axios request configuration.
 * @returns The modified Axios request configuration.
 */
axios.interceptors.request.use(config => {
  const token = getAccessToken();
  console.log('token to be sent', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * Add an Axios response interceptor to handle 401 errors and refresh the access token.
 * @param response The Axios response.
 * @returns The Axios response, or a new Axios request with the updated access token.
 */
axios.interceptors.response.use(response => {
  // Normal response, return it for the application to handle
  return response;
}, async error => {
  const originalRequest = error.config;

  // Check if the response is 401 and not already retrying
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshToken();
      setAccessToken(newAccessToken); // Update the access token
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axios(originalRequest); // Retry the original request with the new token
    } catch (refreshError) {
      return Promise.reject(refreshError); // If refresh also fails, reject
    }
  }

  // Other kinds of errors, or 401 errors where retry already happened
  return Promise.reject(error);
});
