<script setup>
import { TopBarMenu } from '@/components/top-bar-menu'
</script>

<template>
    <div class="flex min-h-screen w-full flex-col overflow-hidden dark:bg-gray-900 dark:text-white">
        <TopBarMenu />
        <main class="flex flex-grow flex-col overflow-auto"></main>
    </div>
</template>

<style scoped></style>
