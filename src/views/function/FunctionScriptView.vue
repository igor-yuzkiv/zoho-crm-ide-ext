<script setup>
import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const workspace = useWorkspaceStore()
const functionsStore = useFunctionsStore()
const route = useRoute()

const functionDetails = computed(() => {
    return functionsStore.getFunctions(workspace.provider.id).find((item) => item.id === route.params.id)
})
</script>

<template>
    <pre>
        {{ functionDetails }}
    </pre>
</template>

<style scoped></style>
