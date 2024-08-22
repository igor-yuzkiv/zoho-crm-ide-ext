<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
    <div
        class="bg-base-600 dark:bg-base-800 flex h-[24px] w-full items-center justify-between px-4 text-[15px] font-medium text-white"
    >
        <div></div>
        <div class="flex items-center gap-x-1">
            <Icon icon="prime:spinner" class="h-5 w-5 animate-spin" />
        </div>
    </div>
</template>

<style scoped></style>
