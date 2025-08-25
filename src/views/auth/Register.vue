<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">V</span>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <router-link to="/auth/login" class="font-medium text-primary-600 hover:text-primary-500">
            sign in to your existing account
          </router-link>
        </p>
      </div>

      <!-- Registration Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <!-- Full Name Field -->
          <div class="form-group">
            <label for="name" class="form-label">Full name</label>
            <input
              id="name"
              v-model.trim="form.name"
              type="text"
              required
              class="input"
              :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.name }"
              placeholder="Enter your full name"
              :disabled="authStore.isLoading"
            />
            <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
          </div>

          <!-- Email Field -->
          <div class="form-group">
            <label for="email" class="form-label">Email address</label>
            <input
              id="email"
              v-model.trim="form.email"
              type="email"
              required
              class="input"
              :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.email }"
              placeholder="Enter your email"
              :disabled="authStore.isLoading"
            />
            <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="input pr-10"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.password }"
                placeholder="Create a password"
                :disabled="authStore.isLoading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                :disabled="authStore.isLoading"
                aria-label="Toggle password visibility"
              >
                <svg v-if="showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                />
              </div>
              <p class="text-xs mt-1" :class="passwordStrengthText.color">
                {{ passwordStrengthText.text }}
              </p>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div class="form-group">
            <label for="password_confirmation" class="form-label">Confirm password</label>
            <div class="relative">
              <input
                id="password_confirmation"
                v-model="form.password_confirmation"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="input pr-10"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.password_confirmation }"
                placeholder="Confirm your password"
                :disabled="authStore.isLoading"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                :disabled="authStore.isLoading"
                aria-label="Toggle confirm password visibility"
              >
                <svg v-if="showConfirmPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password_confirmation" class="form-error">{{ errors.password_confirmation }}</p>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                v-model="form.terms"
                type="checkbox"
                required
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                :disabled="authStore.isLoading"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="text-gray-700">
                I agree to the
                <a href="#" class="text-primary-600 hover:text-primary-500">Terms of Service</a>
                and
                <a href="#" class="text-primary-600 hover:text-primary-500">Privacy Policy</a>
              </label>
            </div>
          </div>

          <!-- Newsletter Subscription -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="newsletter"
                v-model="form.newsletter"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                :disabled="authStore.isLoading"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="newsletter" class="text-gray-700">
                Subscribe to our newsletter for updates and news
              </label>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="globalError" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ globalError }}
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
            {{ authStore.isLoading ? 'Creating account...' : 'Create account' }}
          </button>
        </div>

        <!-- Social Registration -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button type="button" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" :disabled="authStore.isLoading">
              <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span class="ml-2">Google</span>
            </button>
            <button type="button" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" :disabled="authStore.isLoading">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              <span class="ml-2">Twitter</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { authAPI } from '@/api/auth';

// Regex cục bộ cho validate
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}_\-+=~`|\\:;'",.<>/]).{8,}$/;

const router = useRouter();
const authStore = useAuthStore();

// Form data
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: false,
  newsletter: false,
});

// UI state
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const errors = ref({});
const globalError = ref('');

// Computed
const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.email &&
    form.value.password &&
    form.value.password_confirmation &&
    form.value.terms &&
    Object.keys(errors.value).length === 0
  );
});

const passwordStrength = computed(() => {
  const password = form.value.password;
  if (!password) return [];
  let strength = 0;
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[@$!%*?&#^()[\]{}_\-+=~`|\\:;'",.<>/]/.test(password),
  ];
  strength = checks.filter(Boolean).length;
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  return Array.from({ length: 5 }, (_, i) => ({
    color: i < strength ? colors[strength - 1] : 'bg-gray-200',
  }));
});

const passwordStrengthText = computed(() => {
  const password = form.value.password;
  if (!password) return { text: '', color: '' };
  let strength = 0;
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[@$!%*?&#^()[\]{}_\-+=~`|\\:;'",.<>/]/.test(password),
  ];
  strength = checks.filter(Boolean).length;
  const levels = [
    { text: 'Very weak', color: 'text-red-600' },
    { text: 'Weak', color: 'text-orange-600' },
    { text: 'Fair', color: 'text-yellow-600' },
    { text: 'Good', color: 'text-blue-600' },
    { text: 'Strong', color: 'text-green-600' },
  ];
  return levels[strength - 1] || { text: '', color: '' };
});

// Methods
const validateForm = () => {
  errors.value = {};
  if (!form.value.name) errors.value.name = 'Full name is required';
  else if (form.value.name.length < 2) errors.value.name = 'Name must be at least 2 characters';

  if (!form.value.email) errors.value.email = 'Email is required';
  else if (!emailRegex.test(form.value.email)) errors.value.email = 'Please enter a valid email address';

  if (!form.value.password) errors.value.password = 'Password is required';
  else if (form.value.password.length < 8) errors.value.password = 'Password must be at least 8 characters';
  else if (!strongPwRegex.test(form.value.password))
    errors.value.password = 'Password must contain upper, lower, number and special character';

  if (!form.value.password_confirmation) errors.value.password_confirmation = 'Please confirm your password';
  else if (form.value.password !== form.value.password_confirmation)
    errors.value.password_confirmation = 'Passwords do not match';

  if (!form.value.terms) errors.value.terms = 'You must agree to the terms and conditions';

  return Object.keys(errors.value).length === 0;
};

const handleRegister = async () => {
  globalError.value = '';
  if (!validateForm()) return;

  authStore.clearError();
  try {
    // 1) Gọi API đăng ký (BE chỉ cần name/email/password)
    await authAPI.register({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    });

    // 2) Tự đăng nhập
    try {
      await authStore.login({
        email: form.value.email,
        password: form.value.password,
      });
    } catch (e) {
      console.error('[Auto login failed]', e);
      globalError.value = 'Account created. Please sign in manually.';
      return;
    }

    // 3) Redirect an toàn
    const redirect = (new URLSearchParams(location.search).get('redirect') || '/').toString();
    await router.replace(redirect);
  } catch (e) {
    console.error('Registration error:', e);
    globalError.value =
      e?.error?.message || e?.message || 'Registration failed. Please try again later.';
  }
};

// Lifecycle
onMounted(() => {
  authStore.clearError();
});
</script>
