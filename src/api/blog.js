import { api } from './axiosInstance'
import { API_CONFIG } from '@/utils/constants'

/**
 * Blog API Service
 */
export const blogAPI = {
  /**
   * Get blogs list with pagination and filters
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.per_page - Items per page
   * @param {string} params.search - Search query
   * @param {string} params.category - Category filter
   * @param {string} params.status - Status filter (draft, published, archived)
   * @param {string} params.sort_by - Sort field (created_at, updated_at, title, views)
   * @param {string} params.sort_order - Sort order (asc, desc)
   * @returns {Promise<Object>} Blogs list with pagination
   */
  getBlogs: async (params = {}) => {
    const response = await api.get(API_CONFIG.ENDPOINTS.BLOG.LIST, { params })
    return response.data
  },

  /**
   * Get blog by ID
   * @param {string|number} id - Blog ID
   * @returns {Promise<Object>} Blog details
   */
  getBlog: async (id) => {
    const response = await api.get(API_CONFIG.ENDPOINTS.BLOG.DETAIL.replace(':id', id))
    return response.data
  },

  /**
   * Create new blog
   * @param {Object} blogData - Blog data
   * @param {string} blogData.title - Blog title
   * @param {string} blogData.content - Blog content
   * @param {string} blogData.excerpt - Blog excerpt
   * @param {string} blogData.category - Blog category
   * @param {Array} blogData.tags - Blog tags
   * @param {string} blogData.status - Blog status (draft, published)
   * @param {string} blogData.featured_image - Featured image URL
   * @returns {Promise<Object>} Created blog
   */
  createBlog: async (blogData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.BLOG.CREATE, blogData)
    return response.data
  },

  /**
   * Update blog
   * @param {string|number} id - Blog ID
   * @param {Object} blogData - Blog data to update
   * @returns {Promise<Object>} Updated blog
   */
  updateBlog: async (id, blogData) => {
    const response = await api.put(API_CONFIG.ENDPOINTS.BLOG.UPDATE.replace(':id', id), blogData)
    return response.data
  },

  /**
   * Delete blog
   * @param {string|number} id - Blog ID
   * @returns {Promise<Object>} Delete response
   */
  deleteBlog: async (id) => {
    const response = await api.delete(API_CONFIG.ENDPOINTS.BLOG.DELETE.replace(':id', id))
    return response.data
  },

  /**
   * Upload blog image
   * @param {File} file - Image file
   * @param {string} type - Image type (featured, content)
   * @returns {Promise<Object>} Upload response with image URL
   */
  uploadImage: async (file, type = 'featured') => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', type)
    
    const response = await api.post(API_CONFIG.ENDPOINTS.BLOG.UPLOAD, formData)
    return response.data
  },

  /**
   * Create category
   * @param {Object} categoryData - Category data
   * @returns {Promise<Object>} Created category
   */
  createCategory: async (categoryData) => {
    const response = await api.post('/blogs/categories', categoryData)
    return response.data
  },

  /**
   * Update category
   * @param {string|number} id - Category ID
   * @param {Object} categoryData - Category data to update
   * @returns {Promise<Object>} Updated category
   */
  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/blogs/categories/${id}`, categoryData)
    return response.data
  },

  /**
   * Delete category
   * @param {string|number} id - Category ID
   * @returns {Promise<Object>} Delete response
   */
  deleteCategory: async (id) => {
    const response = await api.delete(`/blogs/categories/${id}`)
    return response.data
  },

  /**
   * Create tag
   * @param {Object} tagData - Tag data
   * @returns {Promise<Object>} Created tag
   */
  createTag: async (tagData) => {
    const response = await api.post('/blogs/tags', tagData)
    return response.data
  },

  /**
   * Update tag
   * @param {string|number} id - Tag ID
   * @param {Object} tagData - Tag data to update
   * @returns {Promise<Object>} Updated tag
   */
  updateTag: async (id, tagData) => {
    const response = await api.put(`/blogs/tags/${id}`, tagData)
    return response.data
  },

  /**
   * Delete tag
   * @param {string|number} id - Tag ID
   * @returns {Promise<Object>} Delete response
   */
  deleteTag: async (id) => {
    const response = await api.delete(`/blogs/tags/${id}`)
    return response.data
  },

  /**
   * Search blogs
   * @param {Object} params - Search parameters
   * @param {string} params.q - Search query
   * @param {string} params.category - Category filter
   * @param {string} params.author - Author filter
   * @param {string} params.date_from - Date from filter
   * @param {string} params.date_to - Date to filter
   * @param {number} params.page - Page number
   * @param {number} params.per_page - Items per page
   * @returns {Promise<Object>} Search results
   */
  searchBlogs: async (params = {}) => {
    const response = await api.get(API_CONFIG.ENDPOINTS.BLOG.SEARCH, { params })
    return response.data
  },

  /**
   * Get blog categories
   * @returns {Promise<Array>} Categories list
   */
  getCategories: async () => {
    const response = await api.get('/blogs/categories')
    return response.data
  },

  /**
   * Get blog tags
   * @returns {Promise<Array>} Tags list
   */
  getTags: async () => {
    const response = await api.get('/blogs/tags')
    return response.data
  },

  /**
   * Get blogs by category
   * @param {string} category - Category slug
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Blogs by category
   */
  getBlogsByCategory: async (category, params = {}) => {
    const response = await api.get(`/blogs/category/${category}`, { params })
    return response.data
  },

  /**
   * Get blogs by tag
   * @param {string} tag - Tag slug
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Blogs by tag
   */
  getBlogsByTag: async (tag, params = {}) => {
    const response = await api.get(`/blogs/tag/${tag}`, { params })
    return response.data
  },

  /**
   * Get related blogs
   * @param {string|number} blogId - Blog ID
   * @param {number} limit - Number of related blogs
   * @returns {Promise<Array>} Related blogs
   */
  getRelatedBlogs: async (blogId, limit = 5) => {
    const response = await api.get(`/blogs/${blogId}/related`, { params: { limit } })
    return response.data
  },

  /**
   * Increment blog view count
   * @param {string|number} blogId - Blog ID
   * @returns {Promise<Object>} View count response
   */
  incrementViews: async (blogId) => {
    const response = await api.post(`/blogs/${blogId}/views`)
    return response.data
  },

  /**
   * Increment blog views
   * @param {string|number} blogId - Blog ID
   * @returns {Promise<Object>} View increment response
   */
  incrementViews: async (blogId) => {
    const response = await api.post(`/blogs/${blogId}/views`)
    return response.data
  },

  /**
   * Get related blogs
   * @param {string|number} blogId - Blog ID
   * @param {number} limit - Number of related blogs to return
   * @returns {Promise<Object>} Related blogs
   */
  getRelatedBlogs: async (blogId, limit = 6) => {
    const response = await api.get(`/blogs/${blogId}/related`, { params: { limit } })
    return response.data
  },

  /**
   * Like/unlike blog
   * @param {string|number} blogId - Blog ID
   * @returns {Promise<Object>} Like response
   */
  toggleLike: async (blogId) => {
    const response = await api.post(`/blogs/${blogId}/like`)
    return response.data
  },

  /**
   * Add comment to blog
   * @param {string|number} blogId - Blog ID
   * @param {Object} commentData - Comment data
   * @param {string} commentData.content - Comment content
   * @param {string|number} commentData.parent_id - Parent comment ID (for replies)
   * @returns {Promise<Object>} Comment response
   */
  addComment: async (blogId, commentData) => {
    const response = await api.post(`/blogs/${blogId}/comments`, commentData)
    return response.data
  },

  /**
   * Get blog comments
   * @param {string|number} blogId - Blog ID
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Comments list
   */
  getComments: async (blogId, params = {}) => {
    const response = await api.get(`/blogs/${blogId}/comments`, { params })
    return response.data
  },

  /**
   * Delete comment
   * @param {string|number} blogId - Blog ID
   * @param {string|number} commentId - Comment ID
   * @returns {Promise<Object>} Delete response
   */
  deleteComment: async (blogId, commentId) => {
    const response = await api.delete(`/blogs/${blogId}/comments/${commentId}`)
    return response.data
  },

  /**
   * Get blog statistics
   * @param {string|number} blogId - Blog ID
   * @returns {Promise<Object>} Blog statistics
   */
  getBlogStats: async (blogId) => {
    const response = await api.get(`/blogs/${blogId}/stats`)
    return response.data
  },

  /**
   * Get overall statistics
   * @returns {Promise<Object>} Overall statistics
   */
  getStats: async () => {
    const response = await api.get('/stats')
    return response.data
  },

  /**
   * Get user's blogs
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} User's blogs
   */
  getMyBlogs: async (params = {}) => {
    const response = await api.get('/blogs/my-blogs', { params })
    return response.data
  },

  /**
   * Publish blog
   * @param {string|number} blogId - Blog ID
   * @returns {Promise<Object>} Publish response
   */
  publishBlog: async (blogId) => {
    const response = await api.patch(`/blogs/${blogId}/publish`)
    return response.data
  },

  /**
   * Unpublish blog
   * @param {string|number} blogId - Blog ID
   * @returns {Promise<Object>} Unpublish response
   */
  unpublishBlog: async (blogId) => {
    const response = await api.patch(`/blogs/${blogId}/unpublish`)
    return response.data
  },

  /**
   * Archive blog
   * @param {string|number} blogId - Blog ID
   * @returns {Promise<Object>} Archive response
   */
  archiveBlog: async (blogId) => {
    const response = await api.patch(`/blogs/${blogId}/archive`)
    return response.data
  }
}

export default blogAPI
