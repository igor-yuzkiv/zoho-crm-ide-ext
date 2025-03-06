import { ZohoCreatorServiceProvider, ZohoCrmServiceProvider } from '@/services/service-providers'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchMockChromeTabsQuery } from '@/api/mock.api.js'

const PROVIDERS = [ZohoCrmServiceProvider, ZohoCreatorServiceProvider]

async function fetchChromeTabs() {
    //TODO: remove mock api

    if (import.meta.env.VITE_MOCK_API === 'true') {
        return fetchMockChromeTabsQuery()
    }
    return chrome.tabs.query({})
}

export const useServiceProvidersStore = defineStore('browser.tabs', () => {
    const providers = ref([])

    async function loadProviders() {
        const response = await fetchChromeTabs()

        if (!response.length) {
            providers.value = []
            return
        }

        const tmp = new Set()
        providers.value = response.reduce((acc, tab) => {
            for (const serviceProvider of PROVIDERS) {
                const item = serviceProvider?.resolveFromBrowserTab?.(tab)
                if (item && !(tmp.has(item.id) && item.isConnected)) {
                    tmp.add(item.id)
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
