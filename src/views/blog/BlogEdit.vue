<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Edit Post</h1>
        <p class="mt-2 text-sm text-gray-600">
          Update your post content and settings
        </p>
      </div>
      <div class="mt-4 sm:mt-0 flex space-x-3">
        <button
          @click="saveDraft"
          :disabled="blogStore.isLoading || !isFormValid"
          class="btn-secondary"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Draft
        </button>
        <button
          @click="publishPost"
          :disabled="blogStore.isLoading || !isFormValid"
          class="btn-primary"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          {{ currentBlog?.status === 'published' ? 'Update' : 'Publish' }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="blogStore.isLoading && !currentBlog" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading post...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="blogStore.error" class="text-center py-12">
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              {{ blogStore.error }}
            </h3>
          </div>
        </div>
      </div>
      <button
        @click="loadBlog"
        class="mt-4 btn-primary"
      >
        Try Again
      </button>
    </div>

    <!-- Form -->
    <form v-else-if="currentBlog" @submit.prevent="publishPost" class="space-y-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Title -->
          <div class="form-group">
            <label for="title" class="form-label">Title</label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="input text-xl font-semibold"
              :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.title }"
              placeholder="Enter your post title..."
              :disabled="blogStore.isLoading"
            />
            <p v-if="errors.title" class="form-error">{{ errors.title }}</p>
          </div>

          <!-- Excerpt -->
          <div class="form-group">
            <label for="excerpt" class="form-label">Excerpt</label>
            <textarea
              id="excerpt"
              v-model="form.excerpt"
              rows="3"
              class="input"
              :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.excerpt }"
              placeholder="Brief description of your post..."
              :disabled="blogStore.isLoading"
            ></textarea>
            <p v-if="errors.excerpt" class="form-error">{{ errors.excerpt }}</p>
            <p class="text-xs text-gray-500 mt-1">
              {{ form.excerpt.length }}/200 characters
            </p>
          </div>

          <!-- Content -->
          <div class="form-group">
            <label for="content" class="form-label">Content</label>
            <div class="border border-gray-300 rounded-md">
              <!-- Toolbar -->
              <div class="border-b border-gray-300 p-2 bg-gray-50 flex flex-wrap gap-1">
                <button
                  type="button"
                  @click="formatText('bold')"
                  class="p-2 rounded hover:bg-gray-200"
                  :class="{ 'bg-gray-200': isFormatActive('bold') }"
                  title="Bold"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h8a4 4 0 100-8H6v8zm0 0h8a4 4 0 110 8H6v-8z" />
                  </svg>
                </button>
                <button
                  type="button"
                  @click="formatText('italic')"
                  class="p-2 rounded hover:bg-gray-200"
                  :class="{ 'bg-gray-200': isFormatActive('italic') }"
                  title="Italic"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </button>
                <button
                  type="button"
                  @click="formatText('underline')"
                  class="p-2 rounded hover:bg-gray-200"
                  :class="{ 'bg-gray-200': isFormatActive('underline') }"
                  title="Underline"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
                <div class="w-px h-6 bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  @click="insertElement('h2')"
                  class="p-2 rounded hover:bg-gray-200"
                  title="Heading 2"
                >
                  H2
                </button>
                <button
                  type="button"
                  @click="insertElement('h3')"
                  class="p-2 rounded hover:bg-gray-200"
                  title="Heading 3"
                >
                  H3
                </button>
                <button
                  type="button"
                  @click="insertElement('p')"
                  class="p-2 rounded hover:bg-gray-200"
                  title="Paragraph"
                >
                  P
                </button>
                <div class="w-px h-6 bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  @click="insertElement('ul')"
                  class="p-2 rounded hover:bg-gray-200"
                  title="Bullet List"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  type="button"
                  @click="insertElement('ol')"
                  class="p-2 rounded hover:bg-gray-200"
                  title="Numbered List"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </button>
                <button
                  type="button"
                  @click="insertLink"
                  class="p-2 rounded hover:bg-gray-200"
                  title="Insert Link"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
              </div>
              
              <!-- Editor -->
              <div
                ref="editor"
                contenteditable="true"
                class="p-4 min-h-96 focus:outline-none prose max-w-none"
                :class="{ 'border-red-300': errors.content }"
                @input="handleContentInput"
                @paste="handlePaste"
                v-html="form.content"
              ></div>
            </div>
            <p v-if="errors.content" class="form-error">{{ errors.content }}</p>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Status Info -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Post Status</h3>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Status:</span>
                <span
                  :class="{
                    'px-2 py-1 text-xs font-medium rounded-full': true,
                    'bg-yellow-100 text-yellow-800': currentBlog.status === 'draft',
                    'bg-green-100 text-green-800': currentBlog.status === 'published'
                  }"
                >
                  {{ currentBlog.status === 'draft' ? 'Draft' : 'Published' }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Created:</span>
                <span class="text-sm text-gray-900">{{ formatDate(currentBlog.created_at) }}</span>
              </div>
              <div v-if="currentBlog.updated_at" class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Last updated:</span>
                <span class="text-sm text-gray-900">{{ formatDate(currentBlog.updated_at) }}</span>
              </div>
              <div v-if="currentBlog.published_at" class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Published:</span>
                <span class="text-sm text-gray-900">{{ formatDate(currentBlog.published_at) }}</span>
              </div>
            </div>
          </div>

          <!-- Featured Image -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Featured Image</h3>
            
            <!-- Image Preview -->
            <div v-if="form.featured_image" class="mb-4">
              <img
                :src="form.featured_image"
                alt="Featured image"
                class="w-full h-48 object-cover rounded-lg"
              />
              <button
                @click="removeFeaturedImage"
                type="button"
                class="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                Remove image
              </button>
            </div>

            <!-- Upload Button -->
            <div v-else class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div class="mt-4">
                <label for="image-upload" class="cursor-pointer">
                  <span class="btn-primary">Upload Image</span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleImageUpload"
                  />
                </label>
              </div>
              <p class="mt-2 text-xs text-gray-500">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>

          <!-- Category -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Category</h3>
            <select
              v-model="form.category_id"
              class="input"
              :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.category_id }"
            >
              <option value="">Select a category</option>
              <option
                v-for="category in blogStore.categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
            <p v-if="errors.category_id" class="form-error">{{ errors.category_id }}</p>
          </div>

          <!-- Tags -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Tags</h3>
            <div class="space-y-3">
              <!-- Tag Input -->
              <div class="flex">
                <input
                  v-model="newTag"
                  type="text"
                  placeholder="Add a tag..."
                  class="input flex-1"
                  @keyup.enter="addTag"
                />
                <button
                  @click="addTag"
                  type="button"
                  class="ml-2 btn-primary"
                  :disabled="!newTag.trim()"
                >
                  Add
                </button>
              </div>

              <!-- Selected Tags -->
              <div v-if="form.tags.length" class="flex flex-wrap gap-2">
                <span
                  v-for="tag in form.tags"
                  :key="tag"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                >
                  {{ tag }}
                  <button
                    @click="removeTag(tag)"
                    type="button"
                    class="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              </div>

              <!-- Suggested Tags -->
              <div v-if="blogStore.tags.length" class="text-sm text-gray-600">
                <p class="mb-2">Popular tags:</p>
                <div class="flex flex-wrap gap-1">
                  <button
                    v-for="tag in blogStore.tags.slice(0, 10)"
                    :key="tag.id"
                    @click="addTag(tag.name)"
                    type="button"
                    class="text-primary-600 hover:text-primary-800 hover:underline"
                  >
                    #{{ tag.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- SEO -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">SEO</h3>
            
            <!-- Meta Title -->
            <div class="form-group">
              <label for="meta_title" class="form-label">Meta Title</label>
              <input
                id="meta_title"
                v-model="form.meta_title"
                type="text"
                class="input"
                placeholder="SEO title for search engines..."
              />
              <p class="text-xs text-gray-500 mt-1">
                {{ form.meta_title.length }}/60 characters
              </p>
            </div>

            <!-- Meta Description -->
            <div class="form-group">
              <label for="meta_description" class="form-label">Meta Description</label>
              <textarea
                id="meta_description"
                v-model="form.meta_description"
                rows="3"
                class="input"
                placeholder="Brief description for search engines..."
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">
                {{ form.meta_description.length }}/160 characters
              </p>
            </div>
          </div>

          <!-- Settings -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Settings</h3>
            
            <!-- Allow Comments -->
            <div class="flex items-center">
              <input
                id="allow_comments"
                v-model="form.allow_comments"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="allow_comments" class="ml-2 block text-sm text-gray-900">
                Allow comments
              </label>
            </div>

            <!-- Featured Post -->
            <div class="flex items-center mt-4">
              <input
                id="is_featured"
                v-model="form.is_featured"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="is_featured" class="ml-2 block text-sm text-gray-900">
                Featured post
              </label>
            </div>
          </div>

          <!-- Actions -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Actions</h3>
            
            <div class="space-y-3">
              <router-link
                :to="{ name: 'blog-detail', params: { id: currentBlog.slug || currentBlog.id } }"
                class="w-full btn-secondary text-center"
                target="_blank"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Post
              </router-link>
              
              <button
                @click="deletePost"
                type="button"
                class="w-full btn-danger"
                :disabled="blogStore.isLoading"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBlogStore } from '@/store/blog'
