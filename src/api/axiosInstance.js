import axios from 'axios';
import { API_CONFIG, AUTH_CONFIG } from '@/utils/constants';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Attach token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Basic error normalization
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const payload = error?.response?.data || { message: error.message };
    return Promise.reject(payload);
  },
);

export default axiosInstance;
