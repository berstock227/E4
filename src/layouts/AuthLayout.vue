<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <div class="flex justify-center">
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
            <span class="text-white font-bold text-2xl">V</span>
          </div>
          <span class="text-2xl font-bold text-gray-900">Vue3 Project</span>
        </router-link>
      </div>
      
      <!-- Page Title -->
      <h2 v-if="pageTitle" class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ pageTitle }}
      </h2>
      <p v-if="pageSubtitle" class="mt-2 text-center text-sm text-gray-600">
        {{ pageSubtitle }}
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <router-view />
      </div>
    </div>

    <!-- Footer Links -->
    <div class="mt-8 text-center">
      <div class="flex justify-center space-x-4 text-sm text-gray-600">
        <router-link to="/" class="hover:text-primary-600">
          Back to Home
        </router-link>
        <span>•</span>
        <router-link to="/auth/login" class="hover:text-primary-600">
          Login
        </router-link>
        <span>•</span>
        <router-link to="/auth/register" class="hover:text-primary-600">
          Register
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  const titles = {
    'login': 'Sign in to your account',
    'register': 'Create your account',
    'forgot-password': 'Reset your password',
    'reset-password': 'Set new password',
    'verify-email': 'Verify your email'
  }
  return titles[route.name] || ''
})

const pageSubtitle = computed(() => {
  const subtitles = {
    'login': 'Welcome back! Please sign in to continue.',
    'register': 'Join us and start your journey.',
    'forgot-password': 'Enter your email address and we\'ll send you a link to reset your password.',
    'reset-password': 'Enter your new password below.',
    'verify-email': 'Please check your email and click the verification link.'
  }
  return subtitles[route.name] || ''
})
</script>
