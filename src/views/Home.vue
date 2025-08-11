<template>
  <div class="min-h-screen space-y-16">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl">
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center animate-fade-in">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6 animate-bounce-slow">
            <span class="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            Vue 3 + Vite + Tailwind CSS
          </div>
          <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to 
            <span class="gradient-text">Vue3 Project 2025</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            A modern, full-featured Vue 3 application with authentication, blog system, and admin dashboard. 
            Built with the latest technologies and best practices.
          </p>
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <router-link 
              to="/blog" 
              class="btn-primary text-lg px-10 py-4 group"
            >
              <span class="flex items-center">
                Explore Blog
                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </router-link>
            <router-link 
              to="/auth/register" 
              class="btn-secondary text-lg px-10 py-4"
            >
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 animate-fade-in animate-delay-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center group hover-lift">
            <div class="text-4xl font-bold gradient-text mb-2">{{ stats.blogs }}</div>
            <div class="text-gray-600 font-medium">Blog Posts</div>
          </div>
          <div class="text-center group hover-lift">
            <div class="text-4xl font-bold gradient-text mb-2">{{ stats.categories }}</div>
            <div class="text-gray-600 font-medium">Categories</div>
          </div>
          <div class="text-center group hover-lift">
            <div class="text-4xl font-bold gradient-text mb-2">{{ stats.tags }}</div>
            <div class="text-gray-600 font-medium">Tags</div>
          </div>
          <div class="text-center group hover-lift">
            <div class="text-4xl font-bold gradient-text mb-2">{{ stats.users }}</div>
            <div class="text-gray-600 font-medium">Users</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 animate-fade-in animate-delay-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Amazing Features</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover what makes our Vue 3 application stand out from the rest with cutting-edge technology and user experience
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card p-8 text-center group card-hover animate-scale-in animate-delay-100">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Secure Authentication</h3>
            <p class="text-gray-600 leading-relaxed">
              JWT-based authentication with refresh tokens, role-based access control, and secure password management with modern security practices.
            </p>
            <div class="mt-6 flex flex-wrap gap-2 justify-center">
              <span class="badge badge-primary">JWT</span>
              <span class="badge badge-secondary">OAuth</span>
              <span class="badge badge-success">2FA</span>
            </div>
          </div>

          <div class="card p-8 text-center group card-hover animate-scale-in animate-delay-200">
            <div class="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Advanced Blog System</h3>
            <p class="text-gray-600 leading-relaxed">
              Full-featured blog with CRUD operations, categories, tags, comments, likes, search, and advanced content management.
            </p>
            <div class="mt-6 flex flex-wrap gap-2 justify-center">
              <span class="badge badge-primary">CRUD</span>
              <span class="badge badge-secondary">Search</span>
              <span class="badge badge-success">Comments</span>
            </div>
          </div>

          <div class="card p-8 text-center group card-hover animate-scale-in animate-delay-300">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h3>
            <p class="text-gray-600 leading-relaxed">
              Powerful admin dashboard with analytics, user management, content moderation, and comprehensive system settings.
            </p>
            <div class="mt-6 flex flex-wrap gap-2 justify-center">
              <span class="badge badge-primary">Analytics</span>
              <span class="badge badge-secondary">Management</span>
              <span class="badge badge-success">Moderation</span>
            </div>
          </div>

          <div class="card p-8 text-center group card-hover animate-scale-in animate-delay-400">
            <div class="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Modern UI/UX</h3>
            <p class="text-gray-600 leading-relaxed">
              Beautiful, responsive design built with Tailwind CSS, featuring smooth animations, dark mode, and intuitive navigation.
            </p>
            <div class="mt-6 flex flex-wrap gap-2 justify-center">
              <span class="badge badge-primary">Responsive</span>
              <span class="badge badge-secondary">Animations</span>
              <span class="badge badge-success">Dark Mode</span>
            </div>
          </div>

          <div class="card p-8 text-center group card-hover animate-scale-in animate-delay-500">
            <div class="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">High Performance</h3>
            <p class="text-gray-600 leading-relaxed">
              Optimized with Vite, lazy loading, code splitting, and efficient state management using Pinia for blazing fast performance.
            </p>
            <div class="mt-6 flex flex-wrap gap-2 justify-center">
              <span class="badge badge-primary">Vite</span>
              <span class="badge badge-secondary">Lazy Loading</span>
              <span class="badge badge-success">Pinia</span>
            </div>
          </div>

          <div class="card p-8 text-center group card-hover animate-scale-in animate-delay-500">
            <div class="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">TypeScript Ready</h3>
            <p class="text-gray-600 leading-relaxed">
              Full TypeScript support with strict type checking, better IDE experience, and enhanced code maintainability.
            </p>
            <div class="mt-6 flex flex-wrap gap-2 justify-center">
              <span class="badge badge-primary">TypeScript</span>
              <span class="badge badge-secondary">Type Safety</span>
              <span class="badge badge-success">IDE Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Blogs Section -->
    <section class="py-16 animate-fade-in animate-delay-400">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
            <p class="text-xl text-gray-600">Discover our most recent articles and insights</p>
          </div>
          <router-link to="/blog" class="btn-primary group">
            <span class="flex items-center">
              View All Posts
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </router-link>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="card p-6">
            <div class="skeleton h-48 rounded-lg mb-4"></div>
            <div class="skeleton h-6 rounded mb-2"></div>
            <div class="skeleton h-4 rounded mb-2"></div>
            <div class="skeleton h-4 rounded w-2/3"></div>
          </div>
        </div>

        <!-- Blog Posts -->
        <div v-else-if="latestBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="(blog, index) in latestBlogs" 
            :key="blog.id"
            class="card overflow-hidden group card-hover animate-scale-in"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="relative overflow-hidden">
              <img 
                :src="blog.featured_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop'" 
                :alt="blog.title"
                class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute top-4 left-4">
                <span v-if="blog.is_featured" class="badge badge-warning">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <div class="flex items-center mb-3">
                <img 
                  :src="blog.author.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'" 
                  :alt="blog.author.name"
                  class="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ blog.author.name }}</div>
                  <div class="text-xs text-gray-500">{{ formatDate(blog.created_at) }}</div>
                </div>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                {{ blog.title }}
              </h3>
              
              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ blog.excerpt }}
              </p>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {{ blog.views }}
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {{ blog.likes_count }}
                  </span>
                </div>
                
                <router-link 
                  :to="{ name: 'blog-detail', params: { id: blog.id }}"
                  class="text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:underline"
                >
                  Read More →
                </router-link>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
          <p class="text-gray-600 mb-6">Be the first to create an amazing blog post!</p>
          <router-link to="/blog/create" class="btn-primary">
            Create Your First Post
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 animate-fade-in animate-delay-500">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="card p-12 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <h2 class="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already building amazing applications with our Vue 3 template.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/auth/register" class="btn-primary text-lg px-8 py-4">
              Start Building Now
            </router-link>
            <a href="https://github.com" target="_blank" class="btn-secondary text-lg px-8 py-4">
              <span class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBlogStore } from '@/store/blog'
import { formatDistanceToNow } from 'date-fns'

const blogStore = useBlogStore()
const loading = ref(true)
const latestBlogs = ref([])
const stats = ref({
  blogs: 0,
  categories: 0,
  tags: 0,
  users: 0
})

const formatDate = (dateString) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  } catch {
    return 'Recently'
  }
}

const fetchLatestBlogs = async () => {
  try {
    loading.value = true
    const response = await blogStore.fetchBlogs({ page: 1, per_page: 6 })
    latestBlogs.value = response.data || []
  } catch (error) {
    console.error('Failed to fetch latest blogs:', error)
  } finally {
    loading.value = false
  }
}

const fetchStats = async () => {
  try {
    const statsData = await blogStore.fetchStats()
    stats.value = statsData
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
}

onMounted(async () => {
  await Promise.all([fetchLatestBlogs(), fetchStats()])
})
</script>

<style scoped>
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
