import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

export default function (app) {
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkMode: true,
                cssLayer: {
                    name: 'primevue',
                    order: 'tailwind-base, primevue, tailwind-utilities',
                },
            },
        },
    })

    app.use(ConfirmationService)
    app.use(ToastService)
}
