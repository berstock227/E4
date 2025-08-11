<template>
  <div class="bg-white rounded-lg shadow-md border border-gray-200">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <button 
          v-if="showViewAll"
          @click="$emit('viewAll')"
          class="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View All
        </button>
      </div>
    </div>
    
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="(item, index) in data" 
            :key="index"
            class="hover:bg-gray-50 transition-colors"
          >
            <td 
              v-for="column in columns" 
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              <slot 
                :name="`cell-${column.key}`" 
                :item="item" 
                :value="item[column.key]"
              >
                <span v-if="column.type === 'date'">
                  {{ formatDate(item[column.key]) }}
                </span>
                <span v-else-if="column.type === 'status'">
                  <span 
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      getStatusClass(item[column.key])
                    ]"
                  >
                    {{ item[column.key] }}
                  </span>
                </span>
                <span v-else>
                  {{ item[column.key] }}
                </span>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-if="data.length === 0" class="px-6 py-8 text-center">
      <p class="text-gray-500">No data available</p>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  },
  showViewAll: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['viewAll'])

const formatDate = (date) => {
  if (!date) return '-'
  try {
    return format(new Date(date), 'MMM dd, yyyy')
  } catch {
    return date
  }
}

const getStatusClass = (status) => {
  const statusClasses = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    archived: 'bg-gray-100 text-gray-800',
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}
</script>
