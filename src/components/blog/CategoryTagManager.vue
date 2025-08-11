<template>
  <div class="category-tag-manager">
    <!-- Tabs -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'categories'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'categories'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Categories
          </button>
          <button
            @click="activeTab = 'tags'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'tags'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Tags
          </button>
        </nav>
      </div>
    </div>

    <!-- Categories Tab -->
    <div v-if="activeTab === 'categories'" class="space-y-6">
      <!-- Add Category Form -->
      <div class="bg-white rounded-lg border p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Add New Category</h3>
        <form @submit.prevent="addCategory" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <input
                v-model="newCategory.name"
                type="text"
                required
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <input
                v-model="newCategory.slug"
                type="text"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="auto-generated"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              v-model="newCategory.description"
              rows="3"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category description"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {{ isLoading ? 'Adding...' : 'Add Category' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Categories List -->
      <div class="bg-white rounded-lg border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Categories</h3>
        </div>
        <div class="divide-y divide-gray-200">
          <div
            v-for="category in categories"
            :key="category.id"
            class="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <h4 class="text-sm font-medium text-gray-900">{{ category.name }}</h4>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ category.posts_count || 0 }} posts
                </span>
              </div>
              <p v-if="category.description" class="text-sm text-gray-500 mt-1">
                {{ category.description }}
              </p>
              <p class="text-xs text-gray-400 mt-1">
                Slug: {{ category.slug }}
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="editCategory(category)"
                class="p-1 text-gray-400 hover:text-gray-600"
                title="Edit"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="deleteCategory(category.id)"
                class="p-1 text-gray-400 hover:text-red-600"
                title="Delete"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tags Tab -->
    <div v-if="activeTab === 'tags'" class="space-y-6">
      <!-- Add Tag Form -->
      <div class="bg-white rounded-lg border p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Add New Tag</h3>
        <form @submit.prevent="addTag" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Tag Name
              </label>
              <input
                v-model="newTag.name"
                type="text"
                required
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tag name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <input
                v-model="newTag.slug"
                type="text"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="auto-generated"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              v-model="newTag.description"
              rows="3"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tag description"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {{ isLoading ? 'Adding...' : 'Add Tag' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Tags List -->
      <div class="bg-white rounded-lg border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Tags</h3>
        </div>
        <div class="divide-y divide-gray-200">
          <div
            v-for="tag in tags"
            :key="tag.id"
            class="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {{ tag.name }}
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ tag.posts_count || 0 }} posts
                </span>
              </div>
              <p v-if="tag.description" class="text-sm text-gray-500 mt-1">
                {{ tag.description }}
              </p>
              <p class="text-xs text-gray-400 mt-1">
                Slug: {{ tag.slug }}
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="editTag(tag)"
                class="p-1 text-gray-400 hover:text-gray-600"
                title="Edit"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="deleteTag(tag.id)"
                class="p-1 text-gray-400 hover:text-red-600"
                title="Delete"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Edit {{ editingItem?.name || 'Item' }}
        </h3>
        <form @submit.prevent="updateItem" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              v-model="editingItem.name"
              type="text"
              required
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              v-model="editingItem.slug"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              v-model="editingItem.description"
              rows="3"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {{ isLoading ? 'Updating...' : 'Update' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useBlogStore } from '@/store/blog'

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ categories: [], tags: [] })
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'change'])

// Store
const blogStore = useBlogStore()

// Refs
const activeTab = ref('categories')
const isLoading = ref(false)
const showEditModal = ref(false)
const editingItem = ref(null)
const editingType = ref('')

// Form data
const newCategory = ref({
  name: '',
  slug: '',
  description: ''
})

const newTag = ref({
  name: '',
  slug: '',
  description: ''
})

// Computed
const categories = ref(props.modelValue.categories || [])
const tags = ref(props.modelValue.tags || [])

// Methods
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-')
}

