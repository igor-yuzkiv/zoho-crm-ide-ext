import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { ZohoServiceConfig } from '@/config/zoho-service.config.js'

export const useBrowserTabsStore = defineStore('browser.tabs', () => {
    const tabs = ref([])
    const activeTab = computed(() => tabs.value.find((t) => t.active))

    async function fetchOpenTabs() {
        const response = await chrome.tabs.query({})
        if (!response.length) {
            tabs.value = []
            return
        }

        tabs.value = response.reduce((acc, item) => {
            let tab_service = undefined
            let tab_metadata = {}

            for (const [service, config] of Object.entries(ZohoServiceConfig)) {
                const metadata = config?.resolve?.(item)
                if (metadata) {
                    tab_service = service
                    tab_metadata = metadata
                    break
                }
            }

            item.zoho_service = tab_service
            item.zoho_metadata = tab_metadata

            acc.push(item)
            return acc
        }, [])
    }

    return {
        tabs,
        activeTab,
        fetchOpenTabs,
    }
})
