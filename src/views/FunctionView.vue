<script setup>
import { AppRouteName } from '@/router.js'
import { useAppStore } from '@/store/useAppStore.js'
import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed, onBeforeMount, reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import Tabs from 'primevue/tabs'
import RefreshButton from '@/components/refresh-button/RefreshButton.vue'

const EditorContentConfig = {
    code: { language: 'javascript', getValue: () => selectedFunction.value?.script || '// No function code found' },
    documentation: {
        language: 'markdown',
        getValue: () => selectedFunction.value?.documentation || '**No documentation found!**',
    },
    metadata: { language: 'json', getValue: () => JSON.stringify(selectedFunction.value, null, 2) },
}

const ViewItems = [
    { title: 'Code', name: 'code' },
    { title: 'Documentation', name: 'documentation' },
    { title: 'Metadata', name: 'metadata' },
]

const router = useRouter()
const route = useRoute()

const appStore = useAppStore()
const workspace = useWorkspaceStore()
const functionsStore = useFunctionsStore()

const selectedFunction = computed(() => {
    return (
        functionsStore.getFunctions(workspace.provider?.id).find((item) => item.id === route.params?.function_id) ||
        null
    )
})

const currentView = ref('code')
const editorState = reactive({ language: 'javascript', value: '' })

function onClickRefreshFunction() {
    functionsStore.refreshFunction(workspace.provider, selectedFunction.value)
}

watchEffect(() => {
    if (!selectedFunction.value) {
        return
    }

    const { language, getValue } = EditorContentConfig[currentView.value] || EditorContentConfig.code
    editorState.language = language
    editorState.value = getValue()
})

onBeforeMount(() => {
    if (!workspace.provider?.id) {
        router.push({ name: AppRouteName.home })
    }
})
</script>

<template>
    <div class="flex h-full w-full flex-col overflow-hidden" v-if="selectedFunction">
        <div
            class="flex-0 flex w-full items-center justify-between border-b border-gray-200 px-2 font-bold dark:border-gray-500 dark:bg-gray-800"
        >
            <div class="flex items-center gap-x-1">
                <RefreshButton
                    :loading="functionsStore.isLoading"
                    @click="onClickRefreshFunction"
                />

                <div>{{ selectedFunction?.api_name }} | {{ selectedFunction?.type }}</div>
            </div>

            <Tabs :value="currentView">
                <TabList>
                    <Tab
                        class="px-2 py-1 dark:bg-gray-800"
                        v-for="item in ViewItems"
                        :key="item.name"
                        :value="item.name"
                        @click="currentView = item.name"
                    >
                        {{ item.title }}
                    </Tab>
                </TabList>
            </Tabs>
        </div>

        <div class="flex-coll flex flex-1 overflow-auto">
            <vue-monaco-editor
                :language="editorState.language"
                v-model:value="editorState.value"
                :theme="appStore.isDarkTheme ? 'vs-dark' : null"
            />
        </div>
    </div>
</template>

<style scoped></style>
