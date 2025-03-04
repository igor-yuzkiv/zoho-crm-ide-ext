<script setup>
import { useServiceProvidersStore } from '@/store/useServiceProvidersStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import Select from 'primevue/select'

const providersStore = useServiceProvidersStore()
const workspace = useWorkspaceStore()

const menuItems = ref([
    { label: 'Search' },
    { label: 'Commit' },
    { label: 'Export' },
    { label: 'Settings' },
    { label: 'Snippets' },
    { label: 'Documentation' },
])
const providers = computed(() => {
    if (!providersStore.providers?.length) {
        return []
    }

    return providersStore.providers.map((item) => ({ label: item.title, value: item.id }))
})

async function onClickRefreshProviders() {
    await providersStore.loadProviders()

    if (!workspace.serviceProvider && providersStore.providers.length) {
        workspace.setServiceProvider(providersStore.providers[0])
    }
}

function onSelectProvider(event) {
    const provider = providersStore.providers.find((item) => item.id === event)
    if (provider) {
        workspace.setServiceProvider(provider)
    }
}
</script>
<template>
    <Menubar :model="menuItems" class="p-0.5" style="border-radius: 0">
        <template #end>
            <div class="flex items-center gap-x-1">
                <Select
                    :options="providers"
                    :model-value="workspace.serviceProvider?.id"
                    @update:model-value="onSelectProvider"
                    class="min-w-[200px]"
                    option-label="label"
                    option-value="value"
                    placeholder="Service provider"
                />
                <Button text icon="pi pi-sync" @click="onClickRefreshProviders" />
            </div>
        </template>
    </Menubar>
</template>
