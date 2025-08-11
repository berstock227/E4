# Vue 3 Project 2025

A modern, full-featured Vue 3 application with authentication, blog system, and admin dashboard. Built with the latest technologies and best practices.

## 🚀 Features

### Core Features
- **Vue 3** with Composition API
- **Vite** for fast development and building
- **Pinia** for state management
- **Vue Router 4** for routing
- **Tailwind CSS** for styling
- **Axios** for API communication

### Authentication System
- User registration and login
- JWT token authentication
- Password reset functionality
- Email verification
- Protected routes
- Role-based access control

### Blog System
- Create, read, update, delete blogs
- Rich text editor
- Image upload
- Categories and tags
- Search and filtering
- Pagination
- Comments system
- Like/unlike functionality
- Blog statistics

### Admin Dashboard
- User management
- Blog management
- Analytics dashboard
- Settings management

## 📁 Project Structure

```
src/
├── api/                 # API services
│   ├── axiosInstance.js # Axios configuration
│   ├── auth.js         # Authentication API
│   └── blog.js         # Blog API
├── components/         # Reusable components
├── layouts/           # Layout components
│   ├── DefaultLayout.vue
│   └── AuthLayout.vue
├── router/            # Vue Router configuration
│   ├── index.js       # Main router
│   ├── auth.js        # Auth routes
│   ├── blog.js        # Blog routes
│   └── dashboard.js   # Dashboard routes
├── store/             # Pinia stores
│   ├── auth.js        # Authentication store
│   └── blog.js        # Blog store
├── styles/            # Global styles
├── utils/             # Utility functions
│   └── constants.js   # Application constants
└── views/             # Page components
    ├── Home.vue       # Home page
    ├── auth/          # Authentication pages
    ├── blog/          # Blog pages
    └── dashboard/     # Dashboard pages
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd structure_vue3_project_2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the mock server**
   ```bash
   node mock-server.js
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=/api
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_NAME=Vue 3 Project 2025
VITE_APP_VERSION=1.0.0
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=info

# Pagination
VITE_DEFAULT_PAGE_SIZE=10
VITE_MAX_PAGE_SIZE=100

# File Upload
VITE_MAX_FILE_SIZE=5242880
VITE_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf

# Authentication
VITE_TOKEN_EXPIRY=24h
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/profile` | Get user profile |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/change-password` | Change password |
| POST | `/api/auth/forgot-password` | Forgot password |
| POST | `/api/auth/reset-password` | Reset password |
| POST | `/api/auth/verify-email` | Verify email |
| POST | `/api/auth/resend-verification` | Resend verification |

### Blog Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get blogs list |
| POST | `/api/blogs` | Create new blog |
| GET | `/api/blogs/:id` | Get blog detail |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |
| GET | `/api/blogs/categories` | Get categories |
| GET | `/api/blogs/tags` | Get tags |
| GET | `/api/blogs/search` | Search blogs |
| GET | `/api/blogs/my-blogs` | Get user's blogs |
| PATCH | `/api/blogs/:id/publish` | Publish blog |
| PATCH | `/api/blogs/:id/unpublish` | Unpublish blog |
| PATCH | `/api/blogs/:id/archive` | Archive blog |
| POST | `/api/blogs/:id/views` | Increment views |
| GET | `/api/blogs/:id/related` | Get related blogs |
| GET | `/api/blogs/:id/comments` | Get blog comments |
| POST | `/api/blogs/:id/comments` | Add comment |
| DELETE | `/api/blogs/:id/comments/:commentId` | Delete comment |
| POST | `/api/blogs/upload` | Upload image |
| GET | `/api/stats` | Get statistics |

## 🎨 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors

# Type checking
npm run type-check   # Run TypeScript type checking
```

## 🔒 Security Features

- **Input Validation**: All user inputs are validated and sanitized
- **XSS Protection**: Content is properly escaped
- **CSRF Protection**: Tokens are used for state-changing operations
- **Rate Limiting**: API endpoints are rate-limited
- **Secure Headers**: Security headers are configured
- **Token Management**: JWT tokens with proper expiration

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run unit tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Complete authentication system
- Blog management system
- Admin dashboard
- Responsive design
- API documentation

---

**Built with ❤️ using Vue 3, Vite, and modern web technologies**
