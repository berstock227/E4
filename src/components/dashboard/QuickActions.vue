<template>
  <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <button 
        v-for="action in availableActions" 
        :key="action.id"
        @click="handleAction(action)"
        class="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
      >
        <div 
          :class="[
            'p-3 rounded-full mb-3',
            action.iconBgClass
          ]"
        >
          <component 
            :is="action.icon" 
            :class="[
              'w-6 h-6',
              action.iconColorClass
            ]"
          />
        </div>
        <span class="text-sm font-medium text-gray-900 text-center">
          {{ action.label }}
        </span>
        <span class="text-xs text-gray-500 text-center mt-1">
          {{ action.description }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  PlusIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  userRole: {
    type: String,
    default: 'user'
  }
})

const router = useRouter()

const allActions = [
  {
    id: 'create-blog',
    label: 'Create Blog',
    description: 'Write a new blog post',
    icon: PlusIcon,
    iconBgClass: 'bg-green-100',
    iconColorClass: 'text-green-600',
    route: '/blog/create',
    roles: ['admin', 'author', 'user']
  },
  {
    id: 'manage-users',
    label: 'Manage Users',
    description: 'View and manage users',
    icon: UsersIcon,
    iconBgClass: 'bg-blue-100',
    iconColorClass: 'text-blue-600',
    route: '/dashboard/users',
    roles: ['admin']
  },
  {
    id: 'manage-blogs',
    label: 'Manage Blogs',
    description: 'Edit and organize blogs',
    icon: DocumentTextIcon,
    iconBgClass: 'bg-purple-100',
    iconColorClass: 'text-purple-600',
    route: '/blog',
    roles: ['admin', 'author']
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'View detailed reports',
    icon: ChartBarIcon,
    iconBgClass: 'bg-orange-100',
    iconColorClass: 'text-orange-600',
    route: '/dashboard/analytics',
    roles: ['admin']
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Configure system',
    icon: CogIcon,
    iconBgClass: 'bg-gray-100',
    iconColorClass: 'text-gray-600',
    route: '/dashboard/settings',
    roles: ['admin']
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Manage alerts',
    icon: BellIcon,
    iconBgClass: 'bg-red-100',
    iconColorClass: 'text-red-600',
    route: '/dashboard/notifications',
    roles: ['admin', 'author', 'user']
  }
]

const availableActions = computed(() => {
  return allActions.filter(action => 
    action.roles.includes(props.userRole)
  )
})

const handleAction = (action) => {
  if (action.route) {
    router.push(action.route)
  }
}
</script>
