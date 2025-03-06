<script setup>
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed } from 'vue'

const workspace = useWorkspaceStore()
const functionsCount = computed(() => workspace.functions.length)
</script>

<template>
    <div class="flex h-8 w-full items-center justify-between bg-gray-100 px-2 dark:bg-gray-800">
        <div class="flex items-center">
            <div class="border-r px-1" v-if="workspace.provider">
                {{ workspace.provider.title }}
            </div>

            <div class="border-r px-1">
                <span>fn: </span>
                <span>{{ functionsCount }}</span>
            </div>
        </div>

        <div v-if="workspace.isLoading">Loading...</div>
    </div>
</template>

<style scoped></style>
