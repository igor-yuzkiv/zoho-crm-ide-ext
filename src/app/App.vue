<script setup lang="ts">
import { useTabsStore } from '@/entities/tab/useTabsStore.ts'
import { useAppStore } from '@/app/useAppStore.ts'
import { onBeforeUnmount, onMounted } from 'vue'
import { LoadingIndicator } from '@//components/loading-indicator'

const appStore = useAppStore()
const tabsStore = useTabsStore()

onMounted(() => {
    appStore.toggleLoader()

    tabsStore.observe()
    tabsStore
        .loadTabs()
        .catch(console.error)
        .finally(() => {
            appStore.toggleLoader()
            appStore.appReady = true
        })
})

onBeforeUnmount(() => tabsStore.destroy())
</script>

<template>
    <div class="bg-base-50 flex h-screen w-screen">
        <main class="flex flex-grow flex-col">
            <router-view v-if="appStore.appReady" />
        </main>

        <LoadingIndicator v-if="appStore.showLoader" />
    </div>
</template>

<style scoped></style>
