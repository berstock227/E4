<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <p class="mt-2 text-sm text-gray-600">
          Discover interesting articles and insights
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <router-link
          v-if="authStore.isAuthenticated"
          to="/blog/create"
          class="btn-primary"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Write Post
        </router-link>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="md:col-span-2">
          <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div class="relative">
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search posts..."
              class="input pl-10"
              @keyup.enter="handleSearch"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Category Filter -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            id="category"
            v-model="selectedCategory"
            class="input"
            @change="handleFilterChange"
          >
            <option value="">All Categories</option>
            <option
              v-for="category in blogStore.categories"
              :key="category.id"
              :value="category.slug"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Sort -->
        <div>
          <label for="sort" class="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
          <select
            id="sort"
            v-model="sortBy"
            class="input"
            @change="handleSortChange"
          >
            <option value="created_at:desc">Latest</option>
            <option value="created_at:asc">Oldest</option>
            <option value="title:asc">Title A-Z</option>
            <option value="title:desc">Title Z-A</option>
            <option value="views:desc">Most Viewed</option>
            <option value="likes_count:desc">Most Liked</option>
          </select>
        </div>
      </div>

      <!-- Filter Actions -->
      <div class="mt-4 flex flex-wrap gap-2">
        <button
          @click="handleSearch"
          class="btn-primary"
          :disabled="blogStore.isLoading"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </button>
        <button
          @click="clearFilters"
          class="btn-secondary"
          :disabled="blogStore.isLoading"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="blogStore.isLoading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading posts...</p>
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
        @click="loadBlogs"
        class="mt-4 btn-primary"
      >
        Try Again
      </button>
    </div>

    <!-- Blog Posts Grid -->
    <div v-else-if="blogStore.hasBlogs" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="blog in blogStore.blogs"
        :key="blog.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <!-- Featured Image -->
        <div class="aspect-w-16 aspect-h-9 bg-gray-200">
          <img
            v-if="blog.featured_image"
            :src="blog.featured_image"
            :alt="blog.title"
            class="w-full h-48 object-cover"
          />
          <div
            v-else
            class="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
          >
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <!-- Category -->
          <div class="flex items-center mb-2">
            <span
              v-if="blog.category"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
            >
              {{ blog.category.name }}
            </span>
            <span class="ml-auto text-xs text-gray-500">
              {{ formatDate(blog.created_at) }}
            </span>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            <router-link
              :to="{ name: 'blog-detail', params: { id: blog.slug || blog.id } }"
              class="hover:text-primary-600 transition-colors"
            >
              {{ blog.title }}
            </router-link>
          </h3>

          <!-- Excerpt -->
          <p class="text-gray-600 mb-4 line-clamp-3">
            {{ blog.excerpt || blog.content.substring(0, 150) + '...' }}
          </p>

          <!-- Author and Stats -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <img
                v-if="blog.author?.avatar"
                :src="blog.author.avatar"
                :alt="blog.author.name"
                class="w-8 h-8 rounded-full"
              />
              <div v-else class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">
                  {{ blog.author?.name?.charAt(0).toUpperCase() || 'A' }}
                </span>
              </div>
              <span class="text-sm text-gray-700">{{ blog.author?.name || 'Anonymous' }}</span>
            </div>

            <!-- Stats -->
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {{ blog.views || 0 }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {{ blog.likes_count || 0 }}
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div v-if="blog.tags && blog.tags.length" class="mt-4 flex flex-wrap gap-1">
            <span
              v-for="tag in blog.tags.slice(0, 3)"
              :key="tag.id"
              class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
            >
              #{{ tag.name }}
            </span>
            <span
              v-if="blog.tags.length > 3"
              class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
            >
              +{{ blog.tags.length - 3 }} more
            </span>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No posts found</h3>
      <p class="mt-1 text-sm text-gray-500">
        {{ searchQuery || selectedCategory ? 'Try adjusting your search or filters.' : 'Get started by creating a new post.' }}
      </p>
      <div class="mt-6">
        <router-link
          v-if="authStore.isAuthenticated"
          to="/blog/create"
          class="btn-primary"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Write Post
        </router-link>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="blogStore.hasBlogs && blogStore.lastPage > 1" class="flex items-center justify-between">
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          @click="previousPage"
          :disabled="blogStore.isFirstPage || blogStore.isLoading"
          class="btn-secondary"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="blogStore.isLastPage || blogStore.isLoading"
          class="btn-primary"
        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ blogStore.pagination.from }}</span>
            to
            <span class="font-medium">{{ blogStore.pagination.to }}</span>
            of
            <span class="font-medium">{{ blogStore.totalBlogs }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              @click="previousPage"
              :disabled="blogStore.isFirstPage || blogStore.isLoading"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                page === blogStore.currentPage
                  ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              ]"
              :disabled="blogStore.isLoading"
            >
              {{ page }}
            </button>
            
            <button
              @click="nextPage"
              :disabled="blogStore.isLastPage || blogStore.isLoading"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/store/blog'
import { useAuthStore } from '@/store/auth'
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const authStore = useAuthStore()

// Search and filter state
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('created_at:desc')

// Computed
const visiblePages = computed(() => {
  const current = blogStore.currentPage
  const last = blogStore.lastPage
  const delta = 2

  const range = []
  const rangeWithDots = []

  for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }

  rangeWithDots.push(...range)

  if (current + delta < last - 1) {
    rangeWithDots.push('...', last)
  } else {
    rangeWithDots.push(last)
  }

  return rangeWithDots.filter(page => page !== 1 || last !== 1)
})

// Methods
const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy')
}

const loadBlogs = async () => {
  try {
    await blogStore.fetchBlogs({
      search: searchQuery.value,
      category: selectedCategory.value,
      sort_by: sortBy.value.split(':')[0],
      sort_order: sortBy.value.split(':')[1]
    })
  } catch (error) {
    console.error('Failed to load blogs:', error)
  }
}

const handleSearch = () => {
  blogStore.setPage(1)
  loadBlogs()
}

const handleFilterChange = () => {
  blogStore.setPage(1)
  loadBlogs()
}

const handleSortChange = () => {
  blogStore.setPage(1)
  loadBlogs()
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  sortBy.value = 'created_at:desc'
  blogStore.clearFilters()
  loadBlogs()
}

const previousPage = () => {
  if (blogStore.hasPrevPage) {
    blogStore.setPage(blogStore.currentPage - 1)
    loadBlogs()
  }
}

const nextPage = () => {
  if (blogStore.hasNextPage) {
    blogStore.setPage(blogStore.currentPage + 1)
    loadBlogs()
  }
}

const goToPage = (page) => {
  if (typeof page === 'number' && page !== blogStore.currentPage) {
    blogStore.setPage(page)
    loadBlogs()
  }
}

// Lifecycle
onMounted(async () => {
  // Load categories and tags
  await Promise.all([
    blogStore.fetchCategories(),
    blogStore.fetchTags()
  ])

  // Load blogs
  await loadBlogs()
})

// Watch for route changes
watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.search !== undefined) {
      searchQuery.value = newQuery.search
    }
    if (newQuery.category !== undefined) {
      selectedCategory.value = newQuery.category
    }
    if (newQuery.sort !== undefined) {
      sortBy.value = newQuery.sort
    }
    if (newQuery.page !== undefined) {
      blogStore.setPage(parseInt(newQuery.page))
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
