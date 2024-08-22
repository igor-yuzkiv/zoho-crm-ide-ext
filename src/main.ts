// import '@/app/plugins/monaco-editor/worker.ts'
import '@/app/assets/style.css'
import { createApp } from 'vue'
import App from '@/app/App.vue'
import { registerPlugins } from '@/app/plugins'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

registerPlugins(app)

app.mount('#app')
