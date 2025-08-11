import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { blogAPI } from '@/api/blog'

export const useBlogStore = defineStore('blog', () => {
  // State
  const blogs = ref([])
  const currentBlog = ref(null)
  const categories = ref([])
  const tags = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  
  // Pagination state
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: 0,
    to: 0
  })
  
  // Filters state
  const filters = ref({
    search: '',
    category: '',
    status: '',
    sort_by: 'created_at',
    sort_order: 'desc'
  })

  // Getters
  const hasBlogs = computed(() => blogs.value.length > 0)
  const totalBlogs = computed(() => pagination.value.total)
  const currentPage = computed(() => pagination.value.current_page)
  const lastPage = computed(() => pagination.value.last_page)
  const hasNextPage = computed(() => currentPage.value < lastPage.value)
  const hasPrevPage = computed(() => currentPage.value > 1)
  const isFirstPage = computed(() => currentPage.value === 1)
  const isLastPage = computed(() => currentPage.value === lastPage.value)

  // Actions
  const fetchBlogs = async (params = {}) => {
    isLoading.value = true
    error.value = null
    
    try {
      const queryParams = {
        page: pagination.value.current_page,
        per_page: pagination.value.per_page,
        ...filters.value,
        ...params
      }
      
      const response = await blogAPI.getBlogs(queryParams)
      
      blogs.value = response.data
      pagination.value = response.meta
      
      return response
    } catch (err) {
      error.value = err.message || 'Failed to fetch blogs'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchBlog = async (id) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await blogAPI.getBlog(id)
      currentBlog.value = response.data
      return response
    } catch (err) {
      error.value = err.message || 'Failed to fetch blog'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const createBlog = async (blogData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await blogAPI.createBlog(blogData)
      
      // Add to blogs list if it's published
      if (response.data.status === 'published') {
        blogs.value.unshift(response.data)
        pagination.value.total += 1
      }
      
      return response
    } catch (err) {
      error.value = err.message || 'Failed to create blog'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateBlog = async (id, blogData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await blogAPI.updateBlog(id, blogData)
      
      // Update in blogs list
      const index = blogs.value.findIndex(blog => blog.id === id)
      if (index !== -1) {
        blogs.value[index] = response.data
      }
      
      // Update current blog if it's the same
      if (currentBlog.value?.id === id) {
        currentBlog.value = response.data
      }
      
      return response
    } catch (err) {
      error.value = err.message || 'Failed to update blog'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteBlog = async (id) => {
    isLoading.value = true
    error.value = null
    
    try {
      await blogAPI.deleteBlog(id)
      
      // Remove from blogs list
      const index = blogs.value.findIndex(blog => blog.id === id)
      if (index !== -1) {
        blogs.value.splice(index, 1)
        pagination.value.total -= 1
      }
      
      // Clear current blog if it's the same
      if (currentBlog.value?.id === id) {
        currentBlog.value = null
      }
    } catch (err) {
      error.value = err.message || 'Failed to delete blog'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const uploadImage = async (file, type = 'featured') => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await blogAPI.uploadImage(file, type)
      return response
    } catch (err) {
      error.value = err.message || 'Failed to upload image'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const searchBlogs = async (params = {}) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await blogAPI.searchBlogs(params)
      blogs.value = response.data
      pagination.value = response.meta
      return response
    } catch (err) {
      error.value = err.message || 'Failed to search blogs'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await blogAPI.getCategories()
      categories.value = response.data
      return response
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }

  const fetchTags = async () => {
    try {
      const response = await blogAPI.getTags()
      tags.value = response.data
      return response
    } catch (err) {
      console.error('Failed to fetch tags:', err)
    }
  }

  const createCategory = async (categoryData) => {
    try {
      const response = await blogAPI.createCategory(categoryData)
      categories.value.push(response.data)
      return response
    } catch (err) {
      error.value = err.message || 'Failed to create category'
      throw err
    }
  }

  const updateCategory = async (id, categoryData) => {
    try {
      const response = await blogAPI.updateCategory(id, categoryData)
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = response.data
      }
      return response
    } catch (err) {
      error.value = err.message || 'Failed to update category'
      throw err
    }
  }

  const deleteCategory = async (id) => {
    try {
      await blogAPI.deleteCategory(id)
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value.splice(index, 1)
      }
    } catch (err) {
      error.value = err.message || 'Failed to delete category'
      throw err
    }
  }

  const createTag = async (tagData) => {
    try {
      const response = await blogAPI.createTag(tagData)
      tags.value.push(response.data)
      return response
    } catch (err) {
      error.value = err.message || 'Failed to create tag'
      throw err
    }
  }

  const updateTag = async (id, tagData) => {
    try {
      const response = await blogAPI.updateTag(id, tagData)
      const index = tags.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tags.value[index] = response.data
      }
      return response
    } catch (err) {
      error.value = err.message || 'Failed to update tag'
      throw err
    }
  }

  const deleteTag = async (id) => {
    try {
      await blogAPI.deleteTag(id)
      const index = tags.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tags.value.splice(index, 1)
      }
    } catch (err) {
      error.value = err.message || 'Failed to delete tag'
      throw err
    }
  }

  const fetchStats = async () => {
    try {
      const response = await blogAPI.getStats()
      return response.data
    } catch (err) {
      console.error('Failed to fetch stats:', err)
      throw err
    }
  }

  const fetchBlogsByCategory = async (category, params = {}) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await blogAPI.getBlogsByCategory(category, params)
      blogs.value = response.data
      pagination.value = response.meta
      return response
    } catch (err) {
      error.value = err.message || 'Failed to fetch blogs by category'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchBlogsByTag = async (tag, params = {}) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await blogAPI.getBlogsByTag(tag, params)
      blogs.value = response.data
      pagination.value = response.meta
      return response
    } catch (err) {
      error.value = err.message || 'Failed to fetch blogs by tag'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchRelatedBlogs = async (blogId, limit = 5) => {
    try {
      const response = await blogAPI.getRelatedBlogs(blogId, limit)
      return response.data
    } catch (err) {
      console.error('Failed to fetch related blogs:', err)
      return []
    }
  }

  const incrementViews = async (blogId) => {
    try {
      await blogAPI.incrementViews(blogId)
      
      // Update view count in current blog
      if (currentBlog.value?.id === blogId) {
        currentBlog.value.views = (currentBlog.value.views || 0) + 1
      }
      
      // Update view count in blogs list
      const blog = blogs.value.find(b => b.id === blogId)
      if (blog) {
        blog.views = (blog.views || 0) + 1
      }
    } catch (err) {
      console.error('Failed to increment views:', err)
    }
  }

  const toggleLike = async (blogId) => {
    try {
      const response = await blogAPI.toggleLike(blogId)
      
      // Update like status in current blog
      if (currentBlog.value?.id === blogId) {
        currentBlog.value.is_liked = response.data.is_liked
        currentBlog.value.likes_count = response.data.likes_count
      }
      
      // Update like status in blogs list
      const blog = blogs.value.find(b => b.id === blogId)
      if (blog) {
        blog.is_liked = response.data.is_liked
        blog.likes_count = response.data.likes_count
      }
      
      return response
    } catch (err) {
      console.error('Failed to toggle like:', err)
      throw err
    }
  }

  const addComment = async (blogId, commentData) => {
    try {
      const response = await blogAPI.addComment(blogId, commentData)
      
      // Add comment to current blog
      if (currentBlog.value?.id === blogId) {
        if (!currentBlog.value.comments) {
          currentBlog.value.comments = []
        }
        currentBlog.value.comments.unshift(response.data)
        currentBlog.value.comments_count = (currentBlog.value.comments_count || 0) + 1
      }
      
      return response
    } catch (err) {
      error.value = err.message || 'Failed to add comment'
      throw err
    }
  }

  const fetchComments = async (blogId, params = {}) => {
    try {
      const response = await blogAPI.getComments(blogId, params)
      return response.data
    } catch (err) {
      console.error('Failed to fetch comments:', err)
      return []
    }
  }

  const deleteComment = async (blogId, commentId) => {
    try {
      await blogAPI.deleteComment(blogId, commentId)
      
      // Remove comment from current blog
      if (currentBlog.value?.id === blogId) {
        const index = currentBlog.value.comments?.findIndex(c => c.id === commentId)
        if (index !== -1) {
          currentBlog.value.comments.splice(index, 1)
          currentBlog.value.comments_count = Math.max(0, (currentBlog.value.comments_count || 0) - 1)
        }
      }
    } catch (err) {
      error.value = err.message || 'Failed to delete comment'
      throw err
    }
  }

  const publishBlog = async (blogId) => {
    try {
      const response = await blogAPI.publishBlog(blogId)
      
      // Update blog status
      const blog = blogs.value.find(b => b.id === blogId)
      if (blog) {
        blog.status = 'published'
        blog.published_at = response.data.published_at
      }
      
      if (currentBlog.value?.id === blogId) {
        currentBlog.value.status = 'published'
        currentBlog.value.published_at = response.data.published_at
      }
      
      return response
    } catch (err) {
      error.value = err.message || 'Failed to publish blog'
      throw err
    }
  }

  const unpublishBlog = async (blogId) => {
    try {
      const response = await blogAPI.unpublishBlog(blogId)
      
      // Update blog status
      const blog = blogs.value.find(b => b.id === blogId)
      if (blog) {
        blog.status = 'draft'
        blog.published_at = null
      }
      
      if (currentBlog.value?.id === blogId) {
        currentBlog.value.status = 'draft'
        currentBlog.value.published_at = null
      }
      
      return response
    } catch (err) {
      error.value = err.message || 'Failed to unpublish blog'
      throw err
    }
  }

  const archiveBlog = async (blogId) => {
    try {
      const response = await blogAPI.archiveBlog(blogId)
      
      // Remove from blogs list
      const index = blogs.value.findIndex(blog => blog.id === blogId)
      if (index !== -1) {
        blogs.value.splice(index, 1)
        pagination.value.total -= 1
      }
      
      // Clear current blog if it's the same
      if (currentBlog.value?.id === blogId) {
        currentBlog.value = null
      }
      
      return response
    } catch (err) {
      error.value = err.message || 'Failed to archive blog'
      throw err
    }
  }

  const setPage = (page) => {
    pagination.value.current_page = page
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.current_page = 1 // Reset to first page when filters change
  }

  const clearFilters = () => {
    filters.value = {
      search: '',
      category: '',
      status: '',
      sort_by: 'created_at',
      sort_order: 'desc'
    }
    pagination.value.current_page = 1
  }

  const clearBlogs = () => {
    blogs.value = []
    currentBlog.value = null
    pagination.value = {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
      from: 0,
      to: 0
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    blogs,
    currentBlog,
    categories,
    tags,
    isLoading,
    error,
    pagination,
    filters,
    
    // Getters
    hasBlogs,
    totalBlogs,
    currentPage,
    lastPage,
    hasNextPage,
    hasPrevPage,
    isFirstPage,
    isLastPage,
    
    // Actions
    fetchBlogs,
    fetchBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    uploadImage,
    searchBlogs,
    fetchCategories,
    fetchTags,
    createCategory,
    updateCategory,
    deleteCategory,
    createTag,
    updateTag,
    deleteTag,
    fetchStats,
    fetchBlogsByCategory,
    fetchBlogsByTag,
    fetchRelatedBlogs,
    incrementViews,
    toggleLike,
    addComment,
    fetchComments,
    deleteComment,
    publishBlog,
    unpublishBlog,
    archiveBlog,
    setPage,
    setFilters,
    clearFilters,
    clearBlogs,
    clearError
  }
})
