<script setup>
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import Button from 'primevue/button'
import { fetchZohoFinanceFunctionDetails, fetchZohoFinanceFunctions } from '@/api/zoho-finance.api.js'

const workspace = useWorkspaceStore()

async function test() {
    //await fetchZohoFinanceFunctions(workspace.provider.tab.id, workspace.provider.metadata.org_id)

    const functionsDetails = [];

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (const item of workspace.functions) {
        const response = await fetchZohoFinanceFunctionDetails(
            workspace.provider.tab.id,
            workspace.provider.metadata.org_id,
            item.id
        )

        if (response) {
            functionsDetails.push(response);
        }

        await sleep(200);
    }

    console.log(functionsDetails);
}
</script>
<template>
    <div class="flex h-full w-full flex-col items-center justify-center">
        <div class="text-4xl text-gray-500" @click="test">
            Function not selected
        </div>
    </div>
</template>
