<script setup>
import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed } from 'vue'

const workspace = useWorkspaceStore()
const functionsStore = useFunctionsStore()
const functionsCount = computed(() => workspace.functions.length)

function onClickLoadFunctions() {
    functionsStore.loadFunctions(workspace.provider, true)
}

function inClickInvalidCache() {
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
                <span>fn: </span>
                <span>{{ functionsCount }}</span>
            </div>

            <div class="cursor-pointer border-r px-1 hover:underline" @click="onClickLoadFunctions">
                Refresh functions
            </div>
            <div class="cursor-pointer px-1 hover:underline" @click="inClickInvalidCache">Invalid cache</div>
        </div>

        <div v-if="workspace.isLoading || functionsStore.isLoading">Loading...</div>
    </div>
</template>

<style scoped></style>
