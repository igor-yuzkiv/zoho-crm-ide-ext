import { ZohoCreatorServiceProvider, ZohoCrmServiceProvider } from '@/services/providers'
import chromeMockUtil from '@/utils/chrome-mock.util.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const PROVIDERS = [ZohoCrmServiceProvider, ZohoCreatorServiceProvider]

export const useServiceProvidersStore = defineStore('browser.tabs', () => {
    const providers = ref([])

    async function loadProviders() {
        const response = await chrome.tabs.query({})
        // const response = await chromeMockUtil.chromeTabsQuery()

        if (!response.length) {
            providers.value = []
            return
        }

        const tmp = new Set()
        providers.value = response.reduce((acc, tab) => {
            for (const serviceProvider of PROVIDERS) {
                const item = serviceProvider?.resolve?.(tab)
                if (item && !tmp.has(item.id)) {
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
