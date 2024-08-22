<script setup lang="ts">
import { CodeEditor } from '@//components/code-editor'
import FunctionsList from '@//components/functions-list/ui/FunctionsList.vue'
import { useFunctionsStore } from '@/entities/function/useFunctionsStore.ts'
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/app/useAppStore.ts'
import { CrmFunction } from '@/entities/function/types.ts'

const appStore = useAppStore()
const functionsStore = useFunctionsStore()
const functionScript = ref<string>('')

async function onClickFunction(item: CrmFunction) {
    if (item?.script) {
        functionScript.value = item.script
        console.log('details', item)
    } else {
        const details = await functionsStore.loadFunctionDetail(item.id)
        console.log('details', details)
        functionScript.value = details?.script || ''
    }
    functionsStore.selectFunction(item.id)
}

onMounted(() => {
    appStore.toggleLoader()
    functionsStore.loadFunctions().finally(() => appStore.toggleLoader())
})
</script>

<template>
    <div class="flex h-full w-full flex-col overflow-hidden">
        <div
            class="bg-base-800 flex h-[24px] w-full items-center justify-between px-4 text-[15px] font-medium text-white"
        >
            <div class="flex items-center gap-x-4">
                <div class="cursor-pointer hover:underline">File</div>
                <div class="cursor-pointer hover:underline">View</div>
                <div class="cursor-pointer hover:underline">Search</div>
            </div>
            <div>
                <div class="text-right" v-if="functionsStore.selectedFunction.value">
                    {{ functionsStore.selectedFunction.value.display_name }}
                </div>
            </div>
        </div>

        <div class="flex h-full w-full overflow-auto">
            <div class="bg-base-200 dark:bg-base-950 dark:text-base-100 flex h-full w-72 flex-col overflow-auto pb-1">
                <FunctionsList :items="functionsStore.functions.value" @item:click="onClickFunction" />
            </div>
            <div class="flex-grow bg-white p-2 dark:bg-black">
                <!--<pre>{{ functionScript }}</pre>-->
                <CodeEditor v-model="functionScript" />
            </div>
        </div>

        <div
            class="bg-base-800 flex h-[24px] w-full items-center justify-between px-4 text-[15px] font-medium text-white"
        >
            <span class="text-sm"> Synchronization... </span>
        </div>
    </div>
</template>

<style scoped></style>
