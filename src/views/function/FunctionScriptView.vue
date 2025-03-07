<script setup>
import { useAppStore } from '@/store/useAppStore.js'
import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const appStore = useAppStore()
const workspace = useWorkspaceStore()
const functionsStore = useFunctionsStore()
const route = useRoute()
const code = ref('')

const functionDetails = computed(() => {
    if (!route.params.function_id || !workspace.provider?.id) {
        return null
    }
    return functionsStore.getFunctions(workspace.provider.id).find((item) => item.id === route.params.function_id)
})

watch(
    () => route.params.function_id,
    () => {
        if (functionDetails.value) {
            code.value = functionDetails.value?.script || '// No function code found'
        }
    }
)
</script>

<template>
    <vue-monaco-editor language="javascript" v-model:value="code" :theme="appStore.isDarkTheme ? 'vs-dark' : 'vs'" />
</template>

<style scoped></style>
