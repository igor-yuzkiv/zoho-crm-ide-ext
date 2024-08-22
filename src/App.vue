<script setup lang="ts">
import { CrmFunction } from '@/types.ts'

import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useAppStore } from '@/store/useAppStore.ts'
import { useTabsStore } from '@/store/useTabsStore.ts'
import { useFunctionsStore } from '@/store/useFunctionsStore.ts'
import { createZipAndDownload } from '@/utils.ts'

import { Icon } from '@iconify/vue'
import InputText from 'primevue/inputtext'
import CodeEditor from '@/components/CodeEditor.vue'
import FunctionsList from '@/components/FunctionsList.vue'
import FunctionInfo from '@/components/FunctionInfo.vue'

const appStore = useAppStore()
const tabsStore = useTabsStore()
const { functions, selectedFunction, doSelectFunction, loadFunctions } = useFunctionsStore()
const isVisibleSearchBar = ref(false)

onMounted(async () => {
    appStore.toggleLoading()

    tabsStore.observe()
    await tabsStore.loadTabs()
    await loadFunctions()

    appStore.toggleLoading()
})

const searchInput = ref('')
const functionsForDisplay = computed(() => {
    const search = searchInput.value.toLowerCase()
    return functions.value.filter((item) => JSON.stringify(item).toLowerCase().includes(search))
})

async function onClickExport() {
    appStore.toggleLoading()

    const items = functions.value.reduce((acc: Array<{ name: string; content: string }>, item: CrmFunction) => {
        if (item?.script) {
            acc.push({
                name: `${item.name}.deluge.js`,
                content: item.script,
            })
        }
        acc.push({
            name: `${item.name}.meta.json`,
            content: JSON.stringify(item, null, 2),
        })

        return acc
    }, [])

    await createZipAndDownload(items)
}

onBeforeUnmount(() => tabsStore.destroy())
</script>

<template>
    <div class="relative flex h-screen max-h-screen min-w-[800px] flex-col overflow-hidden">
        <div class="bar gap-x-4">
            <button
                class="hover:underline"
                @click="onClickExport"
                :disabled="appStore.isLoading"
                :class="{ 'opacity-50': appStore.isLoading }"
            >
                Export
            </button>
            <button class="hover:underline" @click="isVisibleSearchBar = true">Search</button>
        </div>

        <div class="flex w-full" v-if="isVisibleSearchBar">
            <InputText
                placeholder="Start typing to search..."
                size="small"
                class="w-full"
                v-model.trim.lazy="searchInput"
            />
        </div>

        <main class="flex flex-1 overflow-auto">
            <FunctionsList
                v-if="[0, 2].includes(appStore.layoutView)"
                :items="functionsForDisplay"
                @item:click="doSelectFunction($event.id)"
                class="side-panel"
                :style="{ width: '300px' }"
            />

            <CodeEditor :model-value="selectedFunction?.script" />
            <!--<div class="flex flex-1 overflow-auto bg-white p-2 dark:bg-black"><pre>{{ selectedFunction?.script }}</pre></div>-->

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
