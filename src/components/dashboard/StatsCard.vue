<template>
  <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-900 mt-2">{{ value }}</p>
        <div class="flex items-center mt-2">
          <span 
            :class="[
              'text-sm font-medium',
              change >= 0 ? 'text-green-600' : 'text-red-600'
            ]"
          >
            {{ change >= 0 ? '+' : '' }}{{ change }}%
          </span>
          <span class="text-sm text-gray-500 ml-2">vs last period</span>
        </div>
      </div>
      <div 
        :class="[
          'p-3 rounded-full',
          iconBgClass
        ]"
      >
        <component 
          :is="icon" 
          :class="[
            'w-6 h-6',
            iconColorClass
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  DocumentTextIcon, 
  UsersIcon, 
  ChatBubbleLeftRightIcon,
  EyeIcon 
} from '@heroicons/vue/24/outline'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  change: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    default: 'DocumentTextIcon'
  },
  iconBgClass: {
    type: String,
    default: 'bg-blue-100'
  },
  iconColorClass: {
    type: String,
    default: 'text-blue-600'
  }
})

const iconMap = {
  DocumentTextIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon
}

const icon = iconMap[props.icon] || DocumentTextIcon
</script>
