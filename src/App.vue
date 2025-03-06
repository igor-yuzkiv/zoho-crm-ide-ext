<script setup>
import { useServiceProvidersStore } from '@/store/useServiceProvidersStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed } from 'vue'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { Icon } from '@iconify/vue'
import { BottomBar } from '@/components/bottom-bar/index.js'
import { FunctionsExplorer } from '@/components/functions-explorer/index.js'
import { TopBarMenu } from '@/components/top-bar-menu'

const providersStore = useServiceProvidersStore()
const workspace = useWorkspaceStore()

const providersOptions = computed(() => {
    return providersStore.providers.map((item) => ({
        label: item.title,
        value: item.id,
        isConnected: item.isConnected,
    }))
})

function onSelectProvider(event) {
    const provider = providersStore.providers.find((item) => item.id === event)
    if (provider) {
        workspace.setProvider(provider.id)
    }
}

workspace.init()
</script>

<template>
    <div class="relative flex h-screen w-full min-w-[400px] flex-col overflow-hidden dark:bg-gray-900 dark:text-white">
        <TopBarMenu>
            <template #end>
                <div class="flex items-center gap-x-1">
                    <Select
                        :options="providersOptions"
                        :model-value="workspace.provider?.id"
                        @update:model-value="onSelectProvider"
                        class="min-w-[200px]"
                        option-label="label"
                        option-value="value"
                        placeholder="-- Service Provider --"
                    >
                        <template #value>
                            <div class="flex items-center gap-x-1" v-if="workspace.provider">
                                <Icon
                                    :icon="workspace.provider?.isConnected ? 'pajamas:connected' : 'hugeicons:connect'"
                                />
                                {{ workspace.provider?.title }}
                            </div>
                        </template>
                        <template #option="{ option }">
                            <div class="flex items-center gap-x-1" :class="{ 'text-gray-500': !option.isConnected }">
                                <Icon :icon="option?.isConnected ? 'pajamas:connected' : 'hugeicons:connect'" />
                                {{ option.label }}
                            </div>
                        </template>
                    </Select>
                    <Button text icon="pi pi-sync" @click="providersStore.loadProviders()" />
                </div>
            </template>
        </TopBarMenu>
        <main class="flex flex-grow overflow-hidden">
            <div class="flex h-full flex-col overflow-y-auto overflow-x-hidden border-r" style="width: 400px">
                <FunctionsExplorer :functions="workspace.functions" />
            </div>
            <div class="flex h-full w-full flex-col overflow-auto">
                <router-view />
            </div>
        </main>
        <BottomBar />
    </div>
</template>

<style scoped></style>
