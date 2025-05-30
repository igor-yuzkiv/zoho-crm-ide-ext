<script setup>
import { useProjectsStore } from './store/useProjectsStore'
import { AppRouteName } from '@/router.js'
import { useAppStore } from '@/store/useAppStore.js'
import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useServiceProvidersStore } from '@/store/useServiceProvidersStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import Menubar from 'primevue/menubar'
import Toast from 'primevue/toast'
import FunctionsList from '@/components/functions/FunctionsList.vue'
import GlobalSearchDialog from '@/components/global-search-dialog/GlobalSearchDialog.vue'
import ProviderSelect from '@/components/provider-select/ProviderSelect.vue'
import RefreshButton from '@/components/refresh-button/RefreshButton.vue'
import SettingsDialog from '@/components/settings-dialog/SettingsDialog.vue'
import CommitDialog from '@/components/commit-dialog/CommitDialog.vue'

const tobBarMenuItems = [
    {
        label: 'Settings',
        command: () => (isVisibleSettingsDialog.value = true),
    },
    {
        label: 'Search',
        command: () => (isVisibleSearchDialog.value = true),
    },
    {
        label: 'Export',
        command: () => onClickExportFunctions(),
    },
    {
        label: 'Commit',
        command: () => (isVisibleCommitDialog.value = true),
    },
]

const router = useRouter()
const appStore = useAppStore()
const providersStore = useServiceProvidersStore()
const functionsStore = useFunctionsStore()
const workspace = useWorkspaceStore()

const isVisibleSearchDialog = ref(false)
const isVisibleSettingsDialog = ref(false)
const isVisibleCommitDialog = ref(false)

function onFunctionClick(item) {
    if (workspace.isLoading || functionsStore.isLoading) {
        return
    }

    router.push({ name: AppRouteName.functionOverview, params: { function_id: item.id } })
}

async function onClickExportFunctions() {
    if (!workspace.provider || workspace.isLoading || functionsStore.isLoading) {
        return;
    }

    await functionsStore.downloadFunctionZip(workspace.provider.id);
}

onBeforeMount(async () => {
    appStore.initTheme()
    await workspace.init()
    useProjectsStore().loadCachedProjects()
})
</script>

<template>
    <div class="relative flex h-screen w-full min-w-[400px] flex-col overflow-hidden dark:bg-gray-800 dark:text-white">
        <Menubar :model="tobBarMenuItems" class="p-0.5" style="border-radius: 0">
            <template #end>
                <div class="flex items-center gap-x-1">
                    <ProviderSelect
                        :model-value="workspace.provider"
                        :providers="providersStore.providers"
                        @update:model-value="workspace.setProvider($event)"
                        :disabled="workspace.isLoading || functionsStore.isLoading"
                    />
                    <RefreshButton
                        :loading="workspace.isLoading || functionsStore.isLoading"
                        @click="workspace.refresh()"
                    />
                </div>
            </template>
        </Menubar>

        <main class="flex flex-grow overflow-hidden">
            <div class="flex h-full flex-col overflow-y-auto overflow-x-hidden border-r" style="width: 400px">
                <FunctionsList :items="workspace.functions" @click="onFunctionClick" />
            </div>

            <div class="flex h-full w-full flex-col overflow-auto">
                <router-view />
            </div>
        </main>

        <div class="flex h-8 w-full items-center justify-between bg-gray-100 px-2 dark:bg-gray-800">
            <div class="flex items-center">
                <div class="bottom-bar-item">Functions: {{ workspace.functions.length }}</div>
                <div class="bottom-bar-item" @click="workspace.refresh(true)">Clear cache</div>
            </div>

            <Button
                size="sm"
                text
                :icon="appStore.isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'"
                @click="appStore.toggleTheme()"
            >
            </Button>
        </div>
    </div>

    <CommitDialog v-model:visible="isVisibleCommitDialog" />
    <SettingsDialog v-model:visible="isVisibleSettingsDialog" />
    <GlobalSearchDialog v-model:visible="isVisibleSearchDialog" />
    <Toast />
    <ConfirmDialog />
</template>

<style scoped>
.bottom-bar-item {
    @apply cursor-pointer border-r border-gray-800 px-1 hover:underline dark:border-gray-100;
}
</style>
