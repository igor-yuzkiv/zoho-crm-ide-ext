<script setup>
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { onMounted } from 'vue'
import Button from 'primevue/button'
import { fetchFunctionDetails } from '@/api/zoho-crm.api.js'

const workspace = useWorkspaceStore()

async function loadFunction() {
    await workspace.loadFunctions()
}

async function loadFunctionDetails() {
    // const {id, meta} = workspace.functions[0] || {}
    //
    //
    //
    // console.log(
    //     'workspace.serviceProvider.fetchFunctionDetails(item)',
    //     await workspace.serviceProvider.fetchFunctionDetails(item)
    // )

    const fns = []

    const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    for (const item of workspace.functions) {
        const { id, metadata } = item
        if (!id || !metadata) {
            continue
        }

        const response = await fetchFunctionDetails(workspace.serviceProvider.tab.id, id, {
            category: metadata.category || 'automation',
            source: metadata.source || 'crm',
            language: metadata.language || 'deluge',
        })

        if (response) {
            fns.push(response)
        }

        console.log('id-' + id)
        await sleep(100)
    }

    console.log('fns', fns)
}

onMounted(() => {})
</script>
<template>
    <div class="flex h-full w-full flex-col items-center justify-center">
        <div class="text-4xl text-gray-500">Function not selected</div>
        <Button @click="loadFunction">loadFunction</Button>
        <Button @click="loadFunctionDetails">loadFunctionDetails</Button>
    </div>
</template>
