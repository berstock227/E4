/**
 * Slug generation utility
 */

/**
 * Generate a URL-friendly slug from text
 * @param {string} text - The text to convert to slug
 * @returns {string} The generated slug
 */
export const generateSlug = (text) => {
  if (!text) return ''
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '')          // Trim - from end of text
}

/**
 * Generate a unique slug by appending a number if the slug already exists
 * @param {string} text - The text to convert to slug
 * @param {Array} existingSlugs - Array of existing slugs to check against
 * @param {string} separator - Separator to use between slug and number (default: '-')
 * @returns {string} The unique slug
 */
export const generateUniqueSlug = (text, existingSlugs = [], separator = '-') => {
  let slug = generateSlug(text)
  let uniqueSlug = slug
  let counter = 1

  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}${separator}${counter}`
    counter++
  }

  return uniqueSlug
}

/**
 * Generate a unique slug for blog posts
 * @param {string} title - The blog post title
 * @param {Array} existingPosts - Array of existing blog posts
 * @param {string} currentPostId - ID of current post (for updates)
 * @returns {string} The unique slug
 */
export const generateBlogSlug = (title, existingPosts = [], currentPostId = null) => {
  const existingSlugs = existingPosts
    .filter(post => post.id !== currentPostId) // Exclude current post when updating
    .map(post => post.slug)
    .filter(Boolean)

  return generateUniqueSlug(title, existingSlugs)
}

/**
 * Generate a unique slug for categories
 * @param {string} name - The category name
 * @param {Array} existingCategories - Array of existing categories
 * @param {string} currentCategoryId - ID of current category (for updates)
 * @returns {string} The unique slug
 */
export const generateCategorySlug = (name, existingCategories = [], currentCategoryId = null) => {
  const existingSlugs = existingCategories
    .filter(category => category.id !== currentCategoryId)
    .map(category => category.slug)
    .filter(Boolean)

  return generateUniqueSlug(name, existingSlugs)
}

/**
 * Generate a unique slug for tags
 * @param {string} name - The tag name
 * @param {Array} existingTags - Array of existing tags
 * @param {string} currentTagId - ID of current tag (for updates)
 * @returns {string} The unique slug
 */
export const generateTagSlug = (name, existingTags = [], currentTagId = null) => {
  const existingSlugs = existingTags
    .filter(tag => tag.id !== currentTagId)
    .map(tag => tag.slug)
    .filter(Boolean)

  return generateUniqueSlug(name, existingSlugs)
}

/**
 * Validate if a slug is valid
 * @param {string} slug - The slug to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidSlug = (slug) => {
  if (!slug) return false
  
  // Check if slug matches the pattern: lowercase letters, numbers, and hyphens only
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugPattern.test(slug)
}

/**
 * Sanitize a slug to ensure it's valid
 * @param {string} slug - The slug to sanitize
 * @returns {string} The sanitized slug
 */
export const sanitizeSlug = (slug) => {
  if (!slug) return ''
  
  return generateSlug(slug)
}

/**
 * Extract the base slug (remove numeric suffix)
 * @param {string} slug - The slug to extract base from
 * @returns {string} The base slug
 */
export const getBaseSlug = (slug) => {
  if (!slug) return ''
  
  // Remove numeric suffix like "-1", "-2", etc.
  return slug.replace(/-\d+$/, '')
}

/**
 * Check if a slug is a duplicate of another slug
 * @param {string} slug - The slug to check
 * @param {Array} existingSlugs - Array of existing slugs
 * @param {string} excludeId - ID to exclude from check (for updates)
 * @returns {boolean} True if duplicate, false otherwise
 */
export const isDuplicateSlug = (slug, existingSlugs = [], excludeId = null) => {
  const filteredSlugs = existingSlugs.filter(item => item.id !== excludeId)
  return filteredSlugs.some(item => item.slug === slug)
}

/**
 * Get the next available slug number
 * @param {string} baseSlug - The base slug
 * @param {Array} existingSlugs - Array of existing slugs
 * @returns {number} The next available number
 */
export const getNextSlugNumber = (baseSlug, existingSlugs = []) => {
  const pattern = new RegExp(`^${baseSlug}-(\\d+)$`)
  const numbers = existingSlugs
    .map(item => item.slug)
    .filter(slug => pattern.test(slug))
    .map(slug => parseInt(slug.match(pattern)[1]))
    .sort((a, b) => a - b)

  if (numbers.length === 0) return 1
  
  // Find the first gap in the sequence
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] !== i + 1) {
      return i + 1
    }
  }
  
  return numbers[numbers.length - 1] + 1
}
