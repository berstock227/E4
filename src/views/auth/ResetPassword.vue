<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">V</span>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Enter your new password below.
        </p>
      </div>

      <!-- Success Message -->
      <div v-if="isSuccess" class="rounded-md bg-green-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">
              Password reset successful!
            </h3>
            <div class="mt-2 text-sm text-green-700">
              <p>
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Reset Password Form -->
      <form v-if="!isSuccess" class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        <div class="space-y-4">
          <!-- Email Field -->
          <div class="form-group">
            <label for="email" class="form-label">Email address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input"
              :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.email }"
              placeholder="Enter your email address"
              :disabled="authStore.isLoading"
            />
            <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
          </div>

          <!-- New Password Field -->
          <div class="form-group">
            <label for="password" class="form-label">New password</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="input pr-10"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.password }"
                placeholder="Enter your new password"
                :disabled="authStore.isLoading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                :disabled="authStore.isLoading"
              >
                <svg
                  v-if="showPassword"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="form-error">{{ errors.password }}</p>
            <!-- Password strength indicator -->
            <div v-if="form.password" class="mt-2">
              <div class="flex space-x-1">
                <div
                  v-for="(strength, index) in passwordStrength"
                  :key="index"
                  class="h-1 flex-1 rounded"
                  :class="strength.color"
                ></div>
              </div>
              <p class="text-xs mt-1" :class="passwordStrengthText.color">
                {{ passwordStrengthText.text }}
              </p>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div class="form-group">
            <label for="password_confirmation" class="form-label">Confirm new password</label>
            <div class="relative">
              <input
                id="password_confirmation"
                v-model="form.password_confirmation"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="input pr-10"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.password_confirmation }"
                placeholder="Confirm your new password"
                :disabled="authStore.isLoading"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                :disabled="authStore.isLoading"
              >
                <svg
                  v-if="showConfirmPassword"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password_confirmation" class="form-error">{{ errors.password_confirmation }}</p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="authStore.error" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ authStore.error }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="authStore.isLoading || !isFormValid"
          >
            <span v-if="authStore.isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ authStore.isLoading ? 'Resetting...' : 'Reset password' }}
          </button>
        </div>

        <!-- Back to Login -->
        <div class="text-center">
          <router-link 
            to="/auth/login" 
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            ← Back to login
          </router-link>
        </div>
      </form>

      <!-- Success Actions -->
      <div v-if="isSuccess" class="mt-6 text-center">
        <router-link 
          to="/auth/login" 
          class="btn-primary"
        >
          Sign in with new password
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { VALIDATION_RULES } from '@/utils/constants'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Form data
const form = ref({
  email: '',
  password: '',
  password_confirmation: '',
  token: ''
})

// UI state
const isSuccess = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errors = ref({})

// Computed
const isFormValid = computed(() => {
  return form.value.email && 
         form.value.password && 
         form.value.password_confirmation && 
         !Object.keys(errors.value).length
})

const passwordStrength = computed(() => {
  const password = form.value.password
  if (!password) return []

  let strength = 0
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[@$!%*?&]/.test(password)
  ]
  
  strength = checks.filter(Boolean).length

  const colors = [
    'bg-red-500',
    'bg-orange-500', 
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500'
  ]

  return Array.from({ length: 5 }, (_, i) => ({
    color: i < strength ? colors[strength - 1] : 'bg-gray-200'
  }))
})

const passwordStrengthText = computed(() => {
  const password = form.value.password
  if (!password) return { text: '', color: '' }

  let strength = 0
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[@$!%*?&]/.test(password)
  ]
  
  strength = checks.filter(Boolean).length

  const levels = [
    { text: 'Very weak', color: 'text-red-600' },
    { text: 'Weak', color: 'text-orange-600' },
    { text: 'Fair', color: 'text-yellow-600' },
    { text: 'Good', color: 'text-blue-600' },
    { text: 'Strong', color: 'text-green-600' }
  ]

  return levels[strength - 1] || { text: '', color: '' }
})

// Methods
const validateForm = () => {
  errors.value = {}

  // Email validation
  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!VALIDATION_RULES.EMAIL.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }

  // Password validation
  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
  } else if (!VALIDATION_RULES.PASSWORD.test(form.value.password)) {
    errors.value.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  }

  // Confirm password validation
  if (!form.value.password_confirmation) {
    errors.value.password_confirmation = 'Please confirm your password'
  } else if (form.value.password !== form.value.password_confirmation) {
    errors.value.password_confirmation = 'Passwords do not match'
  }

  return Object.keys(errors.value).length === 0
}

const handleResetPassword = async () => {
  if (!validateForm()) return

  try {
    await authStore.resetPassword({
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.password_confirmation,
      token: form.value.token
    })
    isSuccess.value = true
  } catch (error) {
    // Error is handled by the store
    console.error('Reset password error:', error)
  }
}

// Lifecycle
onMounted(() => {
  // Clear any previous errors
  authStore.clearError()
  
  // Get token from route query or params
  const token = route.query.token || route.params.token
  if (token) {
    form.value.token = token
  }
  
  // Get email from route query if available
  const email = route.query.email
  if (email) {
    form.value.email = email
  }
})
</script>
