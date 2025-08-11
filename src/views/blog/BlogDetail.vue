<template>
  <div class="space-y-8">
    <!-- Loading State -->
    <div v-if="blogStore.isLoading" class="text-center py-12">
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

    <!-- Blog Content -->
    <article v-else-if="currentBlog" class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <!-- Category -->
        <div class="mb-4">
          <span
            v-if="currentBlog.category"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
          >
            {{ currentBlog.category.name }}
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {{ currentBlog.title }}
        </h1>

        <!-- Excerpt -->
        <p v-if="currentBlog.excerpt" class="text-xl text-gray-600 mb-6 leading-relaxed">
          {{ currentBlog.excerpt }}
        </p>

        <!-- Meta Info -->
        <div class="flex items-center justify-between border-b border-gray-200 pb-6">
          <div class="flex items-center space-x-4">
            <!-- Author -->
            <div class="flex items-center space-x-3">
              <img
                v-if="currentBlog.author?.avatar"
                :src="currentBlog.author.avatar"
                :alt="currentBlog.author.name"
                class="w-10 h-10 rounded-full"
              />
              <div v-else class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">
                  {{ currentBlog.author?.name?.charAt(0).toUpperCase() || 'A' }}
                </span>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ currentBlog.author?.name || 'Anonymous' }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ formatDate(currentBlog.created_at) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="flex items-center space-x-6 text-sm text-gray-500">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {{ currentBlog.views || 0 }} views
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {{ currentBlog.likes_count || 0 }} likes
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {{ currentBlog.comments_count || 0 }} comments
            </div>
          </div>
        </div>
      </header>

      <!-- Featured Image -->
      <div v-if="currentBlog.featured_image" class="mb-8">
        <img
          :src="currentBlog.featured_image"
          :alt="currentBlog.title"
          class="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      <!-- Content -->
      <div class="prose prose-lg max-w-none mb-8">
        <div v-html="currentBlog.content"></div>
      </div>

      <!-- Tags -->
      <div v-if="currentBlog.tags && currentBlog.tags.length" class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
        <div class="flex flex-wrap gap-2">
          <router-link
            v-for="tag in currentBlog.tags"
            :key="tag.id"
            :to="{ name: 'blog-tag', params: { tag: tag.slug || tag.name } }"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-primary-100 hover:text-primary-800 transition-colors"
          >
            #{{ tag.name }}
          </router-link>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between border-t border-gray-200 pt-6 mb-8">
        <!-- Like Button -->
        <button
          @click="toggleLike"
          :disabled="blogStore.isLoading"
          class="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          :class="{ 'bg-red-50 border-red-300 text-red-600': currentBlog.is_liked }"
        >
          <svg
            class="w-5 h-5"
            :class="{ 'fill-current': currentBlog.is_liked }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{{ currentBlog.is_liked ? 'Liked' : 'Like' }}</span>
        </button>

        <!-- Social Share -->
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500">Share:</span>
          <button
            @click="shareOnTwitter"
            class="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            title="Share on Twitter"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </button>
          <button
            @click="shareOnFacebook"
            class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="Share on Facebook"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button
            @click="shareOnLinkedIn"
            class="p-2 text-gray-400 hover:text-blue-700 transition-colors"
            title="Share on LinkedIn"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Author Bio -->
      <div v-if="currentBlog.author" class="bg-gray-50 rounded-lg p-6 mb-8">
        <div class="flex items-start space-x-4">
          <img
            v-if="currentBlog.author.avatar"
            :src="currentBlog.author.avatar"
            :alt="currentBlog.author.name"
            class="w-16 h-16 rounded-full"
          />
          <div v-else class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
            <span class="text-white text-lg font-medium">
              {{ currentBlog.author.name.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              About {{ currentBlog.author.name }}
            </h3>
            <p class="text-gray-600 mb-3">
              {{ currentBlog.author.bio || 'No bio available.' }}
            </p>
            <div class="flex space-x-4">
              <a
                v-if="currentBlog.author.website"
                :href="currentBlog.author.website"
                target="_blank"
                class="text-primary-600 hover:text-primary-800 text-sm"
              >
                Website
              </a>
              <a
                v-if="currentBlog.author.twitter"
                :href="currentBlog.author.twitter"
                target="_blank"
                class="text-primary-600 hover:text-primary-800 text-sm"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div v-if="currentBlog.allow_comments !== false" class="border-t border-gray-200 pt-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">
          Comments ({{ currentBlog.comments_count || 0 }})
        </h3>

        <!-- Comment Form -->
        <div v-if="authStore.isAuthenticated" class="mb-8">
          <form @submit.prevent="submitComment" class="space-y-4">
            <div>
              <label for="comment" class="block text-sm font-medium text-gray-700 mb-2">
                Add a comment
              </label>
              <textarea
                id="comment"
                v-model="newComment"
                rows="4"
                class="input"
                placeholder="Share your thoughts..."
                :disabled="blogStore.isLoading"
              ></textarea>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="btn-primary"
                :disabled="blogStore.isLoading || !newComment.trim()"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>

        <!-- Login Prompt -->
        <div v-else class="mb-8 p-4 bg-gray-50 rounded-lg">
          <p class="text-gray-600 mb-3">
            Please <router-link to="/auth/login" class="text-primary-600 hover:text-primary-800">log in</router-link> to leave a comment.
          </p>
        </div>

        <!-- Comments List -->
        <div v-if="currentBlog.comments && currentBlog.comments.length" class="space-y-6">
          <div
            v-for="comment in currentBlog.comments"
            :key="comment.id"
            class="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div class="flex items-start space-x-3">
              <img
                v-if="comment.user?.avatar"
                :src="comment.user.avatar"
                :alt="comment.user.name"
                class="w-10 h-10 rounded-full"
              />
              <div v-else class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">
                  {{ comment.user?.name?.charAt(0).toUpperCase() || 'U' }}
                </span>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ comment.user?.name || 'Anonymous' }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ formatDate(comment.created_at) }}
                    </p>
                  </div>
                  <button
                    v-if="canDeleteComment(comment)"
                    @click="deleteComment(comment.id)"
                    class="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
                <p class="text-gray-700">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- No Comments -->
        <div v-else class="text-center py-8 text-gray-500">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      </div>
    </article>

    <!-- Related Posts -->
    <div v-if="relatedPosts.length" class="border-t border-gray-200 pt-8">
      <h3 class="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="post in relatedPosts"
          :key="post.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <router-link :to="{ name: 'blog-detail', params: { id: post.slug || post.id } }">
            <img
              v-if="post.featured_image"
              :src="post.featured_image"
              :alt="post.title"
              class="w-full h-48 object-cover"
            />
            <div v-else class="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div class="p-4">
              <h4 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ post.title }}</h4>
              <p class="text-sm text-gray-600 line-clamp-2">{{ post.excerpt }}</p>
              <div class="mt-3 flex items-center text-xs text-gray-500">
                <span>{{ formatDate(post.created_at) }}</span>
                <span class="mx-2">•</span>
                <span>{{ post.views || 0 }} views</span>
              </div>
            </div>
          </router-link>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/store/blog'
