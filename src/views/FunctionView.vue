<script setup>
import { AppRouteName } from '@/router.js'
import { useAppStore } from '@/store/useAppStore.js'
import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed, onBeforeMount, reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Select from 'primevue/select'
import templates from '@/config/templates/index.js'
import RefreshButton from '@/components/refresh-button/RefreshButton.vue'

const EditorContentConfig = {
    code: {
        label: 'Code',
        name: 'code',
        language: 'javascript',
        getValue: () => selectedFunction.value?.script || '// No function code found',
    },
    documentation: {
        label: 'Documentation',
        name: 'documentation',
        language: 'markdown',
        getValue: () => selectedFunction.value?.documentation || templates.functionDoc,
    },
    metadata: {
        label: 'Metadata',
        name: 'metadata',
        language: 'json',
        getValue: () => JSON.stringify(selectedFunction.value, null, 2),
    },
}

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

function onClickSaveDocumentation() {
    functionsStore.setFunctions(workspace.provider.id, [
        {
            ...selectedFunction.value,
            documentation: editorState.value,
        },
    ])
}

watchEffect(() => {
    if (!selectedFunction.value) {
        router.push({ name: AppRouteName.home }).catch(console.error)
        return
    }

    const { language, getValue } = EditorContentConfig[currentView.value] || EditorContentConfig.code
    editorState.language = language
    editorState.value = getValue()
})

onBeforeMount(() => {
    if (!workspace.provider?.id || !selectedFunction.value) {
        router.push({ name: AppRouteName.home })
    }
})
</script>

<template>
    <div class="flex h-full w-full flex-col overflow-hidden" v-if="selectedFunction">
        <div
            class="flex-0 flex w-full items-center justify-between border-b border-gray-200 px-1 font-bold dark:border-gray-500 dark:bg-gray-800"
        >
            <div class="flex items-center gap-x-1">
                <RefreshButton :loading="functionsStore.isLoading" @click="onClickRefreshFunction" />

                <div>{{ selectedFunction?.api_name }} | {{ selectedFunction?.type }}</div>
            </div>

            <div class="flex items-center gap-x-1">
                <Button
                    text
                    v-if="currentView === 'documentation'"
                    icon="pi pi-save"
                    size="small"
                    @click="onClickSaveDocumentation"
                />
                <Select
                    v-model="currentView"
                    :options="Object.values(EditorContentConfig)"
                    class="border-none shadow-none"
                    size="small"
                    option-label="label"
                    option-value="name"
                />
            </div>
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
