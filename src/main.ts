// import '@/app/monacoWorker.ts'
import './assets/style.css'
import { createApp } from 'vue'
import App from '@/app/App.vue'
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

registerPlugins(app)

app.mount('#app')
