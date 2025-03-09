<script setup>
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import Button from 'primevue/button'
import { fetchZohoFinanceFunctionDetails, fetchZohoFinanceFunctions } from '@/api/zoho-finance.api.js'

const workspace = useWorkspaceStore()

async function test() {
    //await fetchZohoFinanceFunctions(workspace.provider.tab.id, workspace.provider.metadata.org_id)

    const functionsDetails = [];

    // for (const item of workspace.functions) {
    //     console.log(item);
    // }

    const testF = workspace.functions[0];

    const response = await fetchZohoFinanceFunctionDetails(
        workspace.provider.tab.id,
        workspace.provider.metadata.org_id,
        testF.id
    )

    console.log(response);
}
</script>
<template>
    <div class="flex h-full w-full flex-col items-center justify-center">
        <div class="text-4xl text-gray-500">
            Function not selected
            <Button @click="test">Test</Button>
        </div>
    </div>
</template>
