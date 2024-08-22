import { App } from '@vue/runtime-core'
import primevue from '@/plugins/primevue'
export function registerPlugins(app: App) {
    primevue(app)
}
