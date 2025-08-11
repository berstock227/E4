<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p class="mt-1 text-sm text-gray-500">
              Welcome back! Here's what's happening with your project today.
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="refreshData"
              :disabled="loading"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <ArrowPathIcon 
                :class="[
                  'w-4 h-4 mr-2',
                  loading ? 'animate-spin' : ''
                ]"
              />
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Alerts Section -->
      <div v-if="alerts.length > 0" class="mb-8">
        <AlertCard 
          :alerts="alerts"
          @dismiss="dismissAlert"
          @action="handleAlertAction"
        />
      </div>

      <!-- Quick Actions -->
      <div class="mb-8">
        <QuickActions :user-role="userRole" />
      </div>

      <!-- Stats Cards -->
      <div class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            v-for="(stat, key) in formattedStats"
            :key="key"
            :title="getStatTitle(key)"
            :value="stat.value"
            :change="stat.change"
            :icon="stat.icon"
            :icon-bg-class="stat.iconBgClass"
            :icon-color-class="stat.iconColorClass"
          />
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Views Chart -->
        <ChartCard
          title="Blog Views"
          type="line"
          :data="viewsChartData"
          :selected-period="selectedPeriod"
          @period-change="handlePeriodChange"
        />
        
        <!-- Category Distribution -->
        <ChartCard
          title="Category Distribution"
          type="doughnut"
          :data="categoryChartData"
          :options="doughnutOptions"
        />
      </div>

      <!-- Tables Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Blogs -->
        <DataTable
          title="Recent Blogs"
          :columns="blogColumns"
          :data="recentBlogs"
          :show-view-all="true"
          @view-all="viewAllBlogs"
        >
          <template #cell-title="{ item }">
            <div class="flex items-center">
              <div class="flex-shrink-0 w-8 h-8">
                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <DocumentTextIcon class="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{{ item.title }}</p>
                <p class="text-sm text-gray-500">by {{ item.author }}</p>
              </div>
            </div>
          </template>
        </DataTable>

        <!-- Recent Users -->
        <DataTable
          v-if="userRole === 'admin'"
          title="Recent Users"
          :columns="userColumns"
          :data="recentUsers"
          :show-view-all="true"
          @view-all="viewAllUsers"
        >
          <template #cell-name="{ item }">
            <div class="flex items-center">
              <div class="flex-shrink-0 w-8 h-8">
                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <UsersIcon class="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
                <p class="text-sm text-gray-500">{{ item.email }}</p>
              </div>
            </div>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '@/store/dashboard'
import { useAuthStore } from '@/store/auth'
import { 
  ArrowPathIcon,
  DocumentTextIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'

// Components
import StatsCard from '@/components/dashboard/StatsCard.vue'
import ChartCard from '@/components/dashboard/ChartCard.vue'
import DataTable from '@/components/dashboard/DataTable.vue'
import AlertCard from '@/components/dashboard/AlertCard.vue'
import QuickActions from '@/components/dashboard/QuickActions.vue'

const router = useRouter()
const dashboardStore = useDashboardStore()
const authStore = useAuthStore()

// Reactive data
const selectedPeriod = ref('7D')
const loading = ref(false)

// Computed properties
const stats = computed(() => dashboardStore.stats)
const analytics = computed(() => dashboardStore.analytics)
const alerts = computed(() => dashboardStore.alerts)
const formattedStats = computed(() => dashboardStore.formattedStats)
const viewsChartData = computed(() => dashboardStore.viewsChartData)
const categoryChartData = computed(() => dashboardStore.categoryChartData)
const recentBlogs = computed(() => dashboardStore.recentBlogs)
const recentUsers = computed(() => dashboardStore.recentUsers)
const userRole = computed(() => authStore.user?.role || 'user')

// Table columns
const blogColumns = [
  { key: 'title', label: 'Blog', type: 'custom' },
  { key: 'status', label: 'Status', type: 'status' },
  { key: 'views', label: 'Views', type: 'number' },
  { key: 'created_at', label: 'Created', type: 'date' }
]

const userColumns = [
  { key: 'name', label: 'User', type: 'custom' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'created_at', label: 'Joined', type: 'date' }
]

// Chart options
const doughnutOptions = {
  plugins: {
    legend: {
      display: true,
      position: 'bottom'
    }
  }
}

// Methods
const getStatTitle = (key) => {
  const titles = {
    blogs: 'Total Blogs',
    users: 'Total Users',
    comments: 'Total Comments',
    views: 'Total Views'
  }
  return titles[key] || key
}

const handlePeriodChange = async (period) => {
  selectedPeriod.value = period
  await dashboardStore.fetchAnalytics(period)
}

const refreshData = async () => {
  loading.value = true
  try {
    await dashboardStore.initializeDashboard()
  } finally {
    loading.value = false
  }
}

const dismissAlert = async (alertId) => {
  await dashboardStore.dismissAlert(alertId)
}

const handleAlertAction = ({ action, alert }) => {
  console.log('Alert action:', action, alert)
  // Handle different alert actions
  if (action.label === 'Learn More') {
    // Navigate to learn more page
  } else if (action.label === 'Clean Up') {
    // Handle cleanup action
  }
}

const viewAllBlogs = () => {
  router.push('/blog')
}

const viewAllUsers = () => {
  router.push('/dashboard/users')
}

// Lifecycle
onMounted(async () => {
  await dashboardStore.initializeDashboard()
})
</script>
