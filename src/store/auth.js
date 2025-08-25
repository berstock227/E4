import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authAPI } from '@/api/auth';
import { AUTH_CONFIG } from '@/utils/constants';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const token = ref(localStorage.getItem(AUTH_CONFIG.TOKEN_KEY) || null);
  const refreshToken = ref(localStorage.getItem(AUTH_CONFIG.REFRESH_TOKEN_KEY) || null);
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  // Helpers
  const clearAuth = () => {
    token.value = null;
    refreshToken.value = null;
    user.value = null;
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.USER_KEY);
  };

  const initializeAuth = async () => {
    const storedUser = localStorage.getItem(AUTH_CONFIG.USER_KEY);
    if (storedUser && storedUser !== 'undefined') {
      try {
        user.value = JSON.parse(storedUser);
      } catch {
        clearAuth();
      }
    }
    const t = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    if (t && !user.value) {
      // Try get profile silently
      try {
        await fetchProfile();
      } catch {
        clearAuth();
      }
    }
  };

  const login = async (payload) => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await authAPI.login(payload);
      const data = res.data ?? res; // support axios or wrapped
      const access = data.access_token || data.data?.access_token;
      const refresh = data.refresh_token || data.data?.refresh_token;
      const u = data.user || data.data?.user;
      token.value = access;
      refreshToken.value = refresh || null;
      if (token.value) localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, token.value);
      if (refreshToken.value) localStorage.setItem(AUTH_CONFIG.REFRESH_TOKEN_KEY, refreshToken.value);
      if (u) {
        user.value = u;
        localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(u));
      } else {
        await fetchProfile();
      }
      return data;
    } catch (err) {
      clearAuth();
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchProfile = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await authAPI.getProfile();
      const payload = res.data ?? res;
      const u = payload.user || payload.data?.user;
      if (u) {
        user.value = u;
        localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(u));
      }
      return u;
    } catch (err) {
      error.value = err.message || 'Failed to fetch profile';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch {}
    clearAuth();
  };

  const clearError = () => (error.value = null);
  const updateUser = (partial) => {
    user.value = { ...(user.value || {}), ...(partial || {}) };
    localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(user.value));
  };

  return {
    // state
    user, token, refreshToken, isLoading, error,
    // getters
    isAuthenticated, isAdmin,
    // actions
    initializeAuth, login, fetchProfile, logout, clearError, updateUser, clearAuth,
  };
});
