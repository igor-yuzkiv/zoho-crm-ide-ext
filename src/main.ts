import './app/monacoWorker.ts'
import './app/style.css'
import { createApp } from 'vue'
import App from '@/app/App.vue'
import { registerPlugins } from '@/app/plugins'
import { createPinia } from 'pinia'
import router from '@/app/router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

registerPlugins(app)

app.mount('#app')
