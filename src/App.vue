<script setup>
import { TopBarMenu } from '@/components/top-bar-menu'
</script>

<template>
    <div class="relative flex h-screen w-full min-w-[400px] flex-col overflow-hidden dark:bg-gray-900 dark:text-white">
        <TopBarMenu />
        <main class="flex flex-grow flex-col overflow-auto">
            <router-view />
        </main>
    </div>
</template>

<style scoped></style>
