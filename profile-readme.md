# Profile System Documentation

## Tổng quan

Hệ thống Profile cung cấp các chức năng quản lý thông tin cá nhân, bảo mật và thống kê hoạt động cho người dùng.

## Components

### 1. ProfileForm.vue
**Vị trí:** `src/components/profile/ProfileForm.vue`

**Chức năng:**
- Hiển thị và chỉnh sửa thông tin cá nhân
- Upload avatar
- Validation form
- Responsive design

**Props:** Không có

**Events:** Không có

**Features:**
- Chế độ xem/chỉnh sửa
- Upload avatar với preview
- Validation real-time
- Auto-save khi có thay đổi

### 2. ChangePasswordForm.vue
**Vị trí:** `src/components/profile/ChangePasswordForm.vue`

**Chức năng:**
- Thay đổi mật khẩu
- Validation mật khẩu mạnh
- Hiển thị độ mạnh mật khẩu

**Props:** Không có

**Events:** Không có

**Features:**
- Validation mật khẩu theo tiêu chuẩn
- Hiển thị độ mạnh mật khẩu real-time
- Show/hide password
- Yêu cầu mật khẩu hiện tại

### 3. UserStats.vue
**Vị trí:** `src/components/profile/UserStats.vue`

**Chức năng:**
- Hiển thị thống kê hoạt động
- Biểu đồ và metrics
- Hoạt động gần đây

**Props:** Không có

**Events:** Không có

**Features:**
- Cards thống kê với gradient
- Hoạt động gần đây
- Responsive design
- Loading states

## API Endpoints

### User Profile
- `GET /api/users/profile` - Lấy thông tin profile
- `PUT /api/users/update` - Cập nhật profile
- `POST /api/users/avatar` - Upload avatar

### User Statistics
- `GET /api/users/stats` - Lấy thống kê user
- `GET /api/users/activity` - Lấy hoạt động gần đây
- `GET /api/users/comments` - Lấy bình luận của user

### Account Management
- `DELETE /api/users/account` - Xóa tài khoản
- `GET /api/users/export` - Xuất dữ liệu user

## Store (Pinia)

### Auth Store Updates
**File:** `src/store/auth.js`

**New Methods:**
- `updateUser(userData)` - Cập nhật thông tin user trong store

## API Service

### User API
**File:** `src/api/user.js`

**Methods:**
- `getProfile()` - Lấy profile
- `updateProfile(data)` - Cập nhật profile
- `uploadAvatar(formData)` - Upload avatar
- `getStats()` - Lấy thống kê
- `getRecentActivity()` - Lấy hoạt động gần đây
- `getMyComments(params)` - Lấy bình luận
- `deleteAccount()` - Xóa tài khoản
- `exportData()` - Xuất dữ liệu

## Constants

### API Endpoints
**File:** `src/utils/constants.js`

**New Endpoints:**
```javascript
USER: {
  PROFILE: '/users/profile',
  UPDATE: '/users/update',
  AVATAR: '/users/avatar',
  STATS: '/users/stats',
  ACTIVITY: '/users/activity',
  COMMENTS: '/users/comments',
  ACCOUNT: '/users/account',
  EXPORT: '/users/export',
}
```

## Mock Server

### New Endpoints
**File:** `mock-server.js`

**Added endpoints:**
- User profile management
- User statistics
- User activity tracking
- Account deletion
- Data export

## View

### Profile.vue
**Vị trí:** `src/views/Profile.vue`

**Layout:**
- Header với title và description
- Grid layout: 2/3 main content, 1/3 sidebar
- Main content: ProfileForm, ChangePasswordForm
- Sidebar: UserStats, Quick Actions, Account Info

**Features:**
- Responsive design
- Modal xóa tài khoản
- Export dữ liệu
- Authentication check

## Validation Rules

### Password Requirements
- Ít nhất 8 ký tự
- Có chữ hoa
- Có chữ thường
- Có số
- Có ký tự đặc biệt (!@#$%^&*)

### Form Validation
- Email format
- Phone format
- URL format
- Required fields

## Styling

### Design System
- Tailwind CSS
- Consistent color scheme
- Responsive breakpoints
- Loading states
- Error states

### Components
- Cards với shadow và rounded corners
- Gradient backgrounds cho stats
- Icons từ Heroicons
- Consistent spacing

## Error Handling

### API Errors
- Network errors
- Validation errors
- Server errors
- User-friendly messages

### Form Validation
- Real-time validation
- Error messages
- Success feedback

## Security

### Authentication
- JWT token validation
- Protected routes
- Auto-logout on token expiry

### Data Protection
- Password hashing (backend)
- Secure file upload
- Input sanitization

## Performance

### Optimization
- Lazy loading components
- Debounced form inputs
- Efficient API calls
- Cached user data

## Testing

### Unit Tests
- Component testing
- Store testing
- API service testing

### Integration Tests
- Form submission
- API integration
- User flow testing

## Usage Examples

### Basic Profile Update
```javascript
import { userAPI } from '@/api/user'

const updateProfile = async () => {
  try {
    const response = await userAPI.updateProfile({
      fullName: 'John Doe',
      bio: 'Software Developer',
      location: 'Hanoi, Vietnam'
    })
    console.log('Profile updated:', response.data)
  } catch (error) {
    console.error('Update failed:', error)
  }
}
```

### Password Change
```javascript
import { authAPI } from '@/api/auth'

const changePassword = async () => {
  try {
    await authAPI.changePassword({
      current_password: 'oldPassword123',
      new_password: 'newPassword123'
    })
    console.log('Password changed successfully')
  } catch (error) {
    console.error('Password change failed:', error)
  }
}
```

## Future Enhancements

### Planned Features
- Two-factor authentication
- Social media integration
- Profile privacy settings
- Activity timeline
- Achievement badges
- Profile verification

### Technical Improvements
- Real-time updates
- Offline support
- Progressive Web App features
- Advanced analytics
- Multi-language support
