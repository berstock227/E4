import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { ROUTE_NAMES } from '@/utils/constants'

// Import route modules
import authRoutes from './auth'
import blogRoutes from './blog'
import dashboardRoutes from './dashboard'

// Import layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: ROUTE_NAMES.HOME,
        component: () => import('@/views/Home.vue'),
        meta: {
          title: 'Home',
          requiresAuth: false
        }
      }
    ]
  },
  
  // Auth routes
  {
    path: '/auth',
    component: AuthLayout,
    children: authRoutes
  },
  
  // Blog routes
  {
    path: '/blog',
    component: DefaultLayout,
    children: blogRoutes
  },
  
  // Dashboard routes (protected)
  {
    path: '/dashboard',
    component: DefaultLayout,
    children: dashboardRoutes,
    meta: {
      requiresAuth: true
    }
  },
  
  // Profile route
  {
    path: '/profile',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: ROUTE_NAMES.PROFILE,
        component: () => import('@/views/Profile.vue'),
        meta: {
          title: 'Profile',
          requiresAuth: true
        }
      }
    ]
  },
  
  // 404 route
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: 'Page Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Set page title
  if (to.meta.title) {
    document.title = `${to.meta.title} - Vue 3 Project 2025`
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login with return URL
    next({
      name: ROUTE_NAMES.LOGIN,
      query: { redirect: to.fullPath }
    })
    return
  }
  
  // Check if user is already authenticated and trying to access auth pages
  if (authStore.isAuthenticated && to.meta.guestOnly) {
    next({ name: ROUTE_NAMES.HOME })
    return
  }
  
  // Check role-based access
  if (to.meta.roles && !to.meta.roles.includes(authStore.userRole)) {
    next({ name: 'not-found' })
    return
  }
  
  next()
})

// After navigation
router.afterEach((to, from) => {
  // Log navigation in development
  if (import.meta.env.DEV) {
    console.log(`🚀 Navigation: ${from.path} → ${to.path}`)
  }
})

export default router
