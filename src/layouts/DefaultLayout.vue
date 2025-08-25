<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <!-- Top bar -->
    <header class="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="h-8 w-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold">
            {{ appInitial }}
          </div>
          <span class="font-semibold">{{ appName }}</span>
        </RouterLink>

        <nav class="flex items-center gap-4">
          <RouterLink to="/" class="hover:text-primary-600">Home</RouterLink>
          <RouterLink to="/blog" class="hover:text-primary-600">Blog</RouterLink>

          <div v-if="isAuthed" class="flex items-center gap-3">
            <!-- Avatar using safe initial -->
            <div class="h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">
              {{ userInitial }}
            </div>
            <span class="hidden sm:inline-block">{{ userName }}</span>
            <button
              class="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200"
              @click="handleLogout"
            >
              Logout
            </button>
          </div>

          <div v-else class="flex items-center gap-2">
            <RouterLink to="/auth/login" class="px-3 py-1.5 rounded bg-gray-900 text-white hover:bg-gray-800">
              Login
            </RouterLink>
            <RouterLink to="/auth/register" class="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200">
              Sign up
            </RouterLink>
          </div>
        </nav>
      </div>
    </header>

    <!-- Page content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const auth = useAuthStore();

// App identity (fallback an toàn)
const appName = 'Vue App';
const appInitial = (appName?.trim?.()[0]?.toUpperCase?.()) || 'V';

// User state
const user = computed(() => auth.user || null);
const isAuthed = computed(() => auth.isAuthenticated);

const userName = computed(() => {
  const raw = user.value?.name ?? user.value?.email ?? 'Guest';
  return typeof raw === 'string' && raw.length ? raw : 'Guest';
});

const userInitial = computed(() => {
  const firstChar =
    user.value?.name?.trim?.()[0] ??
    user.value?.email?.trim?.()[0] ??
    'G';
  return firstChar?.toUpperCase?.() || 'G';
});

async function handleLogout() {
  try { await auth.logout(); } catch {}
  router.replace({ path: '/auth/login' });
}
</script>
