import api from './axiosInstance';
import { API_CONFIG } from '@/utils/constants';

const E = API_CONFIG.ENDPOINTS;

export const listBlogs = (params = {}) =>
  api.get(E.BLOG.LIST, { params });

export const getBlog = (id) =>
  api.get(E.BLOG.DETAIL.replace(':id', id));

export const createBlog = (payload) =>
  api.post(E.BLOG.CREATE, payload);

export const updateBlog = (id, payload) =>
  api.put(E.BLOG.UPDATE.replace(':id', id), payload);

export const deleteBlog = (id) =>
  api.delete(E.BLOG.DELETE.replace(':id', id));

export const uploadFile = (formData) =>
  api.post(E.BLOG.UPLOAD, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getCategories = () =>
  api.get(E.BLOG.CATEGORIES);

export const getTags = () =>
  api.get(E.BLOG.TAGS);

export const getStats = () =>
  api.get(E.STATS);

export const blogAPI = {
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadFile,
  getCategories,
  getTags,
  getStats,
};
export default blogAPI;
