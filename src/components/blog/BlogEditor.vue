<template>
  <div class="blog-editor">
    <!-- Editor Toolbar -->
    <div class="editor-toolbar bg-white border-b border-gray-200 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <!-- Editor Type Toggle -->
          <div class="flex bg-gray-100 rounded-lg p-1">
            <button
              @click="editorType = 'wysiwyg'"
              :class="[
                'px-3 py-1 rounded-md text-sm font-medium transition-colors',
                editorType === 'wysiwyg'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              WYSIWYG
            </button>
            <button
              @click="editorType = 'markdown'"
              :class="[
                'px-3 py-1 rounded-md text-sm font-medium transition-colors',
                editorType === 'markdown'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              Markdown
            </button>
          </div>

          <!-- WYSIWYG Formatting Tools -->
          <div v-if="editorType === 'wysiwyg'" class="flex items-center space-x-1">
            <button
              @click="formatText('bold')"
              :class="[
                'p-2 rounded hover:bg-gray-100 transition-colors',
                isFormatActive('bold') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              ]"
              title="Bold"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.6 18H6V2h4.2c3.4 0 6.2 2.8 6.2 6.2s-2.8 6.2-6.2 6.2H6V18h6.6z"/>
              </svg>
            </button>
            <button
              @click="formatText('italic')"
              :class="[
                'p-2 rounded hover:bg-gray-100 transition-colors',
                isFormatActive('italic') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              ]"
              title="Italic"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"/>
              </svg>
            </button>
            <button
              @click="formatText('underline')"
              :class="[
                'p-2 rounded hover:bg-gray-100 transition-colors',
                isFormatActive('underline') ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              ]"
              title="Underline"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16 9A6 6 0 1 1 4 9V1a1 1 0 1 1 2 0v8a4 4 0 1 0 8 0V1a1 1 0 1 1 2 0v8zM2 17h16v2H2v-2z"/>
              </svg>
            </button>
            <div class="w-px h-6 bg-gray-300 mx-2"></div>
            <button
              @click="insertHeading(2)"
              class="p-2 rounded hover:bg-gray-100 text-gray-600 transition-colors"
              title="Heading 2"
            >
              H2
            </button>
            <button
              @click="insertHeading(3)"
              class="p-2 rounded hover:bg-gray-100 text-gray-600 transition-colors"
              title="Heading 3"
            >
              H3
            </button>
            <div class="w-px h-6 bg-gray-300 mx-2"></div>
            <button
              @click="insertList('ul')"
              class="p-2 rounded hover:bg-gray-100 text-gray-600 transition-colors"
              title="Bullet List"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </button>
            <button
              @click="insertList('ol')"
              class="p-2 rounded hover:bg-gray-100 text-gray-600 transition-colors"
              title="Numbered List"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </button>
            <div class="w-px h-6 bg-gray-300 mx-2"></div>
            <button
              @click="insertLink"
              class="p-2 rounded hover:bg-gray-100 text-gray-600 transition-colors"
              title="Insert Link"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"/>
              </svg>
            </button>
            <button
              @click="insertImage"
              class="p-2 rounded hover:bg-gray-100 text-gray-600 transition-colors"
              title="Insert Image"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Autosave Status -->
        <div class="flex items-center space-x-2 text-sm text-gray-500">
          <div v-if="isSaving" class="flex items-center space-x-1">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Saving...</span>
          </div>
          <div v-else-if="lastSaved" class="flex items-center space-x-1">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>Saved {{ formatTimeAgo(lastSaved) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Editor Content -->
    <div class="editor-content">
      <!-- WYSIWYG Editor -->
      <div v-if="editorType === 'wysiwyg'" class="wysiwyg-editor">
        <div
          ref="wysiwygEditor"
          class="min-h-[400px] p-6 focus:outline-none prose max-w-none"
          contenteditable="true"
          @input="handleWysiwygInput"
          @paste="handlePaste"
          @keydown="handleKeydown"
          v-html="content"
        ></div>
      </div>

      <!-- Markdown Editor -->
      <div v-else class="markdown-editor">
        <div class="grid grid-cols-2 gap-4 h-[400px]">
          <!-- Markdown Input -->
          <div class="border rounded-lg">
            <div class="bg-gray-50 px-4 py-2 border-b text-sm font-medium text-gray-700">
              Markdown
            </div>
            <textarea
              ref="markdownInput"
              v-model="markdownContent"
              class="w-full h-full p-4 resize-none focus:outline-none font-mono text-sm"
              placeholder="Write your content in Markdown..."
              @input="handleMarkdownInput"
            ></textarea>
          </div>

          <!-- Markdown Preview -->
          <div class="border rounded-lg">
            <div class="bg-gray-50 px-4 py-2 border-b text-sm font-medium text-gray-700">
              Preview
            </div>
            <div
              class="h-full p-4 overflow-y-auto prose max-w-none"
              v-html="markdownPreview"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Link Dialog -->
    <div v-if="showLinkDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-96">
        <h3 class="text-lg font-medium mb-4">Insert Link</h3>
        <input
          v-model="linkUrl"
          type="url"
          placeholder="Enter URL..."
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div class="flex justify-end space-x-2 mt-4">
          <button
            @click="showLinkDialog = false"
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            @click="insertLinkUrl"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Insert
          </button>
        </div>
      </div>
    </div>

    <!-- Image Upload Dialog -->
    <div v-if="showImageDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-96">
        <h3 class="text-lg font-medium mb-4">Insert Image</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <input
              ref="imageInput"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Or enter URL</label>
            <input
              v-model="imageUrl"
              type="url"
              placeholder="Enter image URL..."
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div class="flex justify-end space-x-2 mt-4">
          <button
            @click="showImageDialog = false"
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            @click="insertImageUrl"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Start writing your content...'
  },
  autosave: {
    type: Boolean,
    default: true
  },
  autosaveInterval: {
    type: Number,
    default: 30000 // 30 seconds
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'save', 'change'])

