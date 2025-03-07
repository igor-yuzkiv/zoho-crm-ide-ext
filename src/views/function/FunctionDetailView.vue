<script setup>
import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

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
    <div class="flex h-full w-full flex-col overflow-auto">
        <div
            class="flex w-full items-center border-b border-gray-200 px-2 font-bold dark:border-gray-500 dark:bg-gray-800"
        >
            {{ functionDetails?.type }} | {{ functionDetails?.api_name }}
        </div>
        <router-view></router-view>
    </div>
</template>

<style scoped></style>
