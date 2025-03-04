import { ServiceProvidersConfig } from '@/services/service-providers.config.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useServiceProvidersStore = defineStore('browser.tabs', () => {
    const providers = ref([])

    async function loadProviders() {
        const response = await chrome.tabs.query({})
        if (!response.length) {
            providers.value = []
            return
        }

        providers.value = response.reduce((acc, tab) => {
            for (const serviceProvider of Object.values(ServiceProvidersConfig)) {
                const item = serviceProvider?.resolve?.(tab)
                if (item) {
                    acc.push(item)
                    break
                }
            }
            return acc
        }, [])
    }

    return {
        providers,
        loadProviders,
    }
})
