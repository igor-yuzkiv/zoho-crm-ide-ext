import App from './App.vue'
import './style.css'
import registerPlugin from '@/plugins'
import router from '@/router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
registerPlugin(app)

app.mount('#app')
