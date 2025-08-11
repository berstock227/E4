import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import './styles/main.css'

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        hello: 'Hello World'
      }
    }
  }
})

// Create app instance
const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)
app.use(i18n)

// Mount app
app.mount('#app')
