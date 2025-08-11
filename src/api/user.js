import axiosInstance from './axiosInstance'
import { API_CONFIG } from '@/utils/constants'

export const userAPI = {
  // Get user profile
  getProfile() {
    return axiosInstance.get(API_CONFIG.ENDPOINTS.USER.PROFILE)
  },

  // Update user profile
  updateProfile(data) {
    return axiosInstance.put(API_CONFIG.ENDPOINTS.USER.UPDATE, data)
  },

  // Upload avatar
  uploadAvatar(formData) {
    return axiosInstance.post(API_CONFIG.ENDPOINTS.USER.AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // Get user statistics
  getStats() {
    return axiosInstance.get('/users/stats')
  },

  // Get recent activity
  getRecentActivity() {
    return axiosInstance.get('/users/activity')
  },

  // Get user's blogs
  getMyBlogs(params = {}) {
    return axiosInstance.get('/blogs/my-blogs', { params })
  },

  // Get user's comments
  getMyComments(params = {}) {
    return axiosInstance.get('/users/comments', { params })
  },

  // Delete user account
  deleteAccount() {
    return axiosInstance.delete('/users/account')
  },

  // Export user data
  exportData() {
    return axiosInstance.get('/users/export', {
      responseType: 'blob'
    })
  }
}
