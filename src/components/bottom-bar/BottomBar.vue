<script setup>
import { useAppStore } from '@/store/useAppStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import Button from 'primevue/button'

const appStore = useAppStore()
const workspace = useWorkspaceStore()
</script>

<template>
    <div class="flex h-8 w-full items-center justify-between bg-gray-100 px-2 dark:bg-gray-800">
        <div class="flex items-center">
            <div class="item">Functions: {{ workspace.functions.length }}</div>
            <div class="item" @click="workspace.clearCache()">Invalid cache</div>
        </div>

        <Button
            size="sm"
            text
            :icon="appStore.isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'"
            @click="appStore.toggleTheme()"
        >
        </Button>
    </div>
</template>

<style scoped>
.item {
    @apply cursor-pointer border-r border-gray-800 px-1 hover:underline dark:border-gray-100;
}
</style>
