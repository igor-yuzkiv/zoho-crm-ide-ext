<script setup>
import { useServiceProvidersStore } from '@/store/useServiceProvidersStore.js'
import Button from 'primevue/button'

const providersStore = useServiceProvidersStore()

async function fetchTabs() {
    await providersStore.loadProviders()
    console.log(providersStore.providers)
}
</script>
<template>
    <div class="flex flex-col gap-2">
        <Button @click="fetchTabs">Fetch Tabs</Button>
    </div>
</template>
