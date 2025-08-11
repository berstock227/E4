import { ROUTE_NAMES } from '@/utils/constants'

export default [
  {
    path: '',
    name: ROUTE_NAMES.BLOG.LIST,
    component: () => import('@/views/blog/BlogList.vue'),
    meta: {
      title: 'Blogs'
    }
  },
  {
    path: 'create',
    name: ROUTE_NAMES.BLOG.CREATE,
    component: () => import('@/views/blog/BlogCreate.vue'),
    meta: {
      title: 'Create Blog',
      requiresAuth: true
    }
  },
  {
    path: ':id',
    name: ROUTE_NAMES.BLOG.DETAIL,
    component: () => import('@/views/blog/BlogDetail.vue'),
    meta: {
      title: 'Blog Detail'
    }
  },
  {
    path: ':id/edit',
    name: ROUTE_NAMES.BLOG.EDIT,
    component: () => import('@/views/blog/BlogEdit.vue'),
    meta: {
      title: 'Edit Blog',
      requiresAuth: true
    }
  },
  {
    path: 'category/:category',
    name: 'blog-category',
    component: () => import('@/views/blog/BlogCategory.vue'),
    meta: {
      title: 'Blog Category'
    }
  },
  {
    path: 'tag/:tag',
    name: 'blog-tag',
    component: () => import('@/views/blog/BlogTag.vue'),
    meta: {
      title: 'Blog Tag'
    }
  },
  {
    path: 'search',
    name: 'blog-search',
    component: () => import('@/views/blog/BlogSearch.vue'),
    meta: {
      title: 'Search Blogs'
    }
  },
  {
    path: 'manage',
    name: 'blog-management',
    component: () => import('@/views/blog/BlogManagement.vue'),
    meta: {
      title: 'Blog Management',
      requiresAuth: true
    }
  }
]