import { useAuthStore } from '@/store/auth'
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const authStore = useAuthStore()

// State
const newComment = ref('')
const relatedPosts = ref([])

// Computed
const currentBlog = computed(() => blogStore.currentBlog)

// Methods
const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy')
}

const loadBlog = async () => {
  try {
    await blogStore.fetchBlog(route.params.id)
    
    // Increment view count (fail-safe)
    try {
      await blogStore.incrementViews(route.params.id)
    } catch (viewError) {
      console.warn('Failed to increment views:', viewError)
    }
    
    // Load related posts (fail-safe)
    try {
      const related = await blogStore.fetchRelatedBlogs(route.params.id, 6)
      relatedPosts.value = related
    } catch (relatedError) {
      console.warn('Failed to load related posts:', relatedError)
      relatedPosts.value = []
    }
  } catch (error) {
    console.error('Failed to load blog:', error)
    // Redirect to blog list if blog not found
    if (error.response?.status === 404) {
      router.replace('/blog')
    }
  }
}

const toggleLike = async () => {
  try {
    await blogStore.toggleLike(currentBlog.value.id)
  } catch (error) {
    console.error('Failed to toggle like:', error)
  }
}

const submitComment = async () => {
  if (!newComment.value.trim()) return

  try {
    await blogStore.addComment(currentBlog.value.id, {
      content: newComment.value
    })
    newComment.value = ''
  } catch (error) {
    console.error('Failed to submit comment:', error)
  }
}

const deleteComment = async (commentId) => {
  if (!confirm('Are you sure you want to delete this comment?')) return

  try {
    await blogStore.deleteComment(currentBlog.value.id, commentId)
  } catch (error) {
    console.error('Failed to delete comment:', error)
  }
}

const canDeleteComment = (comment) => {
  return authStore.isAuthenticated && (
    comment.user_id === authStore.user?.id ||
    authStore.isAdmin ||
    authStore.isModerator
  )
}

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(currentBlog.value.title)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareOnLinkedIn = () => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(currentBlog.value.title)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank')
}

// Lifecycle
onMounted(() => {
  loadBlog()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  @apply text-gray-900;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  @apply text-gray-900 font-bold;
}

.prose h1 {
  @apply text-3xl mb-4;
}

.prose h2 {
  @apply text-2xl mb-3;
}

.prose h3 {
  @apply text-xl mb-2;
}

.prose p {
  @apply mb-4 leading-relaxed;
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

.prose li {
  @apply mb-1;
}

.prose a {
  @apply text-primary-600 hover:text-primary-800 underline;
}

.prose blockquote {
  @apply border-l-4 border-primary-500 pl-4 italic text-gray-700 mb-4;
}

.prose code {
  @apply bg-gray-100 px-1 py-0.5 rounded text-sm;
}

.prose pre {
  @apply bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4;
}

.prose img {
  @apply rounded-lg shadow-md my-4;
}
</style>
