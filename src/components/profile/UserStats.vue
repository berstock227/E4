<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Thống kê hoạt động</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Posts -->
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium">Tổng bài viết</p>
            <p class="text-3xl font-bold">{{ stats.totalPosts || 0 }}</p>
            <p class="text-blue-100 text-xs mt-1">
              {{ stats.postsThisMonth || 0 }} bài tháng này
            </p>
          </div>
          <div class="bg-blue-400 bg-opacity-30 rounded-full p-3">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Views -->
      <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium">Tổng lượt xem</p>
            <p class="text-3xl font-bold">{{ formatNumber(stats.totalViews) }}</p>
            <p class="text-green-100 text-xs mt-1">
              {{ formatNumber(stats.viewsThisMonth) }} lượt tháng này
            </p>
          </div>
          <div class="bg-green-400 bg-opacity-30 rounded-full p-3">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Comments -->
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm font-medium">Tổng bình luận</p>
            <p class="text-3xl font-bold">{{ stats.totalComments || 0 }}</p>
            <p class="text-purple-100 text-xs mt-1">
              {{ stats.commentsThisMonth || 0 }} bình luận tháng này
            </p>
          </div>
          <div class="bg-purple-400 bg-opacity-30 rounded-full p-3">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Member Since -->
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm font-medium">Thành viên từ</p>
            <p class="text-xl font-bold">{{ formatDate(stats.memberSince) }}</p>
            <p class="text-orange-100 text-xs mt-1">
              {{ getDaysSince(stats.memberSince) }} ngày
            </p>
          </div>
          <div class="bg-orange-400 bg-opacity-30 rounded-full p-3">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="mt-8">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
      <div class="space-y-4">
        <div v-if="loading" class="text-center py-8">
          <svg class="animate-spin h-8 w-8 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-500 mt-2">Đang tải...</p>
        </div>
        
        <div v-else-if="recentActivity.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Chưa có hoạt động</h3>
          <p class="mt-1 text-sm text-gray-500">
            Bắt đầu tạo bài viết để thấy hoạt động của bạn ở đây.
          </p>
        </div>
        
        <div v-else class="space-y-3">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex-shrink-0">
              <div class="w-8 h-8 rounded-full flex items-center justify-center"
                   :class="getActivityIconClass(activity.type)">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="activity.type === 'post'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  <path v-else-if="activity.type === 'comment'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ activity.title }}
              </p>
              <p class="text-xs text-gray-500">
                {{ getActivityDescription(activity.type) }} • {{ formatRelativeTime(activity.createdAt) }}
              </p>
            </div>
            <div class="flex-shrink-0">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getActivityBadgeClass(activity.type)">
                {{ getActivityTypeText(activity.type) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { userAPI } from '@/api/user'

// Reactive data
const loading = ref(false)
const stats = ref({})
const recentActivity = ref([])

// Methods
const formatNumber = (num) => {
  if (!num) return '0'
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getDaysSince = (date) => {
  if (!date) return 0
  const now = new Date()
  const memberDate = new Date(date)
  const diffTime = Math.abs(now - memberDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const formatRelativeTime = (date) => {
  if (!date) return ''
  const now = new Date()
  const activityDate = new Date(date)
  const diffTime = Math.abs(now - activityDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Hôm nay'
  if (diffDays === 1) return 'Hôm qua'
  if (diffDays < 7) return `${diffDays} ngày trước`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`
  return `${Math.floor(diffDays / 30)} tháng trước`
}

const getActivityIconClass = (type) => {
  switch (type) {
    case 'post':
      return 'bg-blue-500'
    case 'comment':
      return 'bg-purple-500'
    case 'view':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

const getActivityBadgeClass = (type) => {
  switch (type) {
    case 'post':
      return 'bg-blue-100 text-blue-800'
    case 'comment':
      return 'bg-purple-100 text-purple-800'
    case 'view':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getActivityTypeText = (type) => {
  switch (type) {
    case 'post':
      return 'Bài viết'
    case 'comment':
      return 'Bình luận'
    case 'view':
      return 'Lượt xem'
    default:
      return 'Hoạt động'
  }
}

const getActivityDescription = (type) => {
  switch (type) {
    case 'post':
      return 'Đã tạo bài viết mới'
    case 'comment':
      return 'Đã bình luận'
    case 'view':
      return 'Đã xem bài viết'
    default:
      return 'Hoạt động'
  }
}

const loadUserStats = async () => {
  loading.value = true
  try {
    const response = await userAPI.getStats()
    stats.value = response.data
  } catch (error) {
    console.error('Failed to load user stats:', error)
  } finally {
    loading.value = false
  }
}

const loadRecentActivity = async () => {
  try {
    const response = await userAPI.getRecentActivity()
    recentActivity.value = response.data
  } catch (error) {
    console.error('Failed to load recent activity:', error)
  }
}

// Lifecycle
onMounted(() => {
  loadUserStats()
  loadRecentActivity()
})
</script>
