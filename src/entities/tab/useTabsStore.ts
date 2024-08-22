import { computed, ref } from 'vue'
import QueryInfo = chrome.tabs.QueryInfo
import Tab = chrome.tabs.Tab
import { Maybe } from '@/app/types.ts'
import { defineStore } from 'pinia'
import { CRM_DOMAINS } from '@/app/constants.ts'

export const useTabsStore = defineStore('chrome.tab', () => {
    const tabs = ref<Tab[]>([])
    const targetTab = ref<Maybe<Tab>>()
    const activeTab = computed<Maybe<Tab>>(() => tabs.value.find((tab) => tab.active))
    const crmTabs = computed(() => {
        return tabs.value.filter((tab) => {
            if (tab.url) {
                const url = new URL(tab.url)
                return CRM_DOMAINS.includes(url.hostname)
            }
        })
    })

    async function loadTabs(query: QueryInfo = { currentWindow: true }) {
        tabs.value = await chrome.tabs.query(query).catch(() => {
            console.error('Failed to load tab')
            return []
        })

        updateTargetTab()

        return tabs.value
    }

    function updateTargetTab() {
        if (!crmTabs.value.length) {
            targetTab.value = null
            return
        }

        const sameAsActiveTab = crmTabs.value.find((tab) => tab.id === activeTab.value?.id)
        targetTab.value = sameAsActiveTab || crmTabs.value[0]
    }

    function onCreated(tab: Tab) {
        tabs.value = [...tabs.value, tab]
        updateTargetTab()
    }

    function onUpdated(tabId: number, info: chrome.tabs.TabChangeInfo, tab: Tab) {
        if (info?.status === 'complete') {
            tabs.value = tabs.value.map((t) => (t.id === tabId ? tab : t))
            updateTargetTab()
        }
    }

    function onRemoved(tabId: number) {
        tabs.value = tabs.value.filter((tab) => tab.id !== tabId)
        updateTargetTab()
    }

    function onActivated(info: chrome.tabs.TabActiveInfo) {
        tabs.value = tabs.value.map((tab) => {
            tab.active = tab.id === info.tabId
            return tab
        })
        updateTargetTab()
    }

    return {
        tabs,
        currentTab: activeTab,
        targetTab,
        loadTabs,
        observe: () => {
            chrome.tabs.onCreated.addListener(onCreated)
            chrome.tabs.onUpdated.addListener(onUpdated)
            chrome.tabs.onRemoved.addListener(onRemoved)
            chrome.tabs.onActivated.addListener(onActivated)
        },
        destroy: () => {
            chrome.tabs.onCreated.removeListener(onCreated)
            chrome.tabs.onUpdated.removeListener(onUpdated)
            chrome.tabs.onRemoved.removeListener(onRemoved)
            chrome.tabs.onActivated.removeListener(onActivated)
        },
    }
})
