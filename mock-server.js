import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Simple mock data
const blogs = [
  {
    id: 1,
    title: 'Getting Started with Vue 3',
    slug: 'getting-started-with-vue-3',
    excerpt: 'Learn the basics of Vue 3 and Composition API',
    content: 'Vue 3 is the latest version of Vue.js...',
    author: { id: 1, name: 'John Doe', avatar: null },
    category: { id: 1, name: 'Tutorial', slug: 'tutorial' },
    tags: [{ id: 1, name: 'vue', slug: 'vue' }, { id: 2, name: 'javascript', slug: 'javascript' }],
    featured_image: null,
    views: 1250,
    likes_count: 89,
    comments_count: 23,
    status: 'published',
    is_featured: true,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-20T14:45:00Z'
  },
  {
    id: 2,
    title: 'Advanced State Management with Pinia',
    slug: 'advanced-state-management-with-pinia',
    excerpt: 'Discover how to build scalable applications with Pinia',
    content: 'Pinia is the official state management library for Vue 3...',
    author: { id: 2, name: 'Cuc Xac', avatar: null },
    category: { id: 1, name: 'Tutorial', slug: 'tutorial' },
    tags: [{ id: 1, name: 'vue', slug: 'vue' }, { id: 5, name: 'pinia', slug: 'pinia' }],
    featured_image: null,
    views: 890,
    likes_count: 67,
    comments_count: 15,
    status: 'published',
    is_featured: true,
    created_at: '2024-01-18T09:15:00Z',
    updated_at: '2024-01-22T11:20:00Z'
  }
];

const categories = [
  { id: 1, name: 'Tutorial', slug: 'tutorial' },
  { id: 2, name: 'News', slug: 'news' },
  { id: 3, name: 'Tips', slug: 'tips' }
];

const tags = [
  { id: 1, name: 'vue', slug: 'vue' },
  { id: 2, name: 'javascript', slug: 'javascript' },
  { id: 3, name: 'tutorial', slug: 'tutorial' },
  { id: 4, name: 'frontend', slug: 'frontend' },
  { id: 5, name: 'pinia', slug: 'pinia' }
];

// Helper function to find blog by ID or slug
const findBlogByIdOrSlug = (identifier) => {
  // Try to find by ID first (numeric)
  let blog = blogs.find(b => b.id === parseInt(identifier));
  
  // If not found by ID, try to find by slug
  if (!blog) {
    blog = blogs.find(b => b.slug === identifier);
  }
  
  return blog;
};

// Helper function to find blog index by ID or slug
const findBlogIndexByIdOrSlug = (identifier) => {
  // Try to find by ID first (numeric)
  let index = blogs.findIndex(b => b.id === parseInt(identifier));
  
  // If not found by ID, try to find by slug
  if (index === -1) {
    index = blogs.findIndex(b => b.slug === identifier);
  }
  
  return index;
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mock server is running' });
});

// Stats endpoint
app.get('/api/stats', (req, res, next) => {
  try {
    const stats = {
      blogs: blogs.length,
      categories: categories.length,
      tags: tags.length,
      users: 2, // Mock data
      comments: 38, // Total comments from all blogs
      views: 2140, // Total views from all blogs
      today_views: 156,
      week_views: 892,
      month_views: 2140
    };
    res.json({ data: stats });
  } catch (err) {
    next(err);
  }
});

// Dashboard analytics
app.get('/api/dashboard/analytics', (req, res) => {
  const { period = '7D' } = req.query;
  
  // Mock analytics data
  const analytics = {
    views_chart: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Views',
        data: [120, 190, 300, 500, 200, 300, 450],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }]
    },
    category_distribution: {
      labels: ['Tutorial', 'News', 'Tips'],
      datasets: [{
        data: [65, 20, 15],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B']
      }]
    },
    recent_activity: {
      blogs: blogs.slice(0, 5).map(blog => ({
        id: blog.id,
        title: blog.title,
        author: blog.author.name,
        created_at: blog.created_at,
        status: blog.status,
        views: blog.views
      })),
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com', created_at: '2024-01-20T10:30:00Z' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', created_at: '2024-01-19T14:20:00Z' }
      ]
    }
  };
  
  res.json({ data: analytics });
});