import { useAuthStore } from '@/store/auth'
import { format } from 'date-fns'

const router = useRouter()
const route = useRoute()
const blogStore = useBlogStore()
const authStore = useAuthStore()

// Form data
const form = ref({
  title: '',
  excerpt: '',
  content: '',
  category_id: '',
  tags: [],
  featured_image: '',
  meta_title: '',
  meta_description: '',
  allow_comments: true,
  is_featured: false,
  status: 'draft'
})

// UI state
const newTag = ref('')
const errors = ref({})
const editor = ref(null)

// Computed
const currentBlog = computed(() => blogStore.currentBlog)

const isFormValid = computed(() => {
  return form.value.title && form.value.content && !Object.keys(errors.value).length
})

// Methods
const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm')
}

const loadBlog = async () => {
  try {
    await blogStore.fetchBlog(route.params.id)
  } catch (error) {
    console.error('Failed to load blog:', error)
  }
}

const populateForm = () => {
  if (currentBlog.value) {
    form.value = {
      title: currentBlog.value.title || '',
      excerpt: currentBlog.value.excerpt || '',
      content: currentBlog.value.content || '',
      category_id: currentBlog.value.category?.id || '',
      tags: currentBlog.value.tags?.map(tag => tag.name) || [],
      featured_image: currentBlog.value.featured_image || '',
      meta_title: currentBlog.value.meta_title || '',
      meta_description: currentBlog.value.meta_description || '',
      allow_comments: currentBlog.value.allow_comments !== false,
      is_featured: currentBlog.value.is_featured || false,
      status: currentBlog.value.status || 'draft'
    }
  }
}

