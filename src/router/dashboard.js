import { ROUTE_NAMES } from '@/utils/constants'

export default [
  {
    path: '',
    name: ROUTE_NAMES.DASHBOARD,
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    }
  },
  {
    path: 'blogs',
    name: 'dashboard-blogs',
    component: () => import('@/views/dashboard/BlogManagement.vue'),
    meta: {
      title: 'Blog Management',
      requiresAuth: true
    }
  },
  {
    path: 'blogs/create',
    name: 'dashboard-blog-create',
    component: () => import('@/views/dashboard/BlogCreate.vue'),
    meta: {
      title: 'Create Blog',
      requiresAuth: true
    }
  },
  {
    path: 'blogs/:id/edit',
    name: 'dashboard-blog-edit',
    component: () => import('@/views/dashboard/BlogEdit.vue'),
    meta: {
      title: 'Edit Blog',
      requiresAuth: true
    }
  },
  {
    path: 'users',
    name: 'dashboard-users',
    component: () => import('@/views/dashboard/UserManagement.vue'),
    meta: {
      title: 'User Management',
      requiresAuth: true,
      roles: ['admin', 'moderator']
    }
  },
  {
    path: 'settings',
    name: 'dashboard-settings',
    component: () => import('@/views/dashboard/Settings.vue'),
    meta: {
      title: 'Settings',
      requiresAuth: true
    }
  },
  {
    path: 'analytics',
    name: 'dashboard-analytics',
    component: () => import('@/views/dashboard/Analytics.vue'),
    meta: {
      title: 'Analytics',
      requiresAuth: true,
      roles: ['admin']
    }
  }
]
