<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Blog Management</h1>
        <p class="mt-2 text-gray-600">Create, edit, and manage your blog posts with enhanced features</p>
      </div>

      <!-- Tabs -->
      <div class="mb-8">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-8">
        <!-- Create/Edit Blog Tab -->
        <div v-if="activeTab === 'create'">
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">
                {{ isEditing ? 'Edit Blog Post' : 'Create New Blog Post' }}
              </h2>
            </div>
            <div class="p-6">
              <form @submit.prevent="saveBlog" class="space-y-6">
                <!-- Title -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    v-model="blogForm.title"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter blog title"
                  />
                </div>

                <!-- Slug -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Slug
                  </label>
                  <input
                    v-model="blogForm.slug"
                    type="text"
                    class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="auto-generated from title"
                  />
                  <p class="mt-1 text-sm text-gray-500">
                    Leave empty to auto-generate from title
                  </p>
                </div>

                <!-- Excerpt -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    v-model="blogForm.excerpt"
                    rows="3"
                    class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the blog post"
                  ></textarea>
                </div>

                <!-- Featured Image -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <ImageUpload
                    v-model="blogForm.featured_image"
                    @upload="handleImageUpload"
                    @error="handleImageError"
                  />
                </div>

                <!-- Category and Tags -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      v-model="blogForm.category_id"
                      class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a category</option>
                      <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{ category.name }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div class="space-y-2">
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="tag in blogForm.tags"
                          :key="tag"
                          class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {{ tag }}
                          <button
                            @click="removeTag(tag)"
                            type="button"
                            class="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      </div>
                      <div class="flex">
                        <input
                          v-model="newTag"
                          @keyup.enter="addTag"
                          type="text"
                          class="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Add a tag"
                        />
                        <button
                          @click="addTag"
                          type="button"
                          class="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Content Editor -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <BlogEditor
                    v-model="blogForm.content"
                    @save="handleAutosave"
                    :autosave="true"
                    :autosave-interval="30000"
                  />
                </div>

                <!-- Meta Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      v-model="blogForm.meta_title"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="SEO title"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      v-model="blogForm.meta_description"
                      rows="3"
                      class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="SEO description"
                    ></textarea>
                  </div>
                </div>

                <!-- Settings -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-sm font-medium text-gray-900 mb-4">Settings</h3>
                  <div class="space-y-4">
                    <div class="flex items-center">
                      <input
                        v-model="blogForm.allow_comments"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label class="ml-2 text-sm text-gray-700">
                        Allow comments
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="blogForm.is_featured"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label class="ml-2 text-sm text-gray-700">
                        Featured post
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex justify-end space-x-3">
                  <button
                    @click="saveDraft"
                    type="button"
                    :disabled="isSaving"
                    class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    {{ isSaving ? 'Saving...' : 'Save Draft' }}
                  </button>
                  <button
                    @click="publishBlog"
                    type="button"
                    :disabled="isSaving"
                    class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {{ isSaving ? 'Publishing...' : 'Publish' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Category & Tag Management Tab -->
        <div v-if="activeTab === 'categories'">
          <CategoryTagManager
            v-model="categoryTagData"
            @change="handleCategoryTagChange"
          />
        </div>

        <!-- Blog List Tab -->
        <div v-if="activeTab === 'list'">
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">Blog Posts</h2>
                <button
                  @click="createNewBlog"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create New Post
                </button>
              </div>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div
                  v-for="blog in blogs"
                  :key="blog.id"
                  class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div class="flex-1">
                    <h3 class="text-lg font-medium text-gray-900">{{ blog.title }}</h3>
                    <p class="text-sm text-gray-500 mt-1">{{ blog.excerpt }}</p>
                    <div class="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                      <span>Status: {{ blog.status }}</span>
                      <span>Views: {{ blog.views }}</span>
                      <span>Created: {{ formatDate(blog.created_at) }}</span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button
                      @click="editBlog(blog)"
                      class="p-2 text-gray-400 hover:text-gray-600"
                      title="Edit"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      @click="deleteBlog(blog.id)"
                      class="p-2 text-gray-400 hover:text-red-600"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/store/blog'
import { generateBlogSlug } from '@/utils/slug'
import BlogEditor from '@/components/blog/BlogEditor.vue'
import ImageUpload from '@/components/blog/ImageUpload.vue'
import CategoryTagManager from '@/components/blog/CategoryTagManager.vue'

const router = useRouter()
const blogStore = useBlogStore()

// Tabs
const tabs = [
  { id: 'create', name: 'Create/Edit' },
  { id: 'categories', name: 'Categories & Tags' },
  { id: 'list', name: 'Blog List' }
]

const activeTab = ref('create')

// Form data
const blogForm = reactive({
  title: '',
  slug: '',
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

const newTag = ref('')
const isEditing = ref(false)
const editingBlogId = ref(null)
const isSaving = ref(false)
const categoryTagData = ref({ categories: [], tags: [] })

// Computed
const categories = computed(() => blogStore.categories)
const tags = computed(() => blogStore.tags)
const blogs = computed(() => blogStore.blogs)

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const generateSlug = () => {
  if (blogForm.title) {
    blogForm.slug = generateBlogSlug(blogForm.title, blogs.value, editingBlogId.value)
  }
}

const addTag = () => {
  if (newTag.value.trim() && !blogForm.tags.includes(newTag.value.trim())) {
    blogForm.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (tag) => {
  const index = blogForm.tags.indexOf(tag)
  if (index > -1) {
    blogForm.tags.splice(index, 1)
  }
}

const handleImageUpload = (data) => {
  blogForm.featured_image = data.url
}

const handleImageError = (error) => {
  console.error('Image upload error:', error)
}

const handleAutosave = (content) => {
  blogForm.content = content
  // Auto-save logic can be implemented here
}

const handleCategoryTagChange = (change) => {
  console.log('Category/Tag change:', change)
}

const resetForm = () => {
  Object.assign(blogForm, {
    title: '',
    slug: '',
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
  isEditing.value = false
  editingBlogId.value = null
}

const saveBlog = async (status = 'draft') => {
  if (!blogForm.title || !blogForm.content) {
    alert('Title and content are required')
    return
  }

  isSaving.value = true
  try {
    const blogData = {
      ...blogForm,
      status
    }

    if (isEditing.value) {
      await blogStore.updateBlog(editingBlogId.value, blogData)
    } else {
      await blogStore.createBlog(blogData)
    }

    resetForm()
    activeTab.value = 'list'
  } catch (error) {
    console.error('Failed to save blog:', error)
  } finally {
    isSaving.value = false
  }
}

const saveDraft = () => {
  saveBlog('draft')
}

const publishBlog = () => {
  saveBlog('published')
}

const createNewBlog = () => {
  resetForm()
  activeTab.value = 'create'
}

const editBlog = (blog) => {
  Object.assign(blogForm, {
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    category_id: blog.category?.id || '',
    tags: blog.tags || [],
    featured_image: blog.featured_image,
    meta_title: blog.meta_title,
    meta_description: blog.meta_description,
    allow_comments: blog.allow_comments,
    is_featured: blog.is_featured,
    status: blog.status
  })
  isEditing.value = true
  editingBlogId.value = blog.id
  activeTab.value = 'create'
}

const deleteBlog = async (id) => {
  if (!confirm('Are you sure you want to delete this blog post?')) {
    return
  }

  try {
    await blogStore.deleteBlog(id)
  } catch (error) {
    console.error('Failed to delete blog:', error)
  }
}

// Watch for title changes to auto-generate slug
watch(() => blogForm.title, () => {
  if (!isEditing.value || !blogForm.slug) {
    generateSlug()
  }
})

// Lifecycle
onMounted(async () => {
  try {
    await Promise.all([
      blogStore.fetchBlogs(),
      blogStore.fetchCategories(),
      blogStore.fetchTags()
    ])
    
    categoryTagData.value = {
      categories: categories.value,
      tags: tags.value
    }
  } catch (error) {
    console.error('Failed to load data:', error)
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
