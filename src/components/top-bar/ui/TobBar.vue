<script setup lang="ts"></script>

<template>
    <div
        class="bg-base-600 dark:bg-base-800 flex h-[24px] w-full items-center justify-between px-4 text-[15px] font-medium text-white"
    >
        <div class="flex items-center gap-x-4">
            <div class="cursor-pointer hover:underline">File</div>
            <div class="cursor-pointer hover:underline">View</div>
            <div class="cursor-pointer hover:underline">Search</div>
        </div>
        <div>
            <!--            <div class="text-right" v-if="functionsStore.selectedFunction.value">-->
            <!--                {{ functionsStore.selectedFunction.value.display_name }}-->
            <!--            </div>-->
        </div>
    </div>
</template>

<style scoped></style>
