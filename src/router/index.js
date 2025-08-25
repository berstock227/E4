import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { ROUTE_NAMES } from '@/utils/constants';

// Route modules
import authRoutes from './auth';
import blogRoutes from './blog';
import dashboardRoutes from './dashboard';

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: ROUTE_NAMES.HOME, component: () => import('@/views/Home.vue'), meta: { title: 'Home' } },
      { path: 'blog', children: blogRoutes },
      { path: 'profile', name: ROUTE_NAMES.PROFILE, component: () => import('@/views/Profile.vue'), meta: { title: 'Profile', requiresAuth: true } },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: authRoutes,
  },
  {
    path: '/dashboard',
    component: DefaultLayout,
    children: dashboardRoutes,
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue'), meta: { title: 'Not Found' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  // set title
  if (to.meta?.title) document.title = to.meta.title;

  // Ensure we know current auth state
  if (auth.user === null && localStorage.getItem('auth_token')) {
    try { await auth.initializeAuth(); } catch {}
  }

  const isAuthed = auth.isAuthenticated;
  const goingToLogin = to.name === ROUTE_NAMES.LOGIN || to.path === '/auth/login';

  // Prevent infinite loop: do NOT redirect when already at login
  if (to.meta?.requiresAuth && !isAuthed) {
    if (!goingToLogin) return next({ name: ROUTE_NAMES.LOGIN, query: { redirect: to.fullPath } });
  }

  // If already logged in and visiting guest-only pages, go home
  if (to.meta?.guestOnly && isAuthed && goingToLogin) {
    return next({ name: ROUTE_NAMES.HOME });
  }

  return next();
});

router.afterEach((to, from) => {
  if (import.meta.env.DEV) {
    console.log(`🚀 Navigation: ${from.path} → ${to.path}`);
  }
});

export default router;
