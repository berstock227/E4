<template>
  <section class="space-y-6">
    <div class="rounded-xl bg-white border p-6">
      <h1 class="text-2xl font-semibold">Welcome 👋</h1>
      <p class="text-gray-600">Latest stats and posts below.</p>
    </div>

    <!-- Stats (dùng safeStats để không bao giờ undefined) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="rounded-lg bg-white border p-5">
        <p class="text-sm text-gray-500">Total Blogs</p>
        <p class="text-2xl font-bold">{{ safeStats.blogs.total }}</p>
      </div>
      <div class="rounded-lg bg-white border p-5">
        <p class="text-sm text-gray-500">Published</p>
        <p class="text-2xl font-bold">{{ safeStats.blogs.published }}</p>
      </div>
      <div class="rounded-lg bg-white border p-5">
        <p class="text-sm text-gray-500">Draft</p>
        <p class="text-2xl font-bold">{{ safeStats.blogs.draft }}</p>
      </div>
      <div class="rounded-lg bg-white border p-5">
        <p class="text-sm text-gray-500">Users</p>
        <p class="text-2xl font-bold">{{ safeStats.users.total }}</p>
      </div>
    </div>

    <!-- Latest posts -->
    <div class="rounded-xl bg-white border">
      <div class="px-5 py-4 border-b flex items-center justify-between">
        <h2 class="font-semibold">Latest posts</h2>
        <RouterLink to="/blog" class="text-primary-600 hover:underline">View all</RouterLink>
      </div>

      <div v-if="loading" class="p-5 text-gray-500">Loading...</div>
      <ul v-else class="divide-y">
        <li v-for="b in latestList" :key="b.id" class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium">{{ b.title || 'Untitled' }}</h3>
              <p class="text-sm text-gray-500">#{{ b.id }} • {{ b.created_at || '—' }}</p>
            </div>
            <RouterLink :to="`/blog/${b.id}`" class="text-primary-600 hover:underline">Read</RouterLink>
          </div>
        </li>
        <li v-if="!latestList.length" class="p-5 text-gray-500">No posts yet.</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useBlogStore } from '@/store/blog';

const blog = useBlogStore();
const loading = ref(false);

// Luôn có default shape để template không crash
const safeStats = computed(() => {
  const s = blog?.stats ?? {};
  const blogs = s.blogs ?? {};
  const users = s.users ?? {};
  return {
    blogs: {
      total: Number(blogs.total ?? 0),
      published: Number(blogs.published ?? 0),
      draft: Number(blogs.draft ?? 0),
    },
    users: { total: Number(users.total ?? 0) },
    latest: { blogs: Array.isArray(s.latest?.blogs) ? s.latest.blogs : [] },
  };
});

// Danh sách mới nhất có fallback
const latestList = computed(() => {
  if (safeStats.value.latest.blogs.length) return safeStats.value.latest.blogs;
  return Array.isArray(blog.items) ? blog.items.slice(0, 6) : [];
});

onMounted(async () => {
  loading.value = true;
  try {
    blog.setPerPage?.(6);
    blog.setPage?.(1);
    await blog.fetchBlogs?.();
    await blog.fetchStats?.();
  } catch (e) {
    console.error('[Home] init error', e);
  } finally {
    loading.value = false;
  }
});
</script>
