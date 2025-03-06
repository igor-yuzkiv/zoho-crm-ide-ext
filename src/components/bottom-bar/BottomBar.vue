<script setup>
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'

const workspace = useWorkspaceStore()
</script>

<template>
    <div class="flex h-8 w-full items-center justify-between bg-gray-100 px-2 dark:bg-gray-800">
        <div class="flex items-center gap-x-1">
            <div v-if="workspace.provider">{{ workspace.provider.title }}</div>
        </div>

        <div v-if="workspace.isLoading">Loading...</div>
    </div>
</template>

<style scoped></style>
