<script setup>
import { useAppStore } from '@/store/useAppStore.js'
import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed } from 'vue'
import Button from 'primevue/button'

const workspace = useWorkspaceStore()
const functionsStore = useFunctionsStore()
const functionsCount = computed(() => workspace.functions.length)
const appStore = useAppStore()

function inClearCache() {
    functionsStore.clearCache(workspace.provider.id)
    functionsStore.loadFunctions(workspace.provider, false)
}
</script>

<template>
    <div class="flex h-8 w-full items-center justify-between bg-gray-100 px-2 dark:bg-gray-800">
        <div class="flex items-center">
            <div class="border-r px-1" v-if="workspace.provider">
                {{ workspace.provider.title }}
            </div>

            <div class="border-r px-1">
                <span>functions: </span>
                <span>{{ functionsCount }}</span>
            </div>

            <div class="cursor-pointer px-1 hover:underline" @click="inClearCache">clear cache</div>
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

<style scoped></style>
