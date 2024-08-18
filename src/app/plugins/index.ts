import { App } from '@vue/runtime-core'
import primevue from '@/app/plugins/primevue'
export function registerPlugins(app: App) {
    primevue(app)
}