// Refs
const wysiwygEditor = ref(null)
const markdownInput = ref(null)
const imageInput = ref(null)
const editorType = ref('wysiwyg')
const content = ref(props.modelValue)
const markdownContent = ref(props.modelValue)
const isSaving = ref(false)
const lastSaved = ref(null)
const autosaveTimer = ref(null)
const showLinkDialog = ref(false)
const showImageDialog = ref(false)
const linkUrl = ref('')
const imageUrl = ref('')
const selectedText = ref('')

// Computed
const markdownPreview = computed(() => {
  if (!markdownContent.value) return ''
  return DOMPurify.sanitize(marked(markdownContent.value))
})

// Methods
const formatTimeAgo = (date) => {
  const now = new Date()
  const diff = now - date
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return date.toLocaleDateString()
}

const handleWysiwygInput = () => {
  if (wysiwygEditor.value) {
    content.value = wysiwygEditor.value.innerHTML
    emit('update:modelValue', content.value)
    emit('change', content.value)
    scheduleAutosave()
  }
}

const handleMarkdownInput = () => {
  emit('update:modelValue', markdownContent.value)
  emit('change', markdownContent.value)
  scheduleAutosave()
}

const handlePaste = (event) => {
  event.preventDefault()
  const text = event.clipboardData.getData('text/plain')
  document.execCommand('insertText', false, text)
}

const handleKeydown = (event) => {
  // Handle keyboard shortcuts
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 'b':
        event.preventDefault()
        formatText('bold')
        break
      case 'i':
        event.preventDefault()
        formatText('italic')
        break
      case 'u':
        event.preventDefault()
        formatText('underline')
        break
      case 's':
        event.preventDefault()
        saveContent()
        break
    }
  }
}

const formatText = (command) => {
  if (editorType.value === 'wysiwyg' && wysiwygEditor.value) {
    document.execCommand(command, false, null)
    wysiwygEditor.value.focus()
    handleWysiwygInput()
  }
}

const isFormatActive = (command) => {
  return document.queryCommandState(command)
}

const insertHeading = (level) => {
  if (editorType.value === 'wysiwyg' && wysiwygEditor.value) {
    document.execCommand('formatBlock', false, `h${level}`)
    wysiwygEditor.value.focus()
    handleWysiwygInput()
  }
}

const insertList = (type) => {
  if (editorType.value === 'wysiwyg' && wysiwygEditor.value) {
    document.execCommand(type === 'ul' ? 'insertUnorderedList' : 'insertOrderedList', false, null)
    wysiwygEditor.value.focus()
    handleWysiwygInput()
  }
}

const insertLink = () => {
  if (editorType.value === 'wysiwyg' && wysiwygEditor.value) {
    selectedText.value = window.getSelection().toString()
    showLinkDialog.value = true
  }
}

