<script setup>
import { AppRouteName } from '@/router.js'
import { useAppStore } from '@/store/useAppStore.js'
import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useServiceProvidersStore } from '@/store/useServiceProvidersStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { Icon } from '@iconify/vue'
import BottomBar from '@/components/bottom-bar/BottomBar.vue'
import FunctionsExplorer from '@/components/functions-explorer/FunctionsExplorer.vue'
import ProviderSelect from '@/components/provider-select/ProviderSelect.vue'
import TopBarMenu from '@/components/top-bar-menu/TopBarMenu.vue'

const router = useRouter()

const appStore = useAppStore()
const providersStore = useServiceProvidersStore()
const functionsStore = useFunctionsStore()
const workspace = useWorkspaceStore()

function onSelectProvider(event) {
    const provider = providersStore.providers.find((item) => item.id === event)
    if (provider) {
        workspace.setProvider(provider.id)
    }
}

function onFunctionClick(item) {
    router.push({ name: AppRouteName.functionOverview, params: { function_id: item.id } })
}

async function onClickRefresh() {
    console.log('onClickRefresh')
    await providersStore.loadProviders()
    await functionsStore.loadFunctions(workspace.provider, true)
}

onBeforeMount(() => {
    appStore.initTheme()
    workspace.init()
})
</script>

<template>
    <div class="relative flex h-screen w-full min-w-[400px] flex-col overflow-hidden dark:bg-gray-800 dark:text-white">
        <TopBarMenu>
            <template #end>
                <div class="flex items-center gap-x-1">
                    <ProviderSelect
                        :model-value="workspace.provider"
                        :providers="providersStore.providers"
                        @update:model-value="onSelectProvider"
                    />
                    <Button text icon="" @click="onClickRefresh" >
                        <template #icon>
                            <Icon
                                :icon="workspace.isLoading || functionsStore.isLoading ? 'eos-icons:spinner' : 'ic:twotone-refresh'"
                                class="w-5 h-5"
                                :class="{ 'animate-spin': workspace.isLoading || functionsStore.isLoading }"
                            />
                        </template>
                    </Button>
                </div>
            </template>
        </TopBarMenu>

        <main class="flex flex-grow overflow-hidden">
            <div class="flex h-full flex-col overflow-y-auto overflow-x-hidden border-r" style="width: 400px">
                <FunctionsExplorer :functions="workspace.functions" @click="onFunctionClick" />
            </div>

            <div class="flex h-full w-full flex-col overflow-auto">
                <router-view />
            </div>
        </main>

        <BottomBar />
    </div>
</template>

<style scoped></style>
