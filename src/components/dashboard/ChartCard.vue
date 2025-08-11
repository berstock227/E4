<template>
  <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      <div class="flex space-x-2">
        <button 
          v-for="period in periods" 
          :key="period"
          @click="$emit('periodChange', period)"
          :class="[
            'px-3 py-1 text-sm rounded-md transition-colors',
            selectedPeriod === period 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ period }}
        </button>
      </div>
    </div>
    <div class="h-64">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'line'
  },
  data: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  },
  periods: {
    type: Array,
    default: () => ['7D', '30D', '90D']
  },
  selectedPeriod: {
    type: String,
    default: '7D'
  }
})

const emit = defineEmits(['periodChange'])

const chartCanvas = ref(null)
let chart = null

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}

onMounted(() => {
  nextTick(() => {
    createChart()
  })
})

watch(() => props.data, () => {
  if (chart) {
    chart.data = props.data
    chart.update()
  }
}, { deep: true })

const createChart = () => {
  if (chart) {
    chart.destroy()
  }

  const ctx = chartCanvas.value.getContext('2d')
  chart = new Chart(ctx, {
    type: props.type,
    data: props.data,
    options: { ...defaultOptions, ...props.options }
  })
}
</script>
