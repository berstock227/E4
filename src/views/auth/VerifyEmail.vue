<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">V</span>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Verify your email
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          We've sent a verification link to your email address.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p class="mt-4 text-sm text-gray-600">Verifying your email...</p>
      </div>

      <!-- Success Message -->
      <div v-else-if="isSuccess" class="rounded-md bg-green-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">
              Email verified successfully!
            </h3>
            <div class="mt-2 text-sm text-green-700">
              <p>
                Your email address has been verified. You can now access all features of your account.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-else-if="error" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              Verification failed
            </h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Manual Verification Form -->
      <div v-if="!isLoading && !isSuccess && !error" class="mt-8 space-y-6">
        <div class="text-center">
          <p class="text-sm text-gray-600 mb-4">
            Didn't receive the verification email? Enter your email address below and we'll send you a new one.
          </p>
        </div>

        <form @submit.prevent="handleResendVerification">
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
          </div>

          <!-- Submit Button -->
          <div class="mt-6">
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="authStore.isLoading || !form.email"
            >
              <span v-if="authStore.isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ authStore.isLoading ? 'Sending...' : 'Resend verification email' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Success Actions -->
      <div v-if="isSuccess" class="mt-6 space-y-4">
        <div class="text-center">
          <router-link 
            to="/dashboard" 
            class="btn-primary"
          >
            Go to Dashboard
          </router-link>
        </div>
        
        <div class="text-center">
          <router-link 
            to="/auth/login" 
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in to your account
          </router-link>
        </div>
      </div>

      <!-- Error Actions -->
      <div v-if="error" class="mt-6 space-y-4">
        <div class="text-center">
          <button
            @click="retryVerification"
            class="btn-primary"
            :disabled="authStore.isLoading"
          >
            Try Again
          </button>
        </div>
        
        <div class="text-center">
          <router-link 
            to="/auth/login" 
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            Back to login
          </router-link>
        </div>
      </div>

      <!-- General Actions -->
      <div v-if="!isLoading && !isSuccess && !error" class="mt-6 text-center">
        <router-link 
          to="/auth/login" 
          class="font-medium text-primary-600 hover:text-primary-500"
        >
          ← Back to login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { VALIDATION_RULES } from '@/utils/constants'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Form data
const form = ref({
  email: ''
})

// UI state
const isLoading = ref(false)
const isSuccess = ref(false)
const error = ref('')
const errors = ref({})

// Methods
const validateEmail = (email) => {
  if (!email) {
    return 'Email is required'
  }
  if (!VALIDATION_RULES.EMAIL.test(email)) {
    return 'Please enter a valid email address'
  }
  return null
}

const verifyEmail = async (token) => {
  isLoading.value = true
  error.value = ''
  
  try {
    await authStore.verifyEmail(token)
    isSuccess.value = true
  } catch (err) {
    error.value = err.message || 'Email verification failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const handleResendVerification = async () => {
  const emailError = validateEmail(form.value.email)
  if (emailError) {
    errors.value.email = emailError
    return
  }

  errors.value = {}

  try {
    await authStore.resendVerification()
    // Show success message
    isSuccess.value = true
  } catch (err) {
    error.value = err.message || 'Failed to resend verification email. Please try again.'
  }
}

const retryVerification = () => {
  const token = route.query.token || route.params.token
  if (token) {
    verifyEmail(token)
  } else {
    error.value = 'No verification token found. Please request a new verification email.'
  }
}

// Lifecycle
onMounted(async () => {
  // Clear any previous errors
  authStore.clearError()
  
  // Get token from route query or params
  const token = route.query.token || route.params.token
  
  if (token) {
    // Auto-verify if token is present
    await verifyEmail(token)
  } else {
    // Show manual verification form
    isLoading.value = false
  }
  
  // Get email from route query if available
  const email = route.query.email
  if (email) {
    form.value.email = email
  }
})
</script>
