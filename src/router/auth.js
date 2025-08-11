import { ROUTE_NAMES } from '@/utils/constants'

export default [
  {
    path: 'login',
    name: ROUTE_NAMES.LOGIN,
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      title: 'Login',
      guestOnly: true
    }
  },
  {
    path: 'register',
    name: ROUTE_NAMES.REGISTER,
    component: () => import('@/views/auth/Register.vue'),
    meta: {
      title: 'Register',
      guestOnly: true
    }
  },
  {
    path: 'forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPassword.vue'),
    meta: {
      title: 'Forgot Password',
      guestOnly: true
    }
  },
  {
    path: 'reset-password',
    name: 'reset-password',
    component: () => import('@/views/auth/ResetPassword.vue'),
    meta: {
      title: 'Reset Password',
      guestOnly: true
    }
  },
  {
    path: 'verify-email',
    name: 'verify-email',
    component: () => import('@/views/auth/VerifyEmail.vue'),
    meta: {
      title: 'Verify Email',
      guestOnly: true
    }
  }
]
