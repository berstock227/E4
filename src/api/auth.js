import api from './axiosInstance';
import { API_CONFIG } from '@/utils/constants';

export const register = (payload) => api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, payload);
export const login = (payload) => api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, payload);
export const refresh = (payload) => api.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, payload);
export const logout = () => api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
export const getProfile = () => api.get(API_CONFIG.ENDPOINTS.AUTH.ME);

export const authAPI = { register, login, refresh, logout, getProfile };
export default authAPI;
