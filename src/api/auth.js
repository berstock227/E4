import { api } from './axiosInstance'
import { API_CONFIG } from '@/utils/constants'

/**
 * Authentication API Service
 */
export const authAPI = {
  /**
   * User login
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} Login response with tokens and user data
   */
  login: async (credentials) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials)
    return response.data
  },

  /**
   * User registration
   * @param {Object} userData - User registration data
   * @param {string} userData.name - User full name
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @param {string} userData.password_confirmation - Password confirmation
   * @returns {Promise<Object>} Registration response
   */
  register: async (userData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData)
    return response.data
  },

  /**
   * User logout
   * @returns {Promise<Object>} Logout response
   */
  logout: async () => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT)
    return response.data
  },

  /**
   * Refresh access token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} New tokens
   */
  refreshToken: async (refreshToken) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
      refresh_token: refreshToken
    })
    return response.data
  },

  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile data
   */
  getProfile: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE)
    return response.data
  },

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise<Object>} Updated profile data
   */
  updateProfile: async (profileData) => {
    const response = await api.put(API_CONFIG.ENDPOINTS.AUTH.PROFILE, profileData)
    return response.data
  },

  /**
   * Change password
   * @param {Object} passwordData - Password change data
   * @param {string} passwordData.current_password - Current password
   * @param {string} passwordData.new_password - New password
   * @param {string} passwordData.new_password_confirmation - New password confirmation
   * @returns {Promise<Object>} Password change response
   */
  changePassword: async (passwordData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData)
    return response.data
  },

  /**
   * Forgot password
   * @param {string} email - User email
   * @returns {Promise<Object>} Forgot password response
   */
  forgotPassword: async (email) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
    return response.data
  },

  /**
   * Reset password
   * @param {Object} resetData - Password reset data
   * @param {string} resetData.token - Reset token
   * @param {string} resetData.email - User email
   * @param {string} resetData.password - New password
   * @param {string} resetData.password_confirmation - Password confirmation
   * @returns {Promise<Object>} Password reset response
   */
  resetPassword: async (resetData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, resetData)
    return response.data
  },

  /**
   * Verify email
   * @param {string} token - Email verification token
   * @returns {Promise<Object>} Email verification response
   */
  verifyEmail: async (token) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_EMAIL, { token })
    return response.data
  },

  /**
   * Resend email verification
   * @returns {Promise<Object>} Resend verification response
   */
  resendVerification: async () => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.RESEND_VERIFICATION)
    return response.data
  }
}

export default authAPI