const addCategory = async () => {
  if (!newCategory.value.name.trim()) return

  isLoading.value = true
  try {
    const categoryData = {
      name: newCategory.value.name.trim(),
      slug: newCategory.value.slug.trim() || generateSlug(newCategory.value.name),
      description: newCategory.value.description.trim()
    }

    // Here you would typically call your API
    const newCat = {
      id: Date.now(),
      ...categoryData,
      posts_count: 0,
      created_at: new Date().toISOString()
    }

    categories.value.push(newCat)
    
    // Reset form
    newCategory.value = { name: '', slug: '', description: '' }
    
    // Emit change
    emit('update:modelValue', { categories: categories.value, tags: tags.value })
    emit('change', { type: 'category', action: 'add', data: newCat })

  } catch (error) {
    console.error('Failed to add category:', error)
  } finally {
    isLoading.value = false
  }
}

const addTag = async () => {
  if (!newTag.value.name.trim()) return

  isLoading.value = true
  try {
    const tagData = {
      name: newTag.value.name.trim(),
      slug: newTag.value.slug.trim() || generateSlug(newTag.value.name),
      description: newTag.value.description.trim()
    }

    // Here you would typically call your API
    const newTagItem = {
      id: Date.now(),
      ...tagData,
      posts_count: 0,
      created_at: new Date().toISOString()
    }

    tags.value.push(newTagItem)
    
    // Reset form
    newTag.value = { name: '', slug: '', description: '' }
    
    // Emit change
    emit('update:modelValue', { categories: categories.value, tags: tags.value })
    emit('change', { type: 'tag', action: 'add', data: newTagItem })

  } catch (error) {
    console.error('Failed to add tag:', error)
  } finally {
    isLoading.value = false
  }
}

const editCategory = (category) => {
  editingItem.value = { ...category }
  editingType.value = 'category'
  showEditModal.value = true
}

const editTag = (tag) => {
  editingItem.value = { ...tag }
  editingType.value = 'tag'
  showEditModal.value = true
}

const updateItem = async () => {
  if (!editingItem.value?.name.trim()) return

  isLoading.value = true
  try {
    const updatedItem = {
      ...editingItem.value,
      slug: editingItem.value.slug.trim() || generateSlug(editingItem.value.name),
      updated_at: new Date().toISOString()
    }

    if (editingType.value === 'category') {
      const index = categories.value.findIndex(c => c.id === updatedItem.id)
      if (index !== -1) {
        categories.value[index] = updatedItem
      }
    } else if (editingType.value === 'tag') {
      const index = tags.value.findIndex(t => t.id === updatedItem.id)
      if (index !== -1) {
        tags.value[index] = updatedItem
      }
    }

    showEditModal.value = false
    editingItem.value = null
    editingType.value = ''

    // Emit change
    emit('update:modelValue', { categories: categories.value, tags: tags.value })
    emit('change', { type: editingType.value, action: 'update', data: updatedItem })

  } catch (error) {
    console.error('Failed to update item:', error)
  } finally {
    isLoading.value = false
  }
}

const deleteCategory = async (id) => {
  if (!confirm('Are you sure you want to delete this category?')) return

  try {
    // Here you would typically call your API
    const index = categories.value.findIndex(c => c.id === id)
    if (index !== -1) {
      const deletedCategory = categories.value.splice(index, 1)[0]
      
      // Emit change
      emit('update:modelValue', { categories: categories.value, tags: tags.value })
      emit('change', { type: 'category', action: 'delete', data: deletedCategory })
    }
  } catch (error) {
    console.error('Failed to delete category:', error)
  }
}

const deleteTag = async (id) => {
  if (!confirm('Are you sure you want to delete this tag?')) return

  try {
    // Here you would typically call your API
    const index = tags.value.findIndex(t => t.id === id)
    if (index !== -1) {
      const deletedTag = tags.value.splice(index, 1)[0]
      
      // Emit change
      emit('update:modelValue', { categories: categories.value, tags: tags.value })
      emit('change', { type: 'tag', action: 'delete', data: deletedTag })
    }
  } catch (error) {
    console.error('Failed to delete tag:', error)
  }
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  categories.value = newValue.categories || []
  tags.value = newValue.tags || []
})

// Lifecycle
onMounted(async () => {
  // Load initial data
  try {
    await Promise.all([
      blogStore.fetchCategories(),
      blogStore.fetchTags()
    ])
    
    categories.value = blogStore.categories
    tags.value = blogStore.tags
  } catch (error) {
    console.error('Failed to load categories and tags:', error)
  }
})
</script>

<style scoped>
.category-tag-manager {
  @apply w-full;
}
</style>
