// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE || '/api',
  TIMEOUT: 15000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      ME: '/auth/me',
    },
    BLOG: {
      LIST: '/blogs',
      CREATE: '/blogs',
      DETAIL: '/blogs/:id',
      UPDATE: '/blogs/:id',
      DELETE: '/blogs/:id',
      UPLOAD: '/upload',
      CATEGORIES: '/blogs/categories',
      TAGS: '/blogs/tags',
    },
    STATS: '/stats',
  },
};

// App Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Vue 3 Project 2025',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Modern Vue 3 Application',
  DEBUG: import.meta.env.VITE_DEBUG_MODE === 'true',
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
};

// Authentication Configuration
export const AUTH_CONFIG = {
  TOKEN_KEY: 'auth_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  USER_KEY: 'user_data',
  TOKEN_EXPIRY: import.meta.env.VITE_TOKEN_EXPIRY || '24h',
};

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
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  SERVER_ERROR: 500,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
};

// Theme Configuration
export const THEME_CONFIG = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Language Configuration
export const LANGUAGE_CONFIG = {
  EN: 'en',
  VI: 'vi',
  DEFAULT: 'en',
};
// ===== Form Validation Rules (dùng cho Login.vue / Register.vue) =====
export const VALIDATION_RULES = {
  name: {
    required: (v) => !!v || 'Vui lòng nhập tên',
    min: (v) => (v?.length ?? 0) >= 2 || 'Tên phải có ít nhất 2 ký tự',
  },
  email: {
    required: (v) => !!v || 'Vui lòng nhập email',
    pattern: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email không hợp lệ',
  },
  password: {
    required: (v) => !!v || 'Vui lòng nhập mật khẩu',
    min: (v) => (v?.length ?? 0) >= 6 || 'Mật khẩu ≥ 6 ký tự',
  },
};
