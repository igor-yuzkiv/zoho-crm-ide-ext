<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useAppStore } from '@/store/useAppStore.ts'
import { useTabsStore } from '@/store/useTabsStore.ts'
import { useFunctionsStore } from '@/store/useFunctionsStore.ts'

// import CodeEditor from '@/components/CodeEditor.vue'
import { Icon } from '@iconify/vue'
import FunctionsList from '@/components/FunctionsList.vue'
import FunctionInfo from '@/components/FunctionInfo.vue'
import SearchDialog from '@/components/SearchDialog.vue'

const appStore = useAppStore()
const tabs = useTabsStore()
const { functions, selectedFunction, doSelectFunction, loadFunctions, downloadZip } = useFunctionsStore()
const isVisibleSearchBar = ref(false)

onMounted(async () => {
    appStore.toggleLoading()
    tabs.observe()
    await tabs.loadTabs()
    await loadFunctions()
    appStore.toggleLoading()
})

onBeforeUnmount(() => tabs.destroy())
</script>

<template>
    <div class="relative flex h-screen max-h-screen min-w-[800px] flex-col overflow-hidden">
        <div class="bar gap-x-4" :class="{ 'opacity-50': appStore.isLoading }">
            <button class="hover:underline" :disabled="appStore.isLoading" @click="downloadZip">Download</button>
            <button class="hover:underline" :disabled="appStore.isLoading" @click="isVisibleSearchBar = true">
                Search
            </button>
        </div>

        <main class="flex flex-1 overflow-auto">
            <FunctionsList
                v-if="[0, 2].includes(appStore.layoutView)"
                :items="functions"
                @item:click="doSelectFunction($event.id)"
                class="side-panel"
                :style="{ width: '300px' }"
            />

            <!--<CodeEditor :model-value="selectedFunction?.script" />-->
            <div class="flex flex-1 overflow-auto bg-white p-2 dark:bg-black">
                <pre>{{ selectedFunction?.script }}</pre>
            </div>
            <FunctionInfo
                v-if="appStore.layoutView === 0 && selectedFunction"
                :info="selectedFunction"
                class="side-panel"
                :style="{ width: '400px' }"
            />
        </main>

        <div class="bar justify-between">
            <Icon v-if="appStore.isLoading" icon="prime:spinner" class="h-5 w-5 animate-spin"></Icon>
            <button @click="appStore.toggleLayoutView">
                <Icon :icon="appStore.layoutViewIcon" class="h-5 w-5" />
            </button>
        </div>

        <SearchDialog v-model:visible="isVisibleSearchBar" />
    </div>
</template>

<style scoped>
.bar {
    @apply flex w-full items-center bg-base-600 px-4 font-medium text-white dark:bg-base-800;
}

.bar {
    height: 30px;
    font-size: 15px;
}

.side-panel {
    @apply flex h-full flex-col overflow-auto bg-base-100 pb-1 dark:bg-base-950 dark:text-base-100;
}
</style>
