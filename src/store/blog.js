import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import blogAPI from '@/api/blog';

const defaultStats = () => ({
  blogs: { total: 0, published: 0, draft: 0 },
  users: { total: 0 },
  latest: { blogs: [] },
});

export const useBlogStore = defineStore('blog', () => {
  const items = ref([]);                 // danh sách bài viết
  const categories = ref([]);            // danh mục
  const tags = ref([]);                  // tags
  const stats = ref(defaultStats());     // thống kê

  const isLoading = ref(false);
  const error = ref(null);

  const filters = reactive({
    keyword: '',
    category_id: null,
    tag_id: null,
    sort: 'latest',
  });

  const pagination = reactive({
    current_page: 1,
    per_page: 9,
    total: 0,
    total_pages: 0,
  });

  const hasPrev = computed(() => pagination.current_page > 1);
  const hasNext = computed(() => pagination.current_page < (pagination.total_pages || 1));

  const setPage = (p) => (pagination.current_page = Math.max(1, Number(p || 1)));
  const setPerPage = (n) => (pagination.per_page = Math.max(1, Number(n || 9)));
  const clearFilters = () => {
    filters.keyword = '';
    filters.category_id = null;
    filters.tag_id = null;
    filters.sort = 'latest';
    setPage(1);
  };

  const fetchBlogs = async () => {
    isLoading.value = true; error.value = null;
    try {
      const res = await blogAPI.listBlogs({
        page: pagination.current_page,
        limit: pagination.per_page,
        search: filters.keyword || undefined,
        category_id: filters.category_id || undefined,
        tag_id: filters.tag_id || undefined,
        sort_by: 'created_at',
        sort_order: 'desc',
        status: 'published',
      });

      // Chuẩn hóa payload
      const payload = res?.data?.data ?? res?.data ?? {};
      const list = payload.items ?? payload ?? [];
      items.value = Array.isArray(list) ? list : [];

      const p = payload.pagination ?? payload ?? {};
      pagination.current_page = Number(p.current_page ?? p.page ?? 1);
      pagination.per_page    = Number(p.per_page ?? p.limit ?? 9);
      pagination.total       = Number(p.total ?? list.length ?? 0);
      pagination.total_pages = Number(p.total_pages ?? Math.max(1, Math.ceil(pagination.total / pagination.per_page)));

      return items.value;
    } catch (e) {
      console.error('[blog.fetchBlogs]', e);
      error.value = e?.message || 'Failed to load blogs';
      items.value = [];
      pagination.current_page = 1;
      pagination.total = 0;
      pagination.total_pages = 1;
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const fetchStats = async () => {
    try {
      const r = await blogAPI.getStats();
      const s = r?.data?.data ?? r?.data ?? null;
      stats.value = {
        blogs: {
          total: Number(s?.blogs?.total ?? 0),
          published: Number(s?.blogs?.published ?? 0),
          draft: Number(s?.blogs?.draft ?? 0),
        },
        users: { total: Number(s?.users?.total ?? 0) },
        latest: { blogs: Array.isArray(s?.latest?.blogs) ? s.latest.blogs : [] },
      };
    } catch {
      stats.value = defaultStats();
    }
  };

  const fetchCategories = async () => {
    try {
      const r = await blogAPI.getCategories();
      const d = r?.data?.data ?? r?.data ?? [];
      categories.value = Array.isArray(d) ? d : [];
    } catch { categories.value = []; }
  };

  const fetchTags = async () => {
    try {
      const r = await blogAPI.getTags();
      const d = r?.data?.data ?? r?.data ?? [];
      tags.value = Array.isArray(d) ? d : [];
    } catch { tags.value = []; }
  };

  return {
    items, categories, tags, stats,
    isLoading, error, filters, pagination, hasPrev, hasNext,
    setPage, setPerPage, clearFilters,
    fetchBlogs, fetchCategories, fetchTags, fetchStats,
  };
});
