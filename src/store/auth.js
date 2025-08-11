import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '@/api/auth'
import { AUTH_CONFIG } from '@/utils/constants'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem(AUTH_CONFIG.TOKEN_KEY) || null)
  const refreshToken = ref(localStorage.getItem(AUTH_CONFIG.REFRESH_TOKEN_KEY) || null)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isModerator = computed(() => user.value?.role === 'moderator' || user.value?.role === 'admin')
  const userRole = computed(() => user.value?.role || 'guest')
  const userName = computed(() => user.value?.name || 'Guest')
  const userEmail = computed(() => user.value?.email || '')
  const userAvatar = computed(() => user.value?.avatar || null)

  // Actions
  const initializeAuth = () => {
    const storedUser = localStorage.getItem(AUTH_CONFIG.USER_KEY)
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (e) {
        console.error('Failed to parse stored user data:', e)
        clearAuth()
      }
    }
  }

  const login = async (credentials) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authAPI.login(credentials)
      
      // Store tokens
      token.value = response.access_token
      refreshToken.value = response.refresh_token
      user.value = response.user
      
      // Save to localStorage
      localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, response.access_token)
      localStorage.setItem(AUTH_CONFIG.REFRESH_TOKEN_KEY, response.refresh_token)
      localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(response.user))
      
      return response
    } catch (err) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authAPI.register(userData)
      
      // Auto login after successful registration
      if (response.access_token) {
        token.value = response.access_token
        refreshToken.value = response.refresh_token
        user.value = response.user
        
        localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, response.access_token)
        localStorage.setItem(AUTH_CONFIG.REFRESH_TOKEN_KEY, response.refresh_token)
        localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(response.user))
      }
      
      return response
    } catch (err) {
      error.value = err.message || 'Registration failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      if (token.value) {
        await authAPI.logout()
      }
    } catch (err) {
      console.error('Logout API error:', err)
    } finally {
      clearAuth()
      isLoading.value = false
    }
  }

  const refreshAuthToken = async () => {
    if (!refreshToken.value) {
      throw new Error('No refresh token available')
    }
    
    try {
      const response = await authAPI.refreshToken(refreshToken.value)
      
      token.value = response.access_token
      refreshToken.value = response.refresh_token
      
      localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, response.access_token)
      localStorage.setItem(AUTH_CONFIG.REFRESH_TOKEN_KEY, response.refresh_token)
      
      return response
    } catch (err) {
      clearAuth()
      throw err
    }
  }

  const fetchProfile = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authAPI.getProfile()
      user.value = response.user
      localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(response.user))
      return response
    } catch (err) {
      error.value = err.message || 'Failed to fetch profile'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateProfile = async (profileData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authAPI.updateProfile(profileData)
      user.value = response.user
      localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(response.user))
      return response
    } catch (err) {
      error.value = err.message || 'Failed to update profile'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const changePassword = async (passwordData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authAPI.changePassword(passwordData)
      return response
    } catch (err) {
      error.value = err.message || 'Failed to change password'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const forgotPassword = async (email) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authAPI.forgotPassword(email)
      return response
    } catch (err) {
      error.value = err.message || 'Failed to send reset email'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const resetPassword = async (resetData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authAPI.resetPassword(resetData)
      return response
    } catch (err) {
      error.value = err.message || 'Failed to reset password'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const verifyEmail = async (token) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authAPI.verifyEmail(token)
      if (user.value) {
        user.value.email_verified_at = new Date().toISOString()
        localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(user.value))
      }
      return response
    } catch (err) {
      error.value = err.message || 'Failed to verify email'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const resendVerification = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authAPI.resendVerification()
      return response
    } catch (err) {
      error.value = err.message || 'Failed to resend verification'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const clearAuth = () => {
    user.value = null
    token.value = null
    refreshToken.value = null
    error.value = null
    
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY)
    localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY)
    localStorage.removeItem(AUTH_CONFIG.USER_KEY)
  }

  const clearError = () => {
    error.value = null
  }

  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData }
    localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(user.value))
  }

  return {
    // State
    user,
    token,
    refreshToken,
    isLoading,
    error,
    
    // Getters
    isAuthenticated,
    isAdmin,
    isModerator,
    userRole,
    userName,
    userEmail,
    userAvatar,
    
    // Actions
    initializeAuth,
    login,
    register,
    logout,
    refreshAuthToken,
    fetchProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification,
    clearAuth,
    clearError,
    updateUser
  }
})
