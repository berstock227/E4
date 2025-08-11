<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">V</span>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
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
              Reset link sent!
            </h3>
            <div class="mt-2 text-sm text-green-700">
              <p>
                We've sent a password reset link to <strong>{{ form.email }}</strong>. 
                Please check your email and click the link to reset your password.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Forgot Password Form -->
      <form v-if="!isSuccess" class="mt-8 space-y-6" @submit.prevent="handleForgotPassword">
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

          <!-- Additional Info -->
          <div class="text-sm text-gray-600">
            <p>
              Don't remember your email address? 
              <router-link to="/auth/login" class="font-medium text-primary-600 hover:text-primary-500">
                Contact support
              </router-link>
            </p>
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
            {{ authStore.isLoading ? 'Sending...' : 'Send reset link' }}
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
      <div v-if="isSuccess" class="mt-6 space-y-4">
        <div class="text-center">
          <p class="text-sm text-gray-600 mb-4">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <button
            @click="resendEmail"
            class="text-sm font-medium text-primary-600 hover:text-primary-500"
            :disabled="authStore.isLoading"
          >
            Resend email
          </button>
        </div>
        
        <div class="text-center">
          <router-link 
            to="/auth/login" 
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            ← Back to login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { VALIDATION_RULES } from '@/utils/constants'

const authStore = useAuthStore()

// Form data
const form = ref({
  email: ''
})

// UI state
const isSuccess = ref(false)
const errors = ref({})

// Computed
const isFormValid = computed(() => {
  return form.value.email && !Object.keys(errors.value).length
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

  return Object.keys(errors.value).length === 0
}

const handleForgotPassword = async () => {
  if (!validateForm()) return

  try {
    await authStore.forgotPassword(form.value.email)
    isSuccess.value = true
  } catch (error) {
    // Error is handled by the store
    console.error('Forgot password error:', error)
  }
}

const resendEmail = async () => {
  try {
    await authStore.forgotPassword(form.value.email)
    // Show success message again
  } catch (error) {
    console.error('Resend email error:', error)
  }
}

// Lifecycle
onMounted(() => {
  // Clear any previous errors
  authStore.clearError()
})
</script>
