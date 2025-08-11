# Contributing to Vue 3 Project 2025

Thank you for your interest in contributing to Vue 3 Project 2025! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0
- Git

### Setup Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/structure_vue3_project_2025.git
   cd structure_vue3_project_2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   ```bash
   # Start both frontend and mock server
   npm run dev:full
   
   # Or start them separately
   npm run server  # Mock server on port 8000
   npm run dev     # Frontend on port 3000
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📝 Development Guidelines

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check for linting issues
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Examples:**
```bash
feat(auth): add password reset functionality
fix(blog): resolve pagination issue
docs: update API documentation
style: format code with prettier
```

### Branch Naming Convention

- `feature/feature-name`: New features
- `fix/bug-description`: Bug fixes
- `docs/documentation-update`: Documentation updates
- `refactor/component-name`: Code refactoring
- `test/test-description`: Test-related changes

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for all new features
- Ensure test coverage is maintained
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

## 🔧 API Development

### Mock Server

The mock server is located in `mock-server.js` and provides:

- 30+ RESTful endpoints
- Mock data for development
- Error handling middleware
- Query parameter sanitization

### Adding New Endpoints

1. Add the endpoint to `mock-server.js`
2. Update the endpoint list in the console log
3. Add corresponding API method in `src/api/`
4. Update constants in `src/utils/constants.js`
5. Add store actions if needed
6. Update documentation

### API Response Format

All API responses should follow this format:

```javascript
// Success response
{
  "data": { ... },
  "meta": { ... }, // Optional
  "message": "Success message" // Optional
}

// Error response
{
  "status": 400,
  "message": "Error message",
  "detail": "Detailed error information" // Development only
}
```

## 🎨 UI/UX Guidelines

### Design System

- Use Tailwind CSS for styling
- Follow responsive design principles
- Maintain consistency with existing components
- Use semantic HTML elements
- Ensure accessibility compliance

### Component Structure

```vue
<template>
  <!-- Template content -->
</template>

<script setup>
// Imports
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  // prop definitions
})

// Emits
const emit = defineEmits(['event-name'])

// Reactive data
const data = ref(null)

// Computed properties
const computedValue = computed(() => {
  // computation logic
})

// Methods
const handleEvent = () => {
  // event handling logic
}
</script>

<style scoped>
/* Component-specific styles */
</style>
```

## 📚 Documentation

### Code Documentation

- Use JSDoc for function documentation
- Add inline comments for complex logic
- Document API endpoints
- Update README.md for new features

### API Documentation

Document all API endpoints with:

- HTTP method and path
- Request parameters
- Response format
- Example requests/responses
- Error codes

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

## 🤝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Add tests for new features
   - Update documentation

3. **Test your changes**
   ```bash
   npm run lint
   npm run type-check
   npm run test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use the PR template
   - Describe your changes clearly
   - Link related issues
   - Request reviews from maintainers

### Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design tested
```

## 🐛 Bug Reports

When reporting bugs, please include:

- **Environment**: OS, Node.js version, browser
- **Steps to reproduce**: Clear, step-by-step instructions
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Console errors**: Any error messages

## 💡 Feature Requests

When requesting features, please include:

- **Use case**: Why this feature is needed
- **Proposed solution**: How you think it should work
- **Alternatives considered**: Other approaches you've thought about
- **Mockups**: Visual examples if applicable

## 📞 Getting Help

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Documentation**: Check the README.md and inline documentation

## 🏆 Recognition

Contributors will be recognized in:

- Project README.md
- Release notes
- Contributor hall of fame

Thank you for contributing to Vue 3 Project 2025! 🎉
