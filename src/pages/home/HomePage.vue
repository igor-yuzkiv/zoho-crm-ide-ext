<script setup lang="ts">
import { CodeEditor } from '@//components/code-editor'
import FunctionsList from '@//components/functions-list/ui/FunctionsList.vue'
import { useFunctionsStore } from '@/entities/function/useFunctionsStore.ts'
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/app/useAppStore.ts'
import { CrmFunction } from '@/entities/function/types.ts'
import { BottomBar } from '@/components/bottom-bar'
import { TobBar } from '@/components/top-bar'

const appStore = useAppStore()
const functionsStore = useFunctionsStore()
const functionScript = ref<string>('')

async function onClickFunction(item: CrmFunction) {
    functionScript.value = item?.script || ''
    functionsStore.selectFunction(item.id)
}

onMounted(() => {
    appStore.toggleLoading()
    functionsStore.loadFunctions().finally(() => appStore.toggleLoading())
})
</script>

<template>
    <div class="flex h-full w-full flex-col overflow-hidden">
        <TobBar />

        <div class="flex h-full w-full overflow-auto">
            <div class="bg-base-100 dark:bg-base-950 dark:text-base-100 flex h-full w-72 flex-col overflow-auto pb-1">
                <FunctionsList :items="functionsStore.functions.value" @item:click="onClickFunction" />
            </div>
            <div class="flex-grow bg-white p-2 dark:bg-black">
                <!--                <pre>{{ functionScript }}</pre>-->
                <CodeEditor v-model="functionScript" />
            </div>
        </div>

        <BottomBar />
    </div>
</template>

<style scoped></style>
