<template>
  <div class="image-upload">
    <!-- Upload Area -->
    <div
      v-if="!imageUrl"
      @click="triggerFileInput"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      :class="[
        'upload-area border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
        isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400',
        isUploading ? 'opacity-50 cursor-not-allowed' : ''
      ]"
    >
      <div class="space-y-4">
        <div class="flex justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <p class="text-lg font-medium text-gray-900">Upload Image</p>
          <p class="text-sm text-gray-500 mt-1">
            Drag and drop an image here, or click to browse
          </p>
        </div>
        <div class="text-xs text-gray-400">
          <p>Supported formats: JPG, PNG, GIF, WebP</p>
          <p>Max size: {{ formatFileSize(maxFileSize) }}</p>
        </div>
      </div>
    </div>

    <!-- Image Preview -->
    <div v-else class="image-preview">
      <div class="relative group">
        <img
          :src="imageUrl"
          :alt="alt"
          class="w-full h-48 object-cover rounded-lg"
        />
        
        <!-- Overlay Actions -->
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
          <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
            <button
              @click="triggerFileInput"
              class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title="Replace Image"
            >
              <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            <button
              @click="removeImage"
              class="p-2 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-colors"
              title="Remove Image"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Upload Progress -->
        <div v-if="isUploading" class="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
          <div class="text-center text-white">
            <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p class="text-sm">Uploading...</p>
          </div>
        </div>
      </div>

      <!-- Image Info -->
      <div class="mt-3 space-y-2">
        <div class="flex items-center justify-between text-sm text-gray-600">
          <span>File size: {{ formatFileSize(fileSize) }}</span>
          <span>{{ imageDimensions }}</span>
        </div>
        <div v-if="compressionInfo" class="text-xs text-green-600">
          {{ compressionInfo }}
        </div>
      </div>
    </div>

    <!-- Hidden File Input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="handleFileSelect"
      class="hidden"
    />

    <!-- Error Message -->
    <div v-if="error" class="mt-2 text-sm text-red-600">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'Uploaded image'
  },
  maxFileSize: {
    type: Number,
    default: 5 * 1024 * 1024 // 5MB
  },
  maxWidth: {
    type: Number,
    default: 1920
  },
  maxHeight: {
    type: Number,
    default: 1080
  },
  quality: {
    type: Number,
    default: 0.8
  },
  allowedTypes: {
    type: Array,
    default: () => ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'upload', 'error'])

// Refs
const fileInput = ref(null)
const imageUrl = ref(props.modelValue)
const isDragOver = ref(false)
const isUploading = ref(false)
const error = ref('')
const fileSize = ref(0)
const imageDimensions = ref('')
const compressionInfo = ref('')

// Computed
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Methods
const triggerFileInput = () => {
  if (!isUploading.value) {
    fileInput.value?.click()
  }
}

const handleDragOver = (event) => {
  isDragOver.value = true
}

const handleDragLeave = (event) => {
  isDragOver.value = false
}

const handleDrop = (event) => {
  isDragOver.value = false
  const files = event.dataTransfer.files
  if (files.length > 0) {
    handleFile(files[0])
  }
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    handleFile(file)
  }
}

const validateFile = (file) => {
  error.value = ''

  // Check file type
  if (!props.allowedTypes.includes(file.type)) {
    error.value = `File type not supported. Allowed types: ${props.allowedTypes.join(', ')}`
    return false
  }

  // Check file size
  if (file.size > props.maxFileSize) {
    error.value = `File too large. Maximum size: ${formatFileSize(props.maxFileSize)}`
    return false
  }

  return true
}

const compressImage = (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      
      if (width > props.maxWidth) {
        height = (height * props.maxWidth) / width
        width = props.maxWidth
      }
      
      if (height > props.maxHeight) {
        width = (width * props.maxHeight) / height
        height = props.maxHeight
      }

      // Set canvas dimensions
      canvas.width = width
      canvas.height = height

      // Draw and compress image
      ctx.drawImage(img, 0, 0, width, height)

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          })
          
          // Update compression info
          const originalSize = file.size
          const compressedSize = blob.size
          const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
          
          if (compressedSize < originalSize) {
            compressionInfo.value = `Compressed by ${compressionRatio}% (${formatFileSize(originalSize)} → ${formatFileSize(compressedSize)})`
          } else {
            compressionInfo.value = 'No compression needed'
          }
          
          resolve(compressedFile)
        },
        file.type,
        props.quality
      )
    }

    img.src = URL.createObjectURL(file)
  })
}

const handleFile = async (file) => {
  if (!validateFile(file)) {
    emit('error', error.value)
    return
  }

  isUploading.value = true
  error.value = ''

  try {
    // Compress image if needed
    const processedFile = await compressImage(file)
    
    // Get image dimensions
    const dimensions = await getImageDimensions(processedFile)
    imageDimensions.value = `${dimensions.width} × ${dimensions.height}`
    fileSize.value = processedFile.size

    // Create preview URL
    const url = URL.createObjectURL(processedFile)
    imageUrl.value = url
    
    // Emit events
    emit('update:modelValue', url)
    emit('upload', {
      file: processedFile,
      url: url,
      dimensions: dimensions,
      size: processedFile.size
    })

  } catch (err) {
    error.value = 'Failed to process image: ' + err.message
    emit('error', error.value)
  } finally {
    isUploading.value = false
  }
}

const getImageDimensions = (file) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }
    img.src = URL.createObjectURL(file)
  })
}

const removeImage = () => {
  // Revoke object URL to free memory
  if (imageUrl.value && imageUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(imageUrl.value)
  }
  
  imageUrl.value = ''
  fileSize.value = 0
  imageDimensions.value = ''
  compressionInfo.value = ''
  error.value = ''
  
  emit('update:modelValue', '')
  
  // Reset file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  imageUrl.value = newValue
})

// Cleanup on unmount
onUnmounted(() => {
  if (imageUrl.value && imageUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(imageUrl.value)
  }
})
</script>

<style scoped>
.image-upload {
  @apply w-full;
}

.upload-area {
  @apply transition-all duration-200;
}

.upload-area:hover {
  @apply transform scale-[1.02];
}

.image-preview {
  @apply w-full;
}

.image-preview img {
  @apply transition-transform duration-200;
}

.image-preview:hover img {
  @apply transform scale-[1.02];
}
</style>
