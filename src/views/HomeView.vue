<script setup>
import { ZohoCrmServiceProvider } from '@/services/service-providers/index.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'

const workspace = useWorkspaceStore()
const testSp = ref()
async function test() {
    await workspace.loadFunctions()

    console.log(workspace.getFunctions())
}

onMounted(() => {
    testSp.value = new ZohoCrmServiceProvider({ id: 1 })
})
</script>
<template>
    <div class="flex h-full w-full items-center justify-center">
        <div class="text-4xl text-gray-500">
            Home Page
            <Button @click="test">test</Button>
        </div>
    </div>
</template>
