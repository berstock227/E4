<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Thay đổi mật khẩu</h2>
      <button
        v-if="!isEditing"
        @click="startEdit"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
        Thay đổi
      </button>
    </div>

    <form v-if="isEditing" @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Current Password -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Mật khẩu hiện tại
        </label>
        <div class="relative">
          <input
            v-model="form.currentPassword"
            :type="showCurrentPassword ? 'text' : 'password'"
            class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập mật khẩu hiện tại"
            required
          />
          <button
            type="button"
            @click="showCurrentPassword = !showCurrentPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg v-if="showCurrentPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
            <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- New Password -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Mật khẩu mới
        </label>
        <div class="relative">
          <input
            v-model="form.newPassword"
            :type="showNewPassword ? 'text' : 'password'"
            class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập mật khẩu mới"
            required
          />
          <button
            type="button"
            @click="showNewPassword = !showNewPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg v-if="showNewPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
            <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
        <div class="mt-2">
          <div class="flex items-center space-x-2">
            <div class="flex-1 bg-gray-200 rounded-full h-2">
              <div
                class="h-2 rounded-full transition-all duration-300"
                :class="passwordStrengthClass"
                :style="{ width: passwordStrength + '%' }"
              ></div>
            </div>
            <span class="text-sm text-gray-500">{{ passwordStrengthText }}</span>
          </div>
        </div>
      </div>

      <!-- Confirm Password -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Xác nhận mật khẩu mới
        </label>
        <div class="relative">
          <input
            v-model="form.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-300': form.confirmPassword && !passwordsMatch }"
            placeholder="Nhập lại mật khẩu mới"
            required
          />
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg v-if="showConfirmPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
            <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
        <p v-if="form.confirmPassword && !passwordsMatch" class="mt-1 text-sm text-red-600">
          Mật khẩu xác nhận không khớp
        </p>
      </div>

      <!-- Password Requirements -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h4 class="text-sm font-medium text-gray-700 mb-3">Yêu cầu mật khẩu:</h4>
        <ul class="text-sm text-gray-600 space-y-1">
          <li class="flex items-center" :class="{ 'text-green-600': hasMinLength }">
            <svg v-if="hasMinLength" class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
            </svg>
            Ít nhất 8 ký tự
          </li>
          <li class="flex items-center" :class="{ 'text-green-600': hasUppercase }">
            <svg v-if="hasUppercase" class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
            </svg>
            Có chữ hoa
          </li>
          <li class="flex items-center" :class="{ 'text-green-600': hasLowercase }">
            <svg v-if="hasLowercase" class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
            </svg>
            Có chữ thường
          </li>
          <li class="flex items-center" :class="{ 'text-green-600': hasNumber }">
            <svg v-if="hasNumber" class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
            </svg>
            Có số
          </li>
          <li class="flex items-center" :class="{ 'text-green-600': hasSpecialChar }">
            <svg v-if="hasSpecialChar" class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
            </svg>
            Có ký tự đặc biệt (!@#$%^&*)
          </li>
        </ul>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          @click="cancelEdit"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Hủy
        </button>
        <button
          type="submit"
          :disabled="loading || !isFormValid"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Đang thay đổi...' : 'Thay đổi mật khẩu' }}
        </button>
      </div>
    </form>

    <!-- Info when not editing -->
    <div v-else class="text-center py-8">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Bảo mật tài khoản</h3>
      <p class="mt-1 text-sm text-gray-500">
        Thay đổi mật khẩu định kỳ để bảo vệ tài khoản của bạn.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { authAPI } from '@/api/auth'

// Reactive data
const isEditing = ref(false)
const loading = ref(false)
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Form data
const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Computed properties for password validation
const hasMinLength = computed(() => form.newPassword.length >= 8)
const hasUppercase = computed(() => /[A-Z]/.test(form.newPassword))
const hasLowercase = computed(() => /[a-z]/.test(form.newPassword))
const hasNumber = computed(() => /\d/.test(form.newPassword))
const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(form.newPassword))

const passwordStrength = computed(() => {
  let strength = 0
  if (hasMinLength.value) strength += 20
  if (hasUppercase.value) strength += 20
  if (hasLowercase.value) strength += 20
  if (hasNumber.value) strength += 20
  if (hasSpecialChar.value) strength += 20
  return strength
})

const passwordStrengthText = computed(() => {
  if (passwordStrength.value < 40) return 'Yếu'
  if (passwordStrength.value < 80) return 'Trung bình'
  return 'Mạnh'
})

const passwordStrengthClass = computed(() => {
  if (passwordStrength.value < 40) return 'bg-red-500'
  if (passwordStrength.value < 80) return 'bg-yellow-500'
  return 'bg-green-500'
})

const passwordsMatch = computed(() => {
  return form.newPassword && form.confirmPassword && form.newPassword === form.confirmPassword
})

const isFormValid = computed(() => {
  return (
    form.currentPassword &&
    form.newPassword &&
    form.confirmPassword &&
    passwordsMatch.value &&
    passwordStrength.value >= 80
  )
})

// Methods
const startEdit = () => {
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  form.currentPassword = ''
  form.newPassword = ''
  form.confirmPassword = ''
  showCurrentPassword.value = false
  showNewPassword.value = false
  showConfirmPassword.value = false
}

const handleSubmit = async () => {
  if (!isFormValid.value) return

  loading.value = true
  try {
    await authAPI.changePassword({
      current_password: form.currentPassword,
      new_password: form.newPassword
    })
    
    // Reset form
    cancelEdit()
    
    // Show success message
    console.log('Password changed successfully')
  } catch (error) {
    console.error('Failed to change password:', error)
  } finally {
    loading.value = false
  }
}
</script>
