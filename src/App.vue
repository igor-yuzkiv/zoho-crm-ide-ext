<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useAppStore } from '@/store/useAppStore.ts'
import { useTabsStore } from '@/store/useTabsStore.ts'
import { useFunctionsStore } from '@/store/useFunctionsStore.ts'
import FunctionsList from '@/components/FunctionsList.vue'
// import CodeEditor from '@/components/CodeEditor.vue'
import { Icon } from '@iconify/vue'

const VIEW_LAYOUT_ICONS = [
    'fluent:layout-column-three-20-filled',
    'fluent:layout-column-three-focus-center-20-filled',
    'fluent:layout-column-three-focus-left-20-filled',
]

const appStore = useAppStore()
const tabs = useTabsStore()
const { functions, selectedFunction, doSelectFunction, loadFunctions } = useFunctionsStore()

onMounted(async () => {
    appStore.toggleLoading()

    tabs.observe()
    await tabs.loadTabs().catch(console.error)
    await loadFunctions().catch(console.error)

    appStore.toggleLoading()
})

onBeforeUnmount(() => tabs.destroy())
</script>

<template>
    <div class="relative flex h-screen max-h-screen min-w-[800px] flex-col overflow-hidden">
        <div class="bar gap-x-4" :class="{ 'opacity-50': appStore.isLoading }">
            <button class="hover:underline" :disabled="appStore.isLoading">Download</button>
            <button class="hover:underline" :disabled="appStore.isLoading">Search</button>
        </div>

        <main class="flex flex-1 overflow-auto">
            <FunctionsList
                class="side-panel"
                v-if="[0, 2].includes(appStore.viewLayout)"
                :items="functions"
                @item:click="doSelectFunction($event.id)"
            />

            <!--<CodeEditor :model-value="selectedFunction?.script" />-->
            <div class="flex flex-1 overflow-hidden bg-white p-2 dark:bg-black">
                <pre>{{ selectedFunction?.script }}</pre>
            </div>
            <div class="side-panel" v-if="appStore.viewLayout === 0 && selectedFunction">
                <pre>{{ selectedFunction }}</pre>
            </div>
        </main>

        <div class="bar justify-between">
            <Icon v-if="appStore.isLoading" icon="prime:spinner" class="h-5 w-5 animate-spin"></Icon>
            <button @click="appStore.toggleLayout()">
                <Icon :icon="VIEW_LAYOUT_ICONS[appStore.viewLayout]" class="h-5 w-5" />
            </button>
        </div>
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

.side-panel {
    width: 300px;
}
</style>
