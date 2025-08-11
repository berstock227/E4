<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Search Results</h1>
      <p class="text-lg text-gray-600">
        {{ searchQuery ? `Searching for "${searchQuery}"` : 'Browse all posts' }}
      </p>
    </div>

    <!-- Search Form -->
    <div class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="performSearch" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search Query -->
          <div class="md:col-span-2">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div class="relative">
              <input
                id="search"
                v-model="searchForm.query"
                type="text"
                placeholder="Search posts, authors, or content..."
                class="input pl-10"
                @input="handleSearchInput"
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
              v-model="searchForm.category"
              class="input"
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

          <!-- Date Range -->
          <div>
            <label for="date_range" class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              id="date_range"
              v-model="searchForm.date_range"
              class="input"
            >
              <option value="">Any Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        <!-- Advanced Filters -->
        <div class="border-t border-gray-200 pt-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Author Filter -->
            <div>
              <label for="author" class="block text-sm font-medium text-gray-700 mb-2">Author</label>
              <input
                id="author"
                v-model="searchForm.author"
                type="text"
                placeholder="Search by author..."
                class="input"
              />
            </div>

            <!-- Tags Filter -->
            <div>
              <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <input
                id="tags"
                v-model="searchForm.tags"
                type="text"
                placeholder="Search by tags..."
                class="input"
              />
            </div>

            <!-- Sort By -->
            <div>
              <label for="sort" class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                id="sort"
                v-model="searchForm.sort"
                class="input"
              >
                <option value="relevance">Relevance</option>
                <option value="date_desc">Newest First</option>
                <option value="date_asc">Oldest First</option>
                <option value="title_asc">Title A-Z</option>
                <option value="title_desc">Title Z-A</option>
                <option value="views_desc">Most Viewed</option>
                <option value="likes_desc">Most Liked</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Search Actions -->
        <div class="flex flex-wrap gap-3">
          <button
            type="submit"
            class="btn-primary"
            :disabled="blogStore.isLoading"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
          <button
            type="button"
            @click="clearFilters"
            class="btn-secondary"
            :disabled="blogStore.isLoading"
          >
            Clear Filters
          </button>
          <button
            type="button"
            @click="toggleAdvancedFilters"
            class="btn-secondary"
          >
            {{ showAdvancedFilters ? 'Hide' : 'Show' }} Advanced
          </button>
        </div>
      </form>
    </div>

    <!-- Search Suggestions -->
    <div v-if="searchSuggestions.length && searchForm.query && !blogStore.isLoading" class="bg-white rounded-lg shadow p-4">
      <h3 class="text-sm font-medium text-gray-900 mb-3">Search Suggestions</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="suggestion in searchSuggestions"
          :key="suggestion"
          @click="useSuggestion(suggestion)"
          class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-primary-100 hover:text-primary-800 transition-colors"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>

    <!-- Results Summary -->
    <div v-if="blogStore.hasBlogs || searchPerformed" class="flex items-center justify-between">
      <div class="text-sm text-gray-600">
        {{ blogStore.totalBlogs }} result{{ blogStore.totalBlogs !== 1 ? 's' : '' }}
        {{ searchForm.query ? `for "${searchForm.query}"` : '' }}
        {{ searchTime ? `in ${searchTime}ms` : '' }}
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-600">Show:</span>
        <select
          v-model="itemsPerPage"
          class="text-sm border border-gray-300 rounded px-2 py-1"
          @change="handleItemsPerPageChange"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="blogStore.isLoading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Searching...</p>
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
        @click="performSearch"
        class="mt-4 btn-primary"
      >
        Try Again
      </button>
    </div>

    <!-- Search Results -->
    <div v-else-if="blogStore.hasBlogs" class="space-y-6">
      <article
        v-for="blog in blogStore.blogs"
        :key="blog.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="md:flex">
          <!-- Featured Image -->
          <div class="md:w-1/3">
            <img
              v-if="blog.featured_image"
              :src="blog.featured_image"
              :alt="blog.title"
              class="w-full h-48 md:h-full object-cover"
            />
            <div
              v-else
              class="w-full h-48 md:h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
            >
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="md:w-2/3 p-6">
            <!-- Category -->
            <div class="mb-2">
              <span
                v-if="blog.category"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {{ blog.category.name }}
              </span>
            </div>

            <!-- Title -->
            <h2 class="text-xl font-semibold text-gray-900 mb-2">
              <router-link
                :to="{ name: 'blog-detail', params: { id: blog.slug || blog.id } }"
                class="hover:text-primary-600 transition-colors"
              >
                {{ blog.title }}
              </router-link>
            </h2>

            <!-- Excerpt -->
            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ blog.excerpt || blog.content.substring(0, 200) + '...' }}
            </p>

            <!-- Meta Info -->
            <div class="flex items-center justify-between text-sm text-gray-500">
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <img
                    v-if="blog.author?.avatar"
                    :src="blog.author.avatar"
                    :alt="blog.author.name"
                    class="w-6 h-6 rounded-full mr-2"
                  />
                  <span>{{ blog.author?.name || 'Anonymous' }}</span>
                </div>
                <span>{{ formatDate(blog.created_at) }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <span>{{ blog.views || 0 }} views</span>
                <span>{{ blog.likes_count || 0 }} likes</span>
                <span>{{ blog.comments_count || 0 }} comments</span>
              </div>
            </div>

            <!-- Tags -->
            <div v-if="blog.tags && blog.tags.length" class="mt-3 flex flex-wrap gap-1">
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
        </div>
      </article>
    </div>

    <!-- No Results -->
    <div v-else-if="searchPerformed" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No results found</h3>
      <p class="mt-1 text-sm text-gray-500">
        Try adjusting your search terms or filters to find what you're looking for.
      </p>
      <div class="mt-6">
        <button
          @click="clearFilters"
          class="btn-primary"
        >
          Clear Filters
        </button>
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
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

// State
const searchForm = ref({
  query: '',
  category: '',
  date_range: '',
  author: '',
  tags: '',
  sort: 'relevance'
})

const showAdvancedFilters = ref(false)
const searchSuggestions = ref([])
const searchPerformed = ref(false)
const searchTime = ref(null)
const itemsPerPage = ref(10)

// Computed
const searchQuery = computed(() => route.query.q || '')

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

const performSearch = async () => {
  const startTime = Date.now()
  searchPerformed.value = true

  try {
    const params = {
      q: searchForm.value.query,
      category: searchForm.value.category,
      date_range: searchForm.value.date_range,
      author: searchForm.value.author,
      tags: searchForm.value.tags,
      sort: searchForm.value.sort,
      per_page: itemsPerPage.value
    }

    // Remove empty values
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key]
    })

    await blogStore.searchBlogs(params)
    searchTime.value = Date.now() - startTime

    // Update URL
    router.push({
      name: 'blog-search',
      query: params
    })
  } catch (error) {
    console.error('Search failed:', error)
  }
}

