<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useAppStore } from '@/app/useAppStore.ts'

const appStore = useAppStore()
</script>

<template>
    <div
        class="flex h-[24px] w-full items-center justify-between bg-base-600 px-4 text-[15px] font-medium text-white dark:bg-base-800"
    >
        <div></div>
        <div class="flex items-center gap-x-1">
            <Icon v-if="appStore.isLoading" icon="prime:spinner" class="h-5 w-5 animate-spin" />
        </div>
    </div>
</template>

<style scoped></style>
