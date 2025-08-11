<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">V</span>
              </div>
              <span class="text-xl font-bold text-gray-900">Vue3 Project</span>
            </router-link>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex space-x-8">
            <router-link 
              to="/" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-primary-600': $route.name === 'home' }"
            >
              Home
            </router-link>
            <router-link 
              to="/blog" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-primary-600': $route.path.startsWith('/blog') }"
            >
              Blog
            </router-link>
            <router-link 
              v-if="authStore.isAuthenticated"
              to="/dashboard" 
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-primary-600': $route.path.startsWith('/dashboard') }"
            >
              Dashboard
            </router-link>
          </nav>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <!-- Search -->
            <div class="relative">
              <input
                type="text"
                placeholder="Search..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                v-model="searchQuery"
                @keyup.enter="handleSearch"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Auth Buttons -->
            <div v-if="!authStore.isAuthenticated" class="flex items-center space-x-2">
              <router-link 
                to="/auth/login"
                class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </router-link>
              <router-link 
                to="/auth/register"
                class="btn-primary"
              >
                Register
              </router-link>
            </div>

            <!-- User Menu -->
            <div v-else class="relative">
              <button
                @click="toggleUserMenu"
                class="flex items-center space-x-2 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2"
              >
                <img
                  v-if="authStore.userAvatar"
                  :src="authStore.userAvatar"
                  :alt="authStore.userName"
                  class="w-8 h-8 rounded-full"
                />
                <div v-else class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">
                    {{ authStore.userName.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <span class="text-sm font-medium">{{ authStore.userName }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
              >
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="showUserMenu = false"
                >
                  Profile
                </router-link>
                <router-link
                  to="/dashboard"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="showUserMenu = false"
                >
                  Dashboard
                </router-link>
                <hr class="my-1" />
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">V</span>
              </div>
              <span class="text-xl font-bold text-gray-900">Vue3 Project</span>
            </div>
            <p class="text-gray-600 mb-4">
              A modern Vue 3 application with full-featured blog system, authentication, and admin dashboard.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-primary-600">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-primary-600">
                <span class="sr-only">GitHub</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Navigation</h3>
            <ul class="space-y-2">
              <li>
                <router-link to="/" class="text-gray-600 hover:text-primary-600">Home</router-link>
              </li>
              <li>
                <router-link to="/blog" class="text-gray-600 hover:text-primary-600">Blog</router-link>
              </li>
              <li>
                <router-link to="/auth/login" class="text-gray-600 hover:text-primary-600">Login</router-link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-600 hover:text-primary-600">Documentation</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-primary-600">Contact</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-primary-600">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="mt-8 pt-8 border-t border-gray-200">
          <p class="text-center text-gray-400 text-sm">
            © 2025 Vue3 Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    <!-- Click outside to close user menu -->
    <div
      v-if="showUserMenu"
      class="fixed inset-0 z-40"
      @click="showUserMenu = false"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

const searchQuery = ref('')
const showUserMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'blog-search',
      query: { q: searchQuery.value.trim() }
    })
    searchQuery.value = ''
  }
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>
