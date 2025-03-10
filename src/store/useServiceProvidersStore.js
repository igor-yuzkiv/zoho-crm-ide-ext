import { ServiceProviderType } from '@/config/index.js'
import {
    ZohoCreatorServiceProvider,
    ZohoCrmServiceProvider,
    ZohoFinanceServiceProvider,
} from '@/services/service-providers/index.js'
import localStorageUtil from '@/utils/local-storage.util.js'
import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { fetchMockChromeTabsQuery } from '@/api/mock.api.js'

const PROVIDERS = {
    [ServiceProviderType.zoho_crm.name]: ZohoCrmServiceProvider,
    [ServiceProviderType.zoho_creator.name]: ZohoCreatorServiceProvider,
    [ServiceProviderType.zoho_finance.name]: ZohoFinanceServiceProvider,
}

async function fetchBrowserTabs() {
    //TODO: remove mock api
    if (import.meta.env.VITE_MOCK_API === 'true') {
        return fetchMockChromeTabsQuery()
    }
    return chrome.tabs.query({})
}

function resolveProviderFromBrowserTab(tab) {
    for (const serviceProvider of Object.values(PROVIDERS)) {
        const provider = serviceProvider?.resolveFromBrowserTab?.(tab)
        if (provider) {
            return provider
        }
    }
}

export const useServiceProvidersStore = defineStore('browser.tabs', () => {
    const providersMap = ref({})
    const providers = computed(() => Object.values(providersMap.value) || [])
    const connected = computed(() => providers.value.filter((p) => p.isConnected))

    function cacheProviders() {
        localStorageUtil.setItem(
            'service-providers',
            providers.value.map((provider) => ({ type: provider.type, metadata: provider.metadata }))
        )
    }

    function loadCachedProviders() {
        const items = localStorageUtil.getItem('service-providers')
        if (!Array.isArray(items) || !items.length) {
            return
        }

        for (const item of items) {
            const provider = new PROVIDERS[item.type](item.metadata)
            if (provider.id && !providersMap.value[provider.id]) {
                providersMap.value[provider.id] = provider
            }
        }
    }

    async function fetchProvidersFromBrowser() {
        const browserTabs = await fetchBrowserTabs()
        if (!Array.isArray(browserTabs)) {
            return
        }

        const newProviders = browserTabs.reduce((acc, tab) => {
            const provider = resolveProviderFromBrowserTab(tab)
            if (!provider?.id || acc[provider?.id]) {
                return acc
            }

            if (providersMap.value[provider.id]) {
                providersMap.value[provider.id].connect(tab)
                acc[provider.id] = providersMap.value[provider.id]
                return acc
            }

            acc[provider.id] = provider
            return acc
        }, {})

        Object.keys(providersMap.value).forEach((key) => {
            if (!newProviders[key]) {
                providersMap.value[key].disconnect()
            }
        })

        Object.assign(providersMap.value, newProviders)
        cacheProviders()
    }

    async function loadProviders() {
        loadCachedProviders()
        await fetchProvidersFromBrowser()
    }

    onMounted(() => {
        //TODO: remove mock api
        if (import.meta.env.VITE_MOCK_API === 'true') {
            return
        }

        chrome.tabs.onUpdated.addListener(fetchProvidersFromBrowser)
        chrome.tabs.onRemoved.addListener(fetchProvidersFromBrowser)
    })

    return {
        providers,
        providersMap,
        connected,
        loadProviders,
        cacheProviders,
    }
})
