<script setup>
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { onMounted } from 'vue'
import Button from 'primevue/button'

const workspace = useWorkspaceStore()

async function test() {
    await workspace.loadFunctions()
}

onMounted(() => {})
</script>
<template>
    <div class="flex h-full w-full flex-col items-center justify-center">
        <div class="text-4xl text-gray-500">Function not selected</div>
        <Button @click="test">test</Button>
    </div>
</template>
