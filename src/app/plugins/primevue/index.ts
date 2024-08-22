import { App } from '@vue/runtime-core'
import PrimeVue from 'primevue/config'
import Aura from '@/app/plugins/primevue/theme/Aura.ts'

export default function (app: App) {
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: 'system', //.dark-mode
            },
        },
    })
}
