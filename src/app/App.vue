<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useAppStore } from '@/app/useAppStore.ts'
import { useTabsStore } from '@/entities/tab/useTabsStore.ts'
import { useFunctionsStore } from '@/entities/function/useFunctionsStore.ts'

import { BottomBar } from '@/components/bottom-bar'
import { TobBar } from '@/components/top-bar'
import { FunctionsList } from '@/components/functions-list'
// import { CodeEditor } from '@/components/code-editor'

const appStore = useAppStore()
const tabs = useTabsStore()
const { functions, selectedFunction, doSelectFunction, loadFunctions } = useFunctionsStore()

onMounted(async () => {
    appStore.toggleLoading()

    tabs.observe()
    await tabs.loadTabs().catch(console.error)
    await loadFunctions().catch(console.error)

    // appStore.toggleLoading()
})

onBeforeUnmount(() => tabs.destroy())
</script>

<template>
    <div class="relative flex h-screen max-h-screen min-w-[800px] flex-col overflow-hidden">
        <TobBar />

        <main class="flex flex-grow overflow-auto">
            <div class="side-panel left-side-panel">
                <FunctionsList :items="functions" @item:click="doSelectFunction($event.id)" />
            </div>
            <div class="flex h-full w-full overflow-hidden bg-white p-2 dark:bg-black">
                <pre>{{ selectedFunction?.script }}</pre>
                <!--<CodeEditor :model-value="selected?.script" />-->
            </div>
            <div class="side-panel right-side-panel" v-if="selectedFunction">
                <pre>
                    {{ selectedFunction }}
                </pre>
            </div>
        </main>

        <BottomBar />
    </div>
</template>

<style scoped>
.side-panel {
    @apply flex h-full flex-col overflow-auto bg-base-100 pb-1 dark:bg-base-950 dark:text-base-100;
}
.left-side-panel {
    width: 300px;
}
.right-side-panel {
    width: 500px;
}
</style>
