// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      PROFILE: '/auth/profile',
      CHANGE_PASSWORD: '/auth/change-password',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_EMAIL: '/auth/verify-email',
      RESEND_VERIFICATION: '/auth/resend-verification',
    },
    USER: {
      PROFILE: '/users/profile',
      UPDATE: '/users/update',
      AVATAR: '/users/avatar',
      STATS: '/users/stats',
      ACTIVITY: '/users/activity',
      COMMENTS: '/users/comments',
      ACCOUNT: '/users/account',
      EXPORT: '/users/export',
    },
    BLOG: {
      LIST: '/blogs',
      CREATE: '/blogs',
      DETAIL: '/blogs/:id',
      UPDATE: '/blogs/:id',
      DELETE: '/blogs/:id',
      UPLOAD: '/blogs/upload',
      SEARCH: '/blogs/search',
      CATEGORIES: '/blogs/categories',
      TAGS: '/blogs/tags',
      STATS: '/stats',
      MY_BLOGS: '/blogs/my-blogs',
      PUBLISH: '/blogs/:id/publish',
      UNPUBLISH: '/blogs/:id/unpublish',
      ARCHIVE: '/blogs/:id/archive',
      VIEWS: '/blogs/:id/views',
      RELATED: '/blogs/:id/related',
      COMMENTS: '/blogs/:id/comments',
      COMMENT_DETAIL: '/blogs/:id/comments/:commentId',
    },
    DASHBOARD: {
      STATS: '/stats',
      ANALYTICS: '/dashboard/analytics',
      ALERTS: '/dashboard/alerts',
      ALERT_DETAIL: '/dashboard/alerts/:id',
    }
  }
}

// App Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Vue 3 Project 2025',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Modern Vue 3 Application',
  DEBUG: import.meta.env.VITE_DEBUG_MODE === 'true',
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
}

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: parseInt(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 10,
  MAX_PAGE_SIZE: parseInt(import.meta.env.VITE_MAX_PAGE_SIZE) || 100,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
}

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: parseInt(import.meta.env.VITE_MAX_FILE_SIZE) || 5242880, // 5MB
  ALLOWED_TYPES: (import.meta.env.VITE_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,application/pdf').split(','),
  IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
}

// Authentication Configuration
export const AUTH_CONFIG = {
  TOKEN_KEY: 'auth_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  USER_KEY: 'user_data',
  TOKEN_EXPIRY: import.meta.env.VITE_TOKEN_EXPIRY || '24h',
}

// Route Names
export const ROUTE_NAMES = {
  HOME: 'home',
  LOGIN: 'login',
  REGISTER: 'register',
  PROFILE: 'profile',
  BLOG: {
    LIST: 'blog-list',
    CREATE: 'blog-create',
    EDIT: 'blog-edit',
    DETAIL: 'blog-detail',
  },
  DASHBOARD: 'dashboard',
}

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
}

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  URL: /^https?:\/\/.+/,
}

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DATETIME: 'MMM dd, yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
  TIME: 'HH:mm',
}

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
}

// Theme Configuration
export const THEME_CONFIG = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
}

// Language Configuration
export const LANGUAGE_CONFIG = {
  EN: 'en',
  VI: 'vi',
  DEFAULT: 'en',
}
