<script setup lang="ts">
import { useTabsStore } from '@/entities/tab/useTabsStore.ts'
import { useAppStore } from '@/app/useAppStore.ts'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useFunctionsStore } from '@/entities/function/useFunctionsStore.ts'
import FunctionsList from '../components/functions-list/ui/FunctionsList.vue'
import { TobBar } from '@/components/top-bar'
import { BottomBar } from '@/components/bottom-bar'
import { CrmFunction } from '@/entities/function/types.ts'

const appStore = useAppStore()
const tabsStore = useTabsStore()
const functionsStore = useFunctionsStore()
const functionScript = ref<string>('')

const onClickFunction = (item: CrmFunction) => {
    functionScript.value = item?.script || ''
    functionsStore.selectFunction(item.id)
}

onMounted(async () => {
    appStore.toggleLoading()

    tabsStore.observe()
    await tabsStore.loadTabs().catch(console.error)
    await functionsStore.loadFunctions().catch(console.error)

    appStore.toggleLoading()
})

onBeforeUnmount(() => tabsStore.destroy())
</script>

<template>
    <div class="flex h-screen w-screen flex-col overflow-hidden">
        <TobBar />

        <main class="full flex h-full w-full">
            <div class="flex h-full w-72 flex-col overflow-auto bg-base-100 pb-1 dark:bg-base-950 dark:text-base-100">
                <FunctionsList :items="functionsStore.functions.value" @item:click="onClickFunction" />
            </div>
            <div class="h-full w-full bg-white p-2 dark:bg-black">
                <pre>{{ functionScript }}</pre>
                <!--                <CodeEditor v-model="functionScript" />-->
            </div>
        </main>

        <BottomBar />
    </div>
</template>

<style scoped></style>
