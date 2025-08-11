<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
        <p class="mt-2 text-gray-600">
          Quản lý thông tin cá nhân, bảo mật và hoạt động của bạn
        </p>
      </div>

      <!-- Profile Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Profile Form -->
          <ProfileForm />
          
          <!-- Change Password Form -->
          <ChangePasswordForm />
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- User Stats -->
          <UserStats />
          
          <!-- Quick Actions -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
            <div class="space-y-3">
              <button
                @click="exportData"
                :disabled="exporting"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="exporting" class="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {{ exporting ? 'Đang xuất...' : 'Xuất dữ liệu' }}
              </button>
              
              <button
                @click="showDeleteModal = true"
                class="w-full flex items-center justify-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Xóa tài khoản
              </button>
            </div>
          </div>

          <!-- Account Info -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Thông tin tài khoản</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Trạng thái:</span>
                <span class="text-sm font-medium text-green-600">Hoạt động</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Vai trò:</span>
                <span class="text-sm font-medium text-gray-900">{{ userRole }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Email đã xác thực:</span>
                <span class="text-sm font-medium text-green-600">✓</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Đăng nhập cuối:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDate(lastLogin) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-4">Xóa tài khoản</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác và tất cả dữ liệu của bạn sẽ bị mất vĩnh viễn.
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="deleteAccount"
              :disabled="deleting"
              class="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ deleting ? 'Đang xóa...' : 'Xóa tài khoản' }}
            </button>
            <button
              @click="showDeleteModal = false"
              class="mt-2 px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { userAPI } from '@/api/user'
import ProfileForm from '@/components/profile/ProfileForm.vue'
import ChangePasswordForm from '@/components/profile/ChangePasswordForm.vue'
import UserStats from '@/components/profile/UserStats.vue'

const router = useRouter()
const authStore = useAuthStore()

// Reactive data
const showDeleteModal = ref(false)
const exporting = ref(false)
const deleting = ref(false)

// Computed
const userRole = computed(() => {
  const role = authStore.user?.role || 'user'
  return role === 'admin' ? 'Quản trị viên' : 'Người dùng'
})

const lastLogin = computed(() => {
  return authStore.user?.lastLoginAt || new Date().toISOString()
})

// Methods
const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const exportData = async () => {
  exporting.value = true
  try {
    const response = await userAPI.exportData()
    
    // Create download link
    const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'user-data.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    console.log('Data exported successfully')
  } catch (error) {
    console.error('Failed to export data:', error)
  } finally {
    exporting.value = false
  }
}

const deleteAccount = async () => {
  deleting.value = true
  try {
    await userAPI.deleteAccount()
    
    // Logout user
    await authStore.logout()
    
    // Redirect to home
    router.push('/')
    
    console.log('Account deleted successfully')
  } catch (error) {
    console.error('Failed to delete account:', error)
  } finally {
    deleting.value = false
    showDeleteModal.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Ensure user is authenticated
  if (!authStore.isAuthenticated) {
    router.push('/auth/login')
  }
})
</script>
