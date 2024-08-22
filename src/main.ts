import '@/style.css'
// import '@/plugins/monaco-editor/worker.ts'

import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

registerPlugins(app)

app.mount('#app')
