<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
    <div class="absolute top-0 z-[99999] h-screen w-full bg-gray-100/60">
        <div class="flex h-screen flex-grow flex-col items-center justify-center">
            <Icon icon="mingcute:loading-fill" class="mr-2 h-32 w-32 animate-spin text-blue-600" />
        </div>
    </div>
</template>

<style scoped></style>