const handleSearchInput = () => {
  // Generate search suggestions based on input
  if (searchForm.value.query.length > 2) {
    const suggestions = [
      searchForm.value.query,
      `${searchForm.value.query} tutorial`,
      `${searchForm.value.query} guide`,
      `${searchForm.value.query} tips`
    ]
    searchSuggestions.value = suggestions.slice(0, 4)
  } else {
    searchSuggestions.value = []
  }
}

const useSuggestion = (suggestion) => {
  searchForm.value.query = suggestion
  performSearch()
}

const clearFilters = () => {
  searchForm.value = {
    query: '',
    category: '',
    date_range: '',
    author: '',
    tags: '',
    sort: 'relevance'
  }
  searchPerformed.value = false
  searchTime.value = null
  router.push({ name: 'blog-search' })
}

const toggleAdvancedFilters = () => {
  showAdvancedFilters.value = !showAdvancedFilters.value
}

const handleItemsPerPageChange = () => {
  blogStore.setPage(1)
  performSearch()
}

const previousPage = () => {
  if (blogStore.hasPrevPage) {
    blogStore.setPage(blogStore.currentPage - 1)
    performSearch()
  }
}

const nextPage = () => {
  if (blogStore.hasNextPage) {
    blogStore.setPage(blogStore.currentPage + 1)
    performSearch()
  }
}

const goToPage = (page) => {
  if (typeof page === 'number' && page !== blogStore.currentPage) {
    blogStore.setPage(page)
    performSearch()
  }
}

// Lifecycle
onMounted(async () => {
  // Load categories
  await blogStore.fetchCategories()

  // Initialize search form from route query
  if (route.query.q) {
    searchForm.value.query = route.query.q
  }
  if (route.query.category) {
    searchForm.value.category = route.query.category
  }
  if (route.query.date_range) {
    searchForm.value.date_range = route.query.date_range
  }
  if (route.query.author) {
    searchForm.value.author = route.query.author
  }
  if (route.query.tags) {
    searchForm.value.tags = route.query.tags
  }
  if (route.query.sort) {
    searchForm.value.sort = route.query.sort
  }

  // Perform search if query exists
  if (Object.keys(route.query).length > 0) {
    await performSearch()
  }
})

// Watch for route changes
watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.q !== searchForm.value.query) {
      searchForm.value.query = newQuery.q || ''
    }
    if (newQuery.category !== searchForm.value.category) {
      searchForm.value.category = newQuery.category || ''
    }
    // Add other query parameter watchers as needed
  }
)
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
