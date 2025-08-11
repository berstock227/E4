import axiosInstance from './axiosInstance'
import { API_CONFIG } from '@/utils/constants'

export const dashboardAPI = {
  // Get dashboard statistics
  getStats() {
    return axiosInstance.get('/stats')
  },

  // Get dashboard analytics
  getAnalytics(period = '7D') {
    return axiosInstance.get('/dashboard/analytics', {
      params: { period }
    })
  },

  // Get dashboard alerts
  getAlerts() {
    return axiosInstance.get('/dashboard/alerts')
  },

  // Dismiss alert
  dismissAlert(alertId) {
    return axiosInstance.delete(`/dashboard/alerts/${alertId}`)
  }
}