const validateForm = () => {
  errors.value = {}

  if (!form.value.title.trim()) {
    errors.value.title = 'Title is required'
  }

  if (!form.value.content.trim()) {
    errors.value.content = 'Content is required'
  }

  if (form.value.excerpt && form.value.excerpt.length > 200) {
    errors.value.excerpt = 'Excerpt must be less than 200 characters'
  }

  return Object.keys(errors.value).length === 0
}

const handleContentInput = () => {
  if (editor.value) {
    form.value.content = editor.value.innerHTML
  }
}

const handlePaste = (event) => {
  event.preventDefault()
  const text = event.clipboardData.getData('text/plain')
  document.execCommand('insertText', false, text)
}

const formatText = (command) => {
  document.execCommand(command, false, null)
  editor.value.focus()
}

const isFormatActive = (command) => {
  return document.queryCommandState(command)
}

const insertElement = (tag) => {
  const selection = window.getSelection()
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    const element = document.createElement(tag)
    
    if (tag === 'ul' || tag === 'ol') {
      const li = document.createElement('li')
      li.textContent = 'List item'
      element.appendChild(li)
    } else {
      element.textContent = tag === 'h2' ? 'Heading 2' : tag === 'h3' ? 'Heading 3' : 'Paragraph'
    }
    
    range.deleteContents()
    range.insertNode(element)
    editor.value.focus()
  }
}

const insertLink = () => {
  const url = prompt('Enter URL:')
  if (url) {
    document.execCommand('createLink', false, url)
    editor.value.focus()
  }
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file size
  if (file.size > 5 * 1024 * 1024) {
    alert('File size must be less than 5MB')
    return
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file')
    return
  }

  try {
    const response = await blogStore.uploadImage(file, 'featured')
    form.value.featured_image = response.data.url
  } catch (error) {
    console.error('Image upload failed:', error)
    alert('Failed to upload image. Please try again.')
  }
}

const removeFeaturedImage = () => {
  form.value.featured_image = ''
}

const addTag = (tagName = null) => {
  const tag = tagName || newTag.value.trim()
  if (tag && !form.value.tags.includes(tag)) {
    form.value.tags.push(tag)
    newTag.value = ''
  }
}

const removeTag = (tag) => {
  const index = form.value.tags.indexOf(tag)
  if (index > -1) {
    form.value.tags.splice(index, 1)
  }
}

const saveDraft = async () => {
  if (!validateForm()) return

  try {
    form.value.status = 'draft'
    await blogStore.updateBlog(currentBlog.value.id, form.value)
  } catch (error) {
    console.error('Failed to save draft:', error)
  }
}

const publishPost = async () => {
  if (!validateForm()) return

  try {
    form.value.status = 'published'
    await blogStore.updateBlog(currentBlog.value.id, form.value)
    router.push(`/blog/${currentBlog.value.slug || currentBlog.value.id}`)
  } catch (error) {
    console.error('Failed to publish post:', error)
  }
}

const deletePost = async () => {
  if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
    return
  }

  try {
    await blogStore.deleteBlog(currentBlog.value.id)
    router.push('/blog')
  } catch (error) {
    console.error('Failed to delete post:', error)
  }
}

// Lifecycle
onMounted(async () => {
  // Load categories and tags
  await Promise.all([
    blogStore.fetchCategories(),
    blogStore.fetchTags()
  ])

  // Load blog data
  await loadBlog()
})

// Watch for blog data changes
watch(currentBlog, () => {
  populateForm()
}, { immediate: true })
</script>

<style scoped>
.prose {
  @apply text-gray-900;
}

.prose h2 {
  @apply text-2xl font-bold mt-6 mb-4;
}

.prose h3 {
  @apply text-xl font-semibold mt-4 mb-2;
}

.prose p {
  @apply mb-4;
}

.prose ul, .prose ol {
  @apply mb-4 pl-6;
}

.prose ul {
  @apply list-disc;
}

.prose ol {
  @apply list-decimal;
}

.prose a {
  @apply text-primary-600 hover:text-primary-800 underline;
}
</style>
