<script setup>
import { useBrowserTabsStore } from '@/store/useBrowserTabsStore.js'
import Button from 'primevue/button'

const browserTabs = useBrowserTabsStore()

async function fetchTabs() {
    await browserTabs.fetchOpenTabs()

    console.log('tabs', browserTabs.tabs)
}

async function test() {
    console.log('zoho_crm', browserTabs.crmTabs)
    console.log('zoho', browserTabs.zohoTabs)
}
</script>
<template>
    <div class="flex flex-col gap-2">
        <Button @click="fetchTabs">Fetch Tabs</Button>
        <Button @click="test">Test</Button>
    </div>
</template>