// Dashboard alerts
app.get('/api/dashboard/alerts', (req, res) => {
  const alerts = [
    {
      id: 1,
      type: 'info',
      title: 'System Update',
      message: 'New features have been deployed. Check out the latest improvements!',
      created_at: new Date().toISOString(),
      actions: [
        { label: 'Learn More', primary: true },
        { label: 'Dismiss', primary: false }
      ]
    },
    {
      id: 2,
      type: 'warning',
      title: 'Storage Warning',
      message: 'You are using 85% of your storage space. Consider cleaning up unused files.',
      created_at: new Date().toISOString(),
      actions: [
        { label: 'Clean Up', primary: true },
        { label: 'Upgrade Plan', primary: false }
      ]
    }
  ];
  
  res.json({ data: alerts });
});

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
  res.status(201).json({
    message: 'User registered successfully',
    user: { id: 1, name: 'Test User', email: 'test@example.com' },
    access_token: 'mock_token',
    refresh_token: 'mock_refresh_token'
  });
});

app.post('/api/auth/login', (req, res) => {
  res.json({
    message: 'Login successful',
    user: { id: 1, name: 'Test User', email: 'test@example.com' },
    access_token: 'mock_token',
    refresh_token: 'mock_refresh_token'
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/auth/profile', (req, res) => {
  res.json({
    user: { id: 1, name: 'Test User', email: 'test@example.com', avatar: null, bio: 'Test bio' }
  });
});

// Categories
app.get('/api/blogs/categories', (req, res, next) => {
  try {
    res.json({ data: categories });
  } catch (err) {
    next(err);
  }
});

// Tags
app.get('/api/blogs/tags', (req, res, next) => {
  try {
    res.json({ data: tags });
  } catch (err) {
    next(err);
  }
});

// Upload
app.post('/api/blogs/upload', (req, res) => {
  res.json({
    message: 'File uploaded successfully',
    data: { url: 'https://via.placeholder.com/800x400', filename: 'test.jpg', size: 1024000 }
  });
});

// Search
app.get('/api/blogs/search', (req, res) => {
  res.json({
    data: blogs,
    meta: { total: blogs.length, per_page: 10 }
  });
});

// Get user's blogs
app.get('/api/blogs/my-blogs', (req, res) => {
  const { page = 1, per_page = 10, status = '' } = req.query;
  const userBlogs = blogs.filter(blog => blog.author.id === 1); // Mock user ID
  
  let filteredBlogs = [...userBlogs];
  if (status) {
    filteredBlogs = filteredBlogs.filter(blog => blog.status === status);
  }
  
  const startIndex = (page - 1) * per_page;
  const endIndex = startIndex + parseInt(per_page);
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);
  
  res.json({
    data: paginatedBlogs,
    meta: {
      current_page: parseInt(page),
      last_page: Math.ceil(filteredBlogs.length / per_page),
      per_page: parseInt(per_page),
      total: filteredBlogs.length,
      from: filteredBlogs.length > 0 ? startIndex + 1 : 0,
      to: Math.min(endIndex, filteredBlogs.length)
    }
  });
});

// Blogs list
app.get('/api/blogs', (req, res) => {
  try {
    // Sanitize query parameters
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const perPage = Math.min(Math.max(parseInt(req.query.per_page) || 10, 1), 100);
    
    const search = (req.query.search || '').trim();
    const category = (req.query.category || '').trim();
    const status = (req.query.status || '').trim();
    
    // Safe sort parameters
    const SAFE_SORT_BY = new Set(['created_at', 'updated_at', 'title', 'views', 'likes_count', 'comments_count']);
    const SAFE_SORT_ORDER = new Set(['asc', 'desc']);
    
    const sortBy = SAFE_SORT_BY.has(req.query.sort_by) ? req.query.sort_by : 'created_at';
    const sortOrder = SAFE_SORT_ORDER.has((req.query.sort_order || '').toLowerCase())
      ? req.query.sort_order.toLowerCase()
      : 'desc';
    
    // Filter blogs based on search, category, status
    let filteredBlogs = [...blogs];
    
    if (search) {
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        blog.content.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category) {
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.category.slug === category || blog.category.name.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    if (status) {
      filteredBlogs = filteredBlogs.filter(blog => blog.status === status);
    }
    
    // Sort blogs
    filteredBlogs.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Handle nested properties
      if (sortBy === 'author') {
        aValue = a.author.name;
        bValue = b.author.name;
      } else if (sortBy === 'category') {
        aValue = a.category.name;
        bValue = b.category.name;
      }
      
      // Handle date sorting
      if (sortBy.includes('_at')) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    // Pagination
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);
    
    res.json({
      data: paginatedBlogs,
      meta: {
        current_page: page,
        last_page: Math.ceil(filteredBlogs.length / perPage),
        per_page: perPage,
        total: filteredBlogs.length,
        from: filteredBlogs.length > 0 ? startIndex + 1 : 0,
        to: Math.min(endIndex, filteredBlogs.length)
      }
    });
  } catch (error) {
    console.error('Error in /api/blogs:', error);
    error.status = 500;
    next(error);
  }
});

// Blog detail
app.get('/api/blogs/:id', (req, res) => {
  const blog = findBlogByIdOrSlug(req.params.id);
  
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  
  res.json({ data: blog });
});

// Create blog
app.post('/api/blogs', (req, res) => {
  // Generate unique slug
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  const generateUniqueSlug = (title) => {
    let slug = generateSlug(title)
    let uniqueSlug = slug
    let counter = 1

    while (blogs.some(blog => blog.slug === uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`
      counter++
    }

    return uniqueSlug
  }

  const newBlog = {
    id: blogs.length + 1,
    title: req.body.title || 'New Blog',
    slug: generateUniqueSlug(req.body.title || 'New Blog'),
    excerpt: req.body.excerpt || '',
    content: req.body.content || '',
    author: { id: 1, name: 'Test User', avatar: null },
    category: categories.find(c => c.id === req.body.category_id) || categories[0],
    tags: req.body.tags || [],
    featured_image: req.body.featured_image || null,
    meta_title: req.body.meta_title || '',
    meta_description: req.body.meta_description || '',
    allow_comments: req.body.allow_comments !== false,
    is_featured: req.body.is_featured || false,
    status: req.body.status || 'draft',
    views: 0,
    likes_count: 0,
    comments_count: 0,
    is_liked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: req.body.status === 'published' ? new Date().toISOString() : null
  };
  
  blogs.push(newBlog);
  
  res.status(201).json({
    message: 'Blog created successfully',
    data: newBlog
  });
});

// Update blog
app.put('/api/blogs/:id', (req, res) => {
  const blogIndex = findBlogIndexByIdOrSlug(req.params.id);
  
  if (blogIndex === -1) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  // Generate unique slug if title changed
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  const generateUniqueSlug = (title, currentId) => {
    let slug = generateSlug(title)
    let uniqueSlug = slug
    let counter = 1

    while (blogs.some(blog => blog.slug === uniqueSlug && blog.id !== currentId)) {
      uniqueSlug = `${slug}-${counter}`
      counter++
    }

    return uniqueSlug
  }

  const currentBlog = blogs[blogIndex]
  const titleChanged = req.body.title && req.body.title !== currentBlog.title
  
  const updateData = {
    ...req.body,
    updated_at: new Date().toISOString()
  }

  // Generate new slug if title changed
  if (titleChanged) {
    updateData.slug = generateUniqueSlug(req.body.title, currentBlog.id)
  }

  // Update published_at if status changed to published
  if (req.body.status === 'published' && currentBlog.status !== 'published') {
    updateData.published_at = new Date().toISOString()
  } else if (req.body.status !== 'published') {
    updateData.published_at = null
  }

  // Update category if category_id provided
  if (req.body.category_id) {
    updateData.category = categories.find(c => c.id === req.body.category_id) || currentBlog.category
  }

  const updatedBlog = { ...currentBlog, ...updateData }
  blogs[blogIndex] = updatedBlog;
  
  res.json({
    message: 'Blog updated successfully',
    data: updatedBlog
  });
});

// Delete blog
app.delete('/api/blogs/:id', (req, res) => {
  const blogIndex = findBlogIndexByIdOrSlug(req.params.id);
  
  if (blogIndex === -1) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  
  blogs.splice(blogIndex, 1);
  
  res.json({ message: 'Blog deleted successfully' });
});

// Increment views
app.post('/api/blogs/:id/views', (req, res) => {
  const blogIndex = findBlogIndexByIdOrSlug(req.params.id);
  
  if (blogIndex === -1) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  
  blogs[blogIndex].views += 1;
  
  res.json({
    message: 'View count updated',
    data: { views: blogs[blogIndex].views }
  });
});

// Related blogs
app.get('/api/blogs/:id/related', (req, res) => {
  const { limit = 6 } = req.query;
  const currentBlog = findBlogByIdOrSlug(req.params.id);
  
  if (!currentBlog) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  
  const relatedBlogs = blogs
    .filter(blog => blog.id !== currentBlog.id)
    .slice(0, parseInt(limit));
  
  res.json({
    data: relatedBlogs,
    meta: { total: relatedBlogs.length, limit: parseInt(limit) }
  });
});

// Publish blog
app.patch('/api/blogs/:id/publish', (req, res) => {
  const blogIndex = findBlogIndexByIdOrSlug(req.params.id);
  
  if (blogIndex === -1) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  
  blogs[blogIndex].status = 'published';
  blogs[blogIndex].updated_at = new Date().toISOString();
  
  res.json({
    message: 'Blog published successfully',
    data: blogs[blogIndex]
  });
});

// Unpublish blog
app.patch('/api/blogs/:id/unpublish', (req, res) => {
  const blogIndex = findBlogIndexByIdOrSlug(req.params.id);
  
  if (blogIndex === -1) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  
  blogs[blogIndex].status = 'draft';
  blogs[blogIndex].updated_at = new Date().toISOString();
  
  res.json({
    message: 'Blog unpublished successfully',
    data: blogs[blogIndex]
  });
});

// Archive blog
app.patch('/api/blogs/:id/archive', (req, res) => {
  const blogIndex = findBlogIndexByIdOrSlug(req.params.id);
  
  if (blogIndex === -1) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  
  blogs[blogIndex].status = 'archived';
  blogs[blogIndex].updated_at = new Date().toISOString();
  
  res.json({
    message: 'Blog archived successfully',
    data: blogs[blogIndex]
  });
});



// Blog comments
app.get('/api/blogs/:id/comments', (req, res) => {
  const blog = findBlogByIdOrSlug(req.params.id);
  
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  
  const blogId = blog.id;
  
  // Mock comments
  const comments = [
    {
      id: 1,
      blog_id: blogId,
      user: { id: 1, name: 'John Doe', avatar: null },
      content: 'Great article! Very informative.',
      created_at: '2024-01-20T10:30:00Z',
      updated_at: '2024-01-20T10:30:00Z'
    },
    {
      id: 2,
      blog_id: blogId,
      user: { id: 2, name: 'Jane Smith', avatar: null },
      content: 'Thanks for sharing this knowledge.',
      created_at: '2024-01-21T14:20:00Z',
      updated_at: '2024-01-21T14:20:00Z'
    }
  ];
  
  res.json({
    data: comments,
    meta: { total: comments.length }
  });
});

app.post('/api/blogs/:id/comments', (req, res) => {
  const blog = findBlogByIdOrSlug(req.params.id);
  
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  
  const blogId = blog.id;
  
  const newComment = {
    id: Date.now(),
    blog_id: blogId,
    user: { id: 1, name: 'Current User', avatar: null },
    content: req.body.content,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  res.status(201).json({
    message: 'Comment added successfully',
    data: newComment
  });
});

app.delete('/api/blogs/:id/comments/:commentId', (req, res) => {
  const commentId = parseInt(req.params.commentId);
  
  const blog = findBlogByIdOrSlug(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  
  res.json({ message: 'Comment deleted successfully' });
});

// Auth refresh token
app.post('/api/auth/refresh', (req, res) => {
  const { refresh_token } = req.body;
  
  if (!refresh_token) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }
  
  res.json({
    access_token: 'new_mock_token',
    refresh_token: 'new_mock_refresh_token',
    expires_in: 3600
  });
});

// Change password
app.post('/api/auth/change-password', (req, res) => {
  const { current_password, new_password } = req.body;
  
  if (!current_password || !new_password) {
    return res.status(400).json({ message: 'Current and new password are required' });
  }
  
  res.json({ message: 'Password changed successfully' });
});

// Forgot password
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  
  res.json({ message: 'Password reset link sent to your email' });
});

// Reset password
app.post('/api/auth/reset-password', (req, res) => {
  const { token, password, password_confirmation } = req.body;
  
  if (!token || !password || !password_confirmation) {
    return res.status(400).json({ message: 'Token, password and confirmation are required' });
  }
  
  if (password !== password_confirmation) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  
  res.json({ message: 'Password reset successfully' });
});

// Verify email
app.post('/api/auth/verify-email', (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(400).json({ message: 'Verification token is required' });
  }
  
  res.json({ message: 'Email verified successfully' });
});

// Resend verification
app.post('/api/auth/resend-verification', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  
  res.json({ message: 'Verification email sent' });
});

// User endpoints
app.get('/api/users/profile', (req, res) => {
  const user = {
    id: 1,
    username: 'johndoe',
    email: 'john@example.com',
    fullName: 'John Doe',
    phone: '+84 123 456 789',
    bio: 'Lập trình viên full-stack với 5 năm kinh nghiệm trong phát triển web.',
    location: 'Hà Nội, Việt Nam',
    website: 'https://johndoe.dev',
    avatar: 'https://via.placeholder.com/150',
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    role: 'user',
    emailVerified: true,
    lastLoginAt: '2024-01-15T08:00:00Z'
  };
  res.json({ data: user });
});

app.put('/api/users/update', (req, res) => {
  const { fullName, username, phone, bio, location, website } = req.body;
  
  // Mock update - in real app, this would update the database
  const updatedUser = {
    id: 1,
    username: username || 'johndoe',
    email: 'john@example.com',
    fullName: fullName || 'John Doe',
    phone: phone || '+84 123 456 789',
    bio: bio || 'Lập trình viên full-stack với 5 năm kinh nghiệm trong phát triển web.',
    location: location || 'Hà Nội, Việt Nam',
    website: website || 'https://johndoe.dev',
    avatar: 'https://via.placeholder.com/150',
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: new Date().toISOString(),
    role: 'user',
    emailVerified: true,
    lastLoginAt: '2024-01-15T08:00:00Z'
  };
  
  res.json({ 
    message: 'Profile updated successfully',
    data: updatedUser 
  });
});

app.post('/api/users/avatar', (req, res) => {
  // Mock avatar upload - in real app, this would handle file upload
  res.json({
    message: 'Avatar uploaded successfully',
    data: {
      avatar: 'https://via.placeholder.com/150',
      filename: 'avatar.jpg',
      size: 512000
    }
  });
});

app.get('/api/users/stats', (req, res) => {
  const stats = {
    totalPosts: 15,
    postsThisMonth: 3,
    totalViews: 12500,
    viewsThisMonth: 1200,
    totalComments: 45,
    commentsThisMonth: 8,
    memberSince: '2023-01-15T00:00:00Z',
    lastActivity: '2024-01-15T10:30:00Z',
    averageViewsPerPost: 833,
    topPost: {
      id: 1,
      title: 'Hướng dẫn Vue 3 Composition API',
      views: 2500
    }
  };
  res.json({ data: stats });
});

app.get('/api/users/activity', (req, res) => {
  const activities = [
    {
      id: 1,
      type: 'post',
      title: 'Hướng dẫn Vue 3 Composition API',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      type: 'comment',
      title: 'Bình luận về bài viết "React vs Vue"',
      createdAt: '2024-01-14T15:30:00Z'
    },
    {
      id: 3,
      type: 'view',
      title: 'Xem bài viết "JavaScript ES6 Features"',
      createdAt: '2024-01-14T12:00:00Z'
    },
    {
      id: 4,
      type: 'post',
      title: 'TypeScript Best Practices',
      createdAt: '2024-01-13T09:15:00Z'
    },
    {
      id: 5,
      type: 'comment',
      title: 'Bình luận về bài viết "CSS Grid Layout"',
      createdAt: '2024-01-12T16:45:00Z'
    }
  ];
  res.json({ data: activities });
});

app.get('/api/users/comments', (req, res) => {
  const { page = 1, per_page = 10 } = req.query;
  
  const comments = [
    {
      id: 1,
      content: 'Bài viết rất hay và hữu ích!',
      blog: {
        id: 1,
        title: 'Hướng dẫn Vue 3 Composition API'
      },
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      content: 'Cảm ơn bạn đã chia sẻ kiến thức này.',
      blog: {
        id: 2,
        title: 'React vs Vue: So sánh chi tiết'
      },
      createdAt: '2024-01-14T15:30:00Z'
    }
  ];
  
  const startIndex = (page - 1) * per_page;
  const endIndex = startIndex + parseInt(per_page);
  const paginatedComments = comments.slice(startIndex, endIndex);
  
  res.json({
    data: paginatedComments,
    meta: {
      current_page: parseInt(page),
      last_page: Math.ceil(comments.length / per_page),
      per_page: parseInt(per_page),
      total: comments.length
    }
  });
});

app.delete('/api/users/account', (req, res) => {
  res.json({
    message: 'Account deletion request submitted successfully',
    data: {
      scheduledFor: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      canCancel: true
    }
  });
});

app.get('/api/users/export', (req, res) => {
  // Mock data export - in real app, this would generate a file
  const exportData = {
    profile: {
      username: 'johndoe',
      email: 'john@example.com',
      fullName: 'John Doe',
      bio: 'Lập trình viên full-stack với 5 năm kinh nghiệm trong phát triển web.',
      location: 'Hà Nội, Việt Nam',
      website: 'https://johndoe.dev',
      memberSince: '2023-01-15T00:00:00Z'
    },
    posts: blogs.filter(blog => blog.author.id === 1),
    comments: [
      {
        id: 1,
        content: 'Bài viết rất hay và hữu ích!',
        blogTitle: 'Hướng dẫn Vue 3 Composition API',
        createdAt: '2024-01-15T10:00:00Z'
      }
    ],
    stats: {
      totalPosts: 15,
      totalViews: 12500,
      totalComments: 45
    }
  };
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="user-data.json"');
  res.json(exportData);
});

// Enhanced image upload endpoint
app.post('/api/blogs/upload', (req, res) => {
  // Mock image upload - in real app, this would handle file upload
  const { type = 'featured' } = req.body;
  
  // Simulate processing time
  setTimeout(() => {
    const mockImageUrl = `https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=${encodeURIComponent('Uploaded Image')}`;
    
    res.json({
      message: 'Image uploaded successfully',
      data: {
        url: mockImageUrl,
        filename: `image-${Date.now()}.jpg`,
        size: Math.floor(Math.random() * 500000) + 100000, // 100KB - 600KB
        dimensions: {
          width: 800,
          height: 400
        },
        type: type,
        uploaded_at: new Date().toISOString()
      }
    });
  }, 1000);
});

// Category and tag management endpoints
app.post('/api/blogs/categories', (req, res) => {
  const { name, slug, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }
  
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }
  
  const generateUniqueSlug = (text) => {
    let slug = generateSlug(text)
    let uniqueSlug = slug
    let counter = 1

    while (categories.some(cat => cat.slug === uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`
      counter++
    }

    return uniqueSlug
  }
  
  const newCategory = {
    id: categories.length + 1,
    name: name.trim(),
    slug: slug || generateUniqueSlug(name),
    description: description || '',
    posts_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  categories.push(newCategory);
  
  res.status(201).json({
    message: 'Category created successfully',
    data: newCategory
  });
});

app.put('/api/blogs/categories/:id', (req, res) => {
  const categoryIndex = categories.findIndex(c => c.id === parseInt(req.params.id));
  
  if (categoryIndex === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }
  
  const { name, slug, description } = req.body;
  
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }
  
  const generateUniqueSlug = (text, currentId) => {
    let slug = generateSlug(text)
    let uniqueSlug = slug
    let counter = 1

    while (categories.some(cat => cat.slug === uniqueSlug && cat.id !== currentId)) {
      uniqueSlug = `${slug}-${counter}`
      counter++
    }

    return uniqueSlug
  }
  
  const updatedCategory = {
    ...categories[categoryIndex],
    name: name || categories[categoryIndex].name,
    slug: slug || generateUniqueSlug(name || categories[categoryIndex].name, categories[categoryIndex].id),
    description: description || categories[categoryIndex].description,
    updated_at: new Date().toISOString()
  };
  
  categories[categoryIndex] = updatedCategory;
  
  res.json({
    message: 'Category updated successfully',
    data: updatedCategory
  });
});

app.delete('/api/blogs/categories/:id', (req, res) => {
  const categoryIndex = categories.findIndex(c => c.id === parseInt(req.params.id));
  
  if (categoryIndex === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }
  
  // Check if category has posts
  const postsInCategory = blogs.filter(blog => blog.category?.id === parseInt(req.params.id));
  
  if (postsInCategory.length > 0) {
    return res.status(400).json({ 
      message: 'Cannot delete category with existing posts',
      data: { posts_count: postsInCategory.length }
    });
  }
  
  categories.splice(categoryIndex, 1);
  
  res.json({ message: 'Category deleted successfully' });
});

app.post('/api/blogs/tags', (req, res) => {
  const { name, slug, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'Tag name is required' });
  }
  
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }
  
  const generateUniqueSlug = (text) => {
    let slug = generateSlug(text)
    let uniqueSlug = slug
    let counter = 1

    while (tags.some(tag => tag.slug === uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`
      counter++
    }

    return uniqueSlug
  }
  
  const newTag = {
    id: tags.length + 1,
    name: name.trim(),
    slug: slug || generateUniqueSlug(name),
    description: description || '',
    posts_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  tags.push(newTag);
  
  res.status(201).json({
    message: 'Tag created successfully',
    data: newTag
  });
});

app.put('/api/blogs/tags/:id', (req, res) => {
  const tagIndex = tags.findIndex(t => t.id === parseInt(req.params.id));
  
  if (tagIndex === -1) {
    return res.status(404).json({ message: 'Tag not found' });
  }
  
  const { name, slug, description } = req.body;
  
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }
  
  const generateUniqueSlug = (text, currentId) => {
    let slug = generateSlug(text)
    let uniqueSlug = slug
    let counter = 1

    while (tags.some(tag => tag.slug === uniqueSlug && tag.id !== currentId)) {
      uniqueSlug = `${slug}-${counter}`
      counter++
    }

    return uniqueSlug
  }
  
  const updatedTag = {
    ...tags[tagIndex],
    name: name || tags[tagIndex].name,
    slug: slug || generateUniqueSlug(name || tags[tagIndex].name, tags[tagIndex].id),
    description: description || tags[tagIndex].description,
    updated_at: new Date().toISOString()
  };
  
  tags[tagIndex] = updatedTag;
  
  res.json({
    message: 'Tag updated successfully',
    data: updatedTag
  });
});

app.delete('/api/blogs/tags/:id', (req, res) => {
  const tagIndex = tags.findIndex(t => t.id === parseInt(req.params.id));
  
  if (tagIndex === -1) {
    return res.status(404).json({ message: 'Tag not found' });
  }
  
  tags.splice(tagIndex, 1);
  
  res.json({ message: 'Tag deleted successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 ERROR:', err.message, err.stack);
  const status = err.status || 500;
  res.status(status).json({
    status,
    message: err.message || 'Internal Server Error',
    detail: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on http://localhost:${PORT}`);
  console.log(`📝 Available endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/stats`);
  console.log(`   GET  /api/dashboard/analytics`);
  console.log(`   GET  /api/dashboard/alerts`);
  console.log(`   POST /api/auth/register`);
  console.log(`   POST /api/auth/login`);
  console.log(`   POST /api/auth/logout`);
  console.log(`   GET  /api/auth/profile`);
  console.log(`   POST /api/auth/refresh`);
  console.log(`   POST /api/auth/change-password`);
  console.log(`   POST /api/auth/forgot-password`);
  console.log(`   POST /api/auth/reset-password`);
  console.log(`   POST /api/auth/verify-email`);
  console.log(`   POST /api/auth/resend-verification`);
  console.log(`   GET  /api/users/profile`);
  console.log(`   PUT  /api/users/update`);
  console.log(`   POST /api/users/avatar`);
  console.log(`   GET  /api/users/stats`);
  console.log(`   GET  /api/users/activity`);
  console.log(`   GET  /api/users/comments`);
  console.log(`   DELETE /api/users/account`);
  console.log(`   GET  /api/users/export`);
  console.log(`   POST /api/blogs/upload`);
  console.log(`   POST /api/blogs/categories`);
  console.log(`   PUT  /api/blogs/categories/:id`);
  console.log(`   DELETE /api/blogs/categories/:id`);
  console.log(`   POST /api/blogs/tags`);
  console.log(`   PUT  /api/blogs/tags/:id`);
  console.log(`   DELETE /api/blogs/tags/:id`);
  console.log(`   GET  /api/users/stats`);
  console.log(`   GET  /api/users/activity`);
  console.log(`   GET  /api/users/comments`);
  console.log(`   DELETE /api/users/account`);
  console.log(`   GET  /api/users/export`);
  console.log(`   GET  /api/blogs`);
  console.log(`   GET  /api/blogs/categories`);
  console.log(`   GET  /api/blogs/tags`);
  console.log(`   GET  /api/blogs/search`);
  console.log(`   GET  /api/blogs/my-blogs`);
  console.log(`   POST /api/blogs/upload`);
  console.log(`   GET  /api/blogs/:id`);
  console.log(`   POST /api/blogs`);
  console.log(`   PUT  /api/blogs/:id`);
  console.log(`   DELETE /api/blogs/:id`);
  console.log(`   PATCH /api/blogs/:id/publish`);
  console.log(`   PATCH /api/blogs/:id/unpublish`);
  console.log(`   PATCH /api/blogs/:id/archive`);
  console.log(`   POST /api/blogs/:id/views`);
  console.log(`   GET  /api/blogs/:id/related`);
  console.log(`   GET  /api/blogs/:id/comments`);
  console.log(`   POST /api/blogs/:id/comments`);
  console.log(`   DELETE /api/blogs/:id/comments/:commentId`);
});
