<script setup>
import { FunctionTypeMeta } from '@/config/index.js'
import { AppRouteName } from '@/router.js'
import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useServiceProvidersStore } from '@/store/useServiceProvidersStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import SelectButton from 'primevue/selectbutton'
import CodeBlock from '@/components/code-block/CodeBlock.vue'
import FunctionIcon from '@/components/functions/FunctionIcon.vue'
import RefreshButton from '@/components/refresh-button/RefreshButton.vue'

const searchScopeOptions = [
    { label: 'Current Provider', name: 'current' },
    { label: 'All Providers', name: 'all' },
]

const visible = defineModel('visible', { type: Boolean })

const router = useRouter()

const workspace = useWorkspaceStore()
const providersStore = useServiceProvidersStore()
const functionsStore = useFunctionsStore()

const isLoading = ref(false)
const selectedSearchScope = ref('current')
const useRegex = ref(false)
const selectedFunctionType = ref(null)
const searchInput = ref('')
const searchResults = ref([])
const selectedFunction = ref(null)
const codePreview = ref('')

const mapFunctionItem = (provider_id, item) => ({
    id: item.id,
    api_name: item.api_name,
    script: item?.script,
    provider_id,
    provider_name: providersStore.providersMap[provider_id]?.title || 'Unknown Provider',
    type: item.type,
    matchIndex: -1,
    matchedLine: '',
})

const functionsForSearch = computed(() => {
    return Object.entries(functionsStore.functionPerProvider).flatMap(([provider_id, functions]) =>
        functions.map((i) => mapFunctionItem(provider_id, i))
    )
})

function getMatchingLines(script, matchIndex, contextLines = 1) {
    if (!script || matchIndex < 0) return null;

    const lines = script.split('\n');
    let lineIndex = script.slice(0, matchIndex).split('\n').length - 1;

    return lines.slice(Math.max(0, lineIndex - contextLines), lineIndex + contextLines + 1).join('\n');
}

function executeSearch() {
    codePreview.value = ''
    selectedFunction.value = null

    const searchRegex = useRegex.value ? new RegExp(searchInput.value, 'gm') : null

    searchResults.value = functionsForSearch.value
        .filter(
            (i) =>
                i.script &&
                (selectedSearchScope.value !== 'current' || i.provider_id === workspace.provider?.id) &&
                (!selectedFunctionType.value || i.type === selectedFunctionType.value)
        )
        .map((i) => {
            const index = searchRegex ? i.script.search(searchRegex) : i.script.toLowerCase().indexOf(searchInput.value.toLowerCase())

            return index !== -1 ? { ...i, matchIndex: index, matchedLine: getMatchingLines(i.script, index, 0) } : null
        })
        .filter(Boolean)

    if (searchResults.value.length > 0) {
        onSelectFunction(searchResults.value[0])
    }
}

function onSelectFunction(item) {
    selectedFunction.value = item
    codePreview.value = item.matchIndex !== -1 ? getMatchingLines(item.script, item.matchIndex, 4) : item.script
}

async function onClickJumpToFunction() {
    const { id, provider_id } = selectedFunction.value || {}
    if (!id || !provider_id) {
        return
    }

    if (workspace.provider?.id !== provider_id) {
        workspace.setProvider(provider_id)
    }

    await router.push({
        name: AppRouteName.functionOverview,
        params: { function_id: id },
    })

    visible.value = false
}
</script>

<template>
    <Dialog
        header="Search"
        v-model:visible="visible"
        modal
        class="w-[98%] border-none lg:w-3/4"
        :draggable="false"
        :pt="{ header: { class: 'p-2' }, footer: { class: 'p-2 bg-gray-100 dark:bg-black rounded-b-lg' } }"
        content-class="p-0 overflow-hidden flex flex-col"
    >
        <div class="flex w-full flex-col bg-gray-100 p-1 dark:bg-black">
            <div class="mt-1 flex w-full items-center gap-x-1 p-1">
                <Button
                    :text="!useRegex"
                    :severity="useRegex ? 'success' : 'secondary'"
                    size="small"
                    title="Regex"
                    @click="useRegex = !useRegex"
                >
                    [.*]
                </Button>
                <InputText
                    placeholder="Search..."
                    class="w-full"
                    v-model.trim="searchInput"
                    @keyup.enter="executeSearch"
                />
                <Select
                    :options="Object.values(FunctionTypeMeta)"
                    option-label="title"
                    option-value="name"
                    size="small"
                    placeholder="Type"
                    show-clear
                    v-model="selectedFunctionType"
                />
                <RefreshButton :loading="isLoading" icon="material-symbols:search" @click="executeSearch" />
            </div>
        </div>

        <div class="flex flex-col overflow-auto">
            <ul v-if="searchResults.length > 0">
                <li
                    v-for="item in searchResults"
                    :key="`${item.provider_id - item.id}`"
                    class="flex cursor-pointer items-center justify-between gap-x-3 truncate rounded px-2 py-1"
                    @click="onSelectFunction(item)"
                    :class="
                        selectedFunction?.id === item.id
                            ? 'bg-gray-200 dark:bg-gray-700'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                    "
                >
                    <div class="truncate">{{ item.matchedLine || item.api_name }}</div>
                    <div class="flex items-center gap-x-1 text-gray-500">
                        <span class="border-r border-gray-500 px-1">{{ item.api_name }}</span>
                        <span class="border-r border-gray-500 px-1">{{ item.provider_name }}</span>
                        <FunctionIcon :type="item.type" />
                    </div>
                </li>
            </ul>
            <div v-else class="flex w-full items-center justify-center py-3 text-lg text-gray-600 dark:text-gray-200">
                No matches found
            </div>
        </div>

        <div class="flex max-h-[400px] w-full shrink-0 flex-col border-t" v-if="selectedFunction">
            <div class="flex items-center justify-between px-2">
                <div class="flex items-center gap-x-1">
                    <FunctionIcon :type="selectedFunction.type" class="h-5 w-5" />
                    <h2 class="font-bold">{{ selectedFunction.api_name }}</h2>
                </div>

                <Button text size="small" severity="info" @click="onClickJumpToFunction">Jump to function</Button>
            </div>
            <CodeBlock :code="codePreview" />
        </div>

        <template #footer>
            <div class="flex w-full items-center">
                <SelectButton
                    v-model="selectedSearchScope"
                    :options="searchScopeOptions"
                    class="bg-transparent"
                    size="small"
                    option-label="label"
                    option-value="name"
                />
            </div>
        </template>
    </Dialog>
</template>

<style scoped></style>
