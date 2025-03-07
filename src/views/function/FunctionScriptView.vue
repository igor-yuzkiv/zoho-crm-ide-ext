<script setup>
import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CodeBlock from '@/components/code-block/CodeBlock.vue'

const workspace = useWorkspaceStore()
const functionsStore = useFunctionsStore()
const route = useRoute()

const functionDetails = computed(() => {
    if (!route.params.id || !workspace.provider?.id) {
        return null
    }
    return functionsStore.getFunctions(workspace.provider.id).find((item) => item.id === route.params.id)
})
</script>

<template>
    <CodeBlock class="h-full w-full p-2" :code="functionDetails?.script" />
</template>

<style scoped></style>
