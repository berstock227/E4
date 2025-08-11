import { defineStore } from 'pinia'
import { dashboardAPI } from '@/api/dashboard'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    stats: null,
    analytics: null,
    alerts: [],
    loading: false,
    error: null
  }),

  getters: {
    // Get formatted stats for display
    formattedStats: (state) => {
      if (!state.stats) return null
      
      return {
        blogs: {
          value: state.stats.blogs,
          change: 12,
          icon: 'DocumentTextIcon',
          iconBgClass: 'bg-blue-100',
          iconColorClass: 'text-blue-600'
        },
        users: {
          value: state.stats.users,
          change: 8,
          icon: 'UsersIcon',
          iconBgClass: 'bg-green-100',
          iconColorClass: 'text-green-600'
        },
        comments: {
          value: state.stats.comments,
          change: 15,
          icon: 'ChatBubbleLeftRightIcon',
          iconBgClass: 'bg-purple-100',
          iconColorClass: 'text-purple-600'
        },
        views: {
          value: state.stats.views,
          change: 23,
          icon: 'EyeIcon',
          iconBgClass: 'bg-orange-100',
          iconColorClass: 'text-orange-600'
        }
      }
    },

    // Get chart data for views
    viewsChartData: (state) => {
      if (!state.analytics?.views_chart) return null
      
      return {
        labels: state.analytics.views_chart.labels,
        datasets: [{
          label: 'Views',
          data: state.analytics.views_chart.datasets[0].data,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      }
    },

    // Get chart data for category distribution
    categoryChartData: (state) => {
      if (!state.analytics?.category_distribution) return null
      
      return {
        labels: state.analytics.category_distribution.labels,
        datasets: [{
          data: state.analytics.category_distribution.datasets[0].data,
          backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
        }]
      }
    },

    // Get recent blogs for table
    recentBlogs: (state) => {
      return state.analytics?.recent_activity?.blogs || []
    },

    // Get recent users for table
    recentUsers: (state) => {
      return state.analytics?.recent_activity?.users || []
    }
  },

  actions: {
    // Fetch dashboard stats
    async fetchStats() {
      this.loading = true
      this.error = null
      
      try {
        const response = await dashboardAPI.getStats()
        this.stats = response.data.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        this.loading = false
      }
    },

    // Fetch dashboard analytics
    async fetchAnalytics(period = '7D') {
      this.loading = true
      this.error = null
      
      try {
        const response = await dashboardAPI.getAnalytics(period)
        this.analytics = response.data.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch dashboard analytics:', error)
      } finally {
        this.loading = false
      }
    },

    // Fetch dashboard alerts
    async fetchAlerts() {
      try {
        const response = await dashboardAPI.getAlerts()
        this.alerts = response.data.data
      } catch (error) {
        console.error('Failed to fetch dashboard alerts:', error)
      }
    },

    // Dismiss alert
    async dismissAlert(alertId) {
      try {
        await dashboardAPI.dismissAlert(alertId)
        this.alerts = this.alerts.filter(alert => alert.id !== alertId)
      } catch (error) {
        console.error('Failed to dismiss alert:', error)
      }
    },

    // Initialize dashboard data
    async initializeDashboard() {
      await Promise.all([
        this.fetchStats(),
        this.fetchAnalytics(),
        this.fetchAlerts()
      ])
    }
  }
})