const insertLinkUrl = () => {
  if (linkUrl.value) {
    if (editorType.value === 'wysiwyg' && wysiwygEditor.value) {
      if (selectedText.value) {
        document.execCommand('createLink', false, linkUrl.value)
      } else {
        document.execCommand('insertHTML', false, `<a href="${linkUrl.value}" target="_blank">${linkUrl.value}</a>`)
      }
      wysiwygEditor.value.focus()
      handleWysiwygInput()
    }
    showLinkDialog.value = false
    linkUrl.value = ''
  }
}

const insertImage = () => {
  showImageDialog.value = true
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      // Here you would typically upload to your server
      // For now, we'll create a local URL
      const url = URL.createObjectURL(file)
      insertImageToEditor(url)
    } catch (error) {
      console.error('Failed to upload image:', error)
    }
  }
}

const insertImageUrl = () => {
  if (imageUrl.value) {
    insertImageToEditor(imageUrl.value)
    showImageDialog.value = false
    imageUrl.value = ''
  }
}

const insertImageToEditor = (url) => {
  if (editorType.value === 'wysiwyg' && wysiwygEditor.value) {
    document.execCommand('insertHTML', false, `<img src="${url}" alt="" class="max-w-full h-auto" />`)
    wysiwygEditor.value.focus()
    handleWysiwygInput()
  } else if (editorType.value === 'markdown') {
    const imageMarkdown = `![Image](${url})`
    const cursorPos = markdownInput.value.selectionStart
    const textBefore = markdownContent.value.substring(0, cursorPos)
    const textAfter = markdownContent.value.substring(cursorPos)
    markdownContent.value = textBefore + imageMarkdown + textAfter
    handleMarkdownInput()
  }
}

const scheduleAutosave = () => {
  if (!props.autosave) return

  if (autosaveTimer.value) {
    clearTimeout(autosaveTimer.value)
  }

  autosaveTimer.value = setTimeout(() => {
    saveContent()
  }, props.autosaveInterval)
}

const saveContent = async () => {
  if (isSaving.value) return

  isSaving.value = true
  try {
    const contentToSave = editorType.value === 'wysiwyg' ? content.value : markdownContent.value
    emit('save', contentToSave)
    lastSaved.value = new Date()
  } catch (error) {
    console.error('Failed to save content:', error)
  } finally {
    isSaving.value = false
  }
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (editorType.value === 'wysiwyg') {
    content.value = newValue
    if (wysiwygEditor.value) {
      wysiwygEditor.value.innerHTML = newValue
    }
  } else {
    markdownContent.value = newValue
  }
})

// Lifecycle
onMounted(() => {
  if (editorType.value === 'wysiwyg' && wysiwygEditor.value) {
    wysiwygEditor.value.innerHTML = props.modelValue
  }
})

onUnmounted(() => {
  if (autosaveTimer.value) {
    clearTimeout(autosaveTimer.value)
  }
})
</script>

<style scoped>
.blog-editor {
  @apply border border-gray-200 rounded-lg overflow-hidden;
}

.editor-toolbar {
  @apply border-b border-gray-200;
}

.wysiwyg-editor {
  @apply bg-white;
}

.markdown-editor {
  @apply bg-white;
}

.prose {
  @apply text-gray-900;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  @apply font-bold text-gray-900;
}

.prose h1 {
  @apply text-3xl mb-4;
}

.prose h2 {
  @apply text-2xl mb-3;
}

.prose h3 {
  @apply text-xl mb-2;
}

.prose p {
  @apply mb-4 leading-relaxed;
}

.prose ul, .prose ol {
  @apply mb-4 pl-6;
}

.prose ul {
  @apply list-disc;
}

.prose ol {
  @apply list-decimal;
}

.prose a {
  @apply text-blue-600 hover:text-blue-800 underline;
}

.prose img {
  @apply max-w-full h-auto rounded-lg shadow-sm;
}

.prose blockquote {
  @apply border-l-4 border-gray-300 pl-4 italic text-gray-600;
}

.prose code {
  @apply bg-gray-100 px-1 py-0.5 rounded text-sm font-mono;
}

.prose pre {
  @apply bg-gray-100 p-4 rounded-lg overflow-x-auto;
}

.prose pre code {
  @apply bg-transparent p-0;
}
</style>
