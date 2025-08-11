<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
      <button
        v-if="!isEditing"
        @click="startEdit"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Chỉnh sửa
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Avatar Section -->
      <div class="flex items-center space-x-6">
        <div class="relative">
          <img
            :src="form.avatar || '/default-avatar.png'"
            alt="Avatar"
            class="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
          />
          <button
            v-if="isEditing"
            type="button"
            @click="$refs.avatarInput.click()"
            class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <div>
          <h3 class="text-lg font-medium text-gray-900">{{ form.fullName || 'Chưa có tên' }}</h3>
          <p class="text-gray-500">{{ form.email }}</p>
          <p class="text-sm text-gray-400">Thành viên từ {{ formatDate(form.createdAt) }}</p>
        </div>
      </div>

      <input
        ref="avatarInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleAvatarChange"
      />

      <!-- Form Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Full Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Họ và tên
          </label>
          <input
            v-model="form.fullName"
            type="text"
            :disabled="!isEditing"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Nhập họ và tên"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            disabled
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
            placeholder="email@example.com"
          />
          <p class="text-xs text-gray-500 mt-1">Email không thể thay đổi</p>
        </div>

        <!-- Username -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tên đăng nhập
          </label>
          <input
            v-model="form.username"
            type="text"
            :disabled="!isEditing"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Nhập tên đăng nhập"
          />
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại
          </label>
          <input
            v-model="form.phone"
            type="tel"
            :disabled="!isEditing"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Nhập số điện thoại"
          />
        </div>

        <!-- Bio -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Giới thiệu
          </label>
          <textarea
            v-model="form.bio"
            :disabled="!isEditing"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Viết một vài dòng giới thiệu về bản thân..."
          ></textarea>
        </div>

        <!-- Location -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Địa chỉ
          </label>
          <input
            v-model="form.location"
            type="text"
            :disabled="!isEditing"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Nhập địa chỉ"
          />
        </div>

        <!-- Website -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            v-model="form.website"
            type="url"
            :disabled="!isEditing"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="https://example.com"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div v-if="isEditing" class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          @click="cancelEdit"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Hủy
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Đang lưu...' : 'Lưu thay đổi' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { userAPI } from '@/api/user'

const authStore = useAuthStore()

// Reactive data
const isEditing = ref(false)
const loading = ref(false)
const avatarFile = ref(null)

// Form data
const form = reactive({
  fullName: '',
  email: '',
  username: '',
  phone: '',
  bio: '',
  location: '',
  website: '',
  avatar: '',
  createdAt: null
})

// Computed
const hasChanges = computed(() => {
  const user = authStore.user
  return (
    form.fullName !== user?.fullName ||
    form.username !== user?.username ||
    form.phone !== user?.phone ||
    form.bio !== user?.bio ||
    form.location !== user?.location ||
    form.website !== user?.website ||
    avatarFile.value
  )
})

// Methods
const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const loadUserData = () => {
  const user = authStore.user
  if (user) {
    form.fullName = user.fullName || ''
    form.email = user.email || ''
    form.username = user.username || ''
    form.phone = user.phone || ''
    form.bio = user.bio || ''
    form.location = user.location || ''
    form.website = user.website || ''
    form.avatar = user.avatar || ''
    form.createdAt = user.createdAt || null
  }
}

const startEdit = () => {
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  avatarFile.value = null
  loadUserData() // Reset form to original values
}

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    avatarFile.value = file
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      form.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = async () => {
  if (!hasChanges.value) {
    isEditing.value = false
    return
  }

  loading.value = true
  try {
    const updateData = {
      fullName: form.fullName,
      username: form.username,
      phone: form.phone,
      bio: form.bio,
      location: form.location,
      website: form.website
    }

    // Handle avatar upload if changed
    if (avatarFile.value) {
      const formData = new FormData()
      formData.append('avatar', avatarFile.value)
      const avatarResponse = await userAPI.uploadAvatar(formData)
      updateData.avatar = avatarResponse.data.avatar
    }

    // Update profile
    const response = await userAPI.updateProfile(updateData)
    
    // Update store
    authStore.updateUser(response.data)
    
    isEditing.value = false
    avatarFile.value = null
    
    // Show success message
    console.log('Profile updated successfully')
  } catch (error) {
    console.error('Failed to update profile:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadUserData()
})
</script>
