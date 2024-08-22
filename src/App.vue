<script setup lang="ts">
import { CrmFunction } from '@/types.ts'

import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useTabsStore } from '@/store/useTabsStore.ts'
import { useFunctionsStore } from '@/store/useFunctionsStore.ts'
import { createZipAndDownload } from '@/utils.ts'

import { Icon } from '@iconify/vue'
import InputText from 'primevue/inputtext'
import CodeEditor from '@/components/CodeEditor.vue'
import FunctionsList from '@/components/FunctionsList.vue'
import FunctionInfo from '@/components/FunctionInfo.vue'

const tabsStore = useTabsStore()
const { functions, selectedFunction, doSelectFunction, loadFunctions } = useFunctionsStore()

const isLoading = ref(false)
const isVisibleSearchBar = ref(false)

onMounted(async () => {
    isLoading.value = true

    tabsStore.observe()
    await tabsStore.loadTabs()
    await loadFunctions()

    isLoading.value = false
})

const searchInput = ref('')
const functionsForDisplay = computed(() => {
    const search = searchInput.value.toLowerCase()
    return functions.value.filter((item) => JSON.stringify(item).toLowerCase().includes(search))
})

async function onClickExport() {
    isLoading.value = true

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

    isLoading.value = false
}

onBeforeUnmount(() => tabsStore.destroy())
</script>

<template>
    <div class="relative flex h-screen max-h-screen min-w-[800px] flex-col overflow-hidden">
        <div class="bar gap-x-4">
            <button
                class="hover:underline"
                @click="onClickExport"
                :disabled="isLoading"
                :class="{ 'opacity-50': isLoading }"
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

        <main class="flex h-full w-full overflow-auto">
            <FunctionsList
                :items="functionsForDisplay"
                @item:click="doSelectFunction($event.id)"
                class="side-panel w-[15vw]"
            />

            <CodeEditor
                :model-value="selectedFunction?.script"
                :class="['h-full', selectedFunction ? 'w-[65vw]' : 'w-[85vw]']"
            />

            <FunctionInfo v-if="selectedFunction" :info="selectedFunction" class="side-panel w-[20vw]" />
        </main>

        <div class="bar">
            <Icon v-if="isLoading" icon="prime:spinner" class="h-5 w-5 animate-spin"></Icon>
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
