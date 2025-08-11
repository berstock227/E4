import axios from 'axios'
import { API_CONFIG, AUTH_CONFIG, HTTP_STATUS } from '@/utils/constants'

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Enable cookies for CORS
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token to headers if available
    const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        fullURL: `${config.baseURL}${config.url}`,
        data: config.data,
        params: config.params,
      })
    }
    
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      })
    }
    
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    // Log error in development
    if (import.meta.env.DEV) {
      const data = error.response?.data;
      console.error('❌ API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: data?.message || error.message,
        detail: data?.detail || data
      })
    }
    
    // Handle 401 Unauthorized - try to refresh token
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const refreshToken = localStorage.getItem(AUTH_CONFIG.REFRESH_TOKEN_KEY)
        if (refreshToken) {
          const response = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`, {
            refresh_token: refreshToken
          })
          
          const { access_token, refresh_token } = response.data
          localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, access_token)
          localStorage.setItem(AUTH_CONFIG.REFRESH_TOKEN_KEY, refresh_token)
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`
          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError)
        // Clear auth data and redirect to login
        localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY)
        localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY)
        localStorage.removeItem(AUTH_CONFIG.USER_KEY)
        
        // Redirect to login page
        window.location.href = '/login'
      }
    }
    
    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred'
    const errorData = {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    }
    
    return Promise.reject(errorData)
  }
)

// API helper functions
export const api = {
  // GET request
  get: (url, config = {}) => axiosInstance.get(url, config),
  
  // POST request
  post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),
  
  // PUT request
  put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),
  
  // PATCH request
  patch: (url, data = {}, config = {}) => axiosInstance.patch(url, data, config),
  
  // DELETE request
  delete: (url, config = {}) => axiosInstance.delete(url, config),
  
  // Upload file
  upload: (url, formData, config = {}) => {
    return axiosInstance.post(url, formData, {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  
  // Download file
  download: (url, config = {}) => {
    return axiosInstance.get(url, {
      ...config,
      responseType: 'blob',
    })
  },
}

export default axiosInstance
