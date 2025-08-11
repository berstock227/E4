# Dashboard Components

## Overview

Dashboard được xây dựng với các components modular và có thể tái sử dụng, cung cấp giao diện quản trị hoàn chỉnh với:

- **Thống kê nhanh** (Stats Cards)
- **Biểu đồ trực quan** (Charts)
- **Bảng dữ liệu** (Data Tables)
- **Thông báo hệ thống** (Alerts)
- **Tác vụ nhanh** (Quick Actions)

## Components

### 1. StatsCard.vue
Hiển thị thống kê dạng card với icon và phần trăm thay đổi.

**Props:**
- `title`: Tiêu đề thống kê
- `value`: Giá trị hiện tại
- `change`: Phần trăm thay đổi
- `icon`: Icon component
- `iconBgClass`: CSS class cho background icon
- `iconColorClass`: CSS class cho màu icon

### 2. ChartCard.vue
Component biểu đồ sử dụng Chart.js với các loại chart khác nhau.

**Props:**
- `title`: Tiêu đề biểu đồ
- `type`: Loại biểu đồ (line, bar, doughnut, pie)
- `data`: Dữ liệu biểu đồ
- `options`: Tùy chọn Chart.js
- `periods`: Mảng các khoảng thời gian
- `selectedPeriod`: Khoảng thời gian được chọn

### 3. DataTable.vue
Bảng dữ liệu với sorting, pagination và custom cells.

**Props:**
- `title`: Tiêu đề bảng
- `columns`: Cấu hình cột
- `data`: Dữ liệu hiển thị
- `showViewAll`: Hiển thị nút "View All"

### 4. AlertCard.vue
Hiển thị thông báo hệ thống với các loại khác nhau.

**Props:**
- `alerts`: Mảng các thông báo

**Events:**
- `dismiss`: Khi đóng thông báo
- `action`: Khi click action button

### 5. QuickActions.vue
Thanh tác vụ nhanh với role-based permissions.

**Props:**
- `userRole`: Role của user hiện tại

## Store (Pinia)

### useDashboardStore
Quản lý state và logic cho dashboard.

**State:**
- `stats`: Thống kê tổng quan
- `analytics`: Dữ liệu biểu đồ
- `alerts`: Thông báo hệ thống
- `loading`: Trạng thái loading
- `error`: Lỗi nếu có

**Getters:**
- `formattedStats`: Thống kê đã format
- `viewsChartData`: Dữ liệu biểu đồ lượt xem
- `categoryChartData`: Dữ liệu biểu đồ phân bố danh mục
- `recentBlogs`: Blog gần đây
- `recentUsers`: User gần đây

**Actions:**
- `fetchStats()`: Lấy thống kê
- `fetchAnalytics(period)`: Lấy dữ liệu biểu đồ
- `fetchAlerts()`: Lấy thông báo
- `dismissAlert(alertId)`: Đóng thông báo
- `initializeDashboard()`: Khởi tạo dashboard

## API Endpoints

### GET /api/stats
Trả về thống kê tổng quan:
```json
{
  "data": {
    "blogs": 2,
    "users": 2,
    "comments": 38,
    "views": 2140,
    "today_views": 156,
    "week_views": 892,
    "month_views": 2140
  }
}
```

### GET /api/dashboard/analytics
Trả về dữ liệu biểu đồ:
```json
{
  "data": {
    "views_chart": {
      "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      "datasets": [{
        "label": "Views",
        "data": [120, 190, 300, 500, 200, 300, 450],
        "borderColor": "#3B82F6",
        "backgroundColor": "rgba(59, 130, 246, 0.1)"
      }]
    },
    "category_distribution": {
      "labels": ["Tutorial", "News", "Tips"],
      "datasets": [{
        "data": [65, 20, 15],
        "backgroundColor": ["#3B82F6", "#10B981", "#F59E0B"]
      }]
    },
    "recent_activity": {
      "blogs": [...],
      "users": [...]
    }
  }
}
```

### GET /api/dashboard/alerts
Trả về thông báo hệ thống:
```json
{
  "data": [
    {
      "id": 1,
      "type": "info",
      "title": "System Update",
      "message": "New features have been deployed.",
      "actions": [
        { "label": "Learn More", "primary": true },
        { "label": "Dismiss", "primary": false }
      ]
    }
  ]
}
```

## Role-based Permissions

Dashboard hỗ trợ phân quyền theo role:

- **Admin**: Tất cả chức năng
- **Author**: Quản lý blog, tạo blog, xem thống kê
- **User**: Xem thống kê cơ bản, tạo blog

## Usage

```vue
<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatsCard
        v-for="(stat, key) in formattedStats"
        :key="key"
        :title="stat.title"
        :value="stat.value"
        :change="stat.change"
        :icon="stat.icon"
      />
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ChartCard
        title="Blog Views"
        type="line"
        :data="viewsChartData"
        @period-change="handlePeriodChange"
      />
    </div>

    <!-- Tables -->
    <DataTable
      title="Recent Blogs"
      :columns="blogColumns"
      :data="recentBlogs"
      @view-all="viewAllBlogs"
    />
  </div>
</template>

<script setup>
import { useDashboardStore } from '@/store/dashboard'

const dashboardStore = useDashboardStore()

onMounted(async () => {
  await dashboardStore.initializeDashboard()
})
</script>
```

## Styling

Dashboard sử dụng Tailwind CSS với:
- Responsive design
- Dark mode ready
- Consistent spacing
- Modern UI components

## Dependencies

- `chart.js`: Biểu đồ
- `vue-chartjs`: Vue wrapper cho Chart.js
- `@heroicons/vue`: Icons
- `date-fns`: Format dates
- `pinia`: State management
