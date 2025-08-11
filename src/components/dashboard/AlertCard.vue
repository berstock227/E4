<template>
  <div 
    v-if="alerts.length > 0"
    class="space-y-3"
  >
    <div 
      v-for="alert in alerts" 
      :key="alert.id"
      :class="[
        'p-4 rounded-lg border-l-4',
        getAlertClasses(alert.type)
      ]"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <component 
            :is="getAlertIcon(alert.type)" 
            :class="[
              'w-5 h-5',
              getAlertIconClasses(alert.type)
            ]"
          />
        </div>
        <div class="ml-3 flex-1">
          <h4 class="text-sm font-medium">
            {{ alert.title }}
          </h4>
          <p class="text-sm mt-1">
            {{ alert.message }}
          </p>
          <div v-if="alert.actions" class="mt-3 flex space-x-2">
            <button 
              v-for="action in alert.actions"
              :key="action.label"
              @click="handleAction(action, alert)"
              :class="[
                'text-xs px-3 py-1 rounded-md font-medium transition-colors',
                action.primary 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ action.label }}
            </button>
          </div>
        </div>
        <div class="ml-3 flex-shrink-0">
          <button 
            @click="dismissAlert(alert.id)"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  XMarkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  alerts: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['dismiss', 'action'])

const getAlertClasses = (type) => {
  const classes = {
    success: 'bg-green-50 border-green-400',
    warning: 'bg-yellow-50 border-yellow-400',
    error: 'bg-red-50 border-red-400',
    info: 'bg-blue-50 border-blue-400'
  }
  return classes[type] || classes.info
}

const getAlertIcon = (type) => {
  const icons = {
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: ExclamationCircleIcon,
    info: InformationCircleIcon
  }
  return icons[type] || InformationCircleIcon
}

const getAlertIconClasses = (type) => {
  const classes = {
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    info: 'text-blue-400'
  }
  return classes[type] || classes.info
}

const dismissAlert = (alertId) => {
  emit('dismiss', alertId)
}

const handleAction = (action, alert) => {
  emit('action', { action, alert })
}
</script>
