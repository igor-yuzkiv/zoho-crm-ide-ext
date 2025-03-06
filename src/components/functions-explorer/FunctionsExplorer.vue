<script setup>
import ExplorerItem from '@/components/functions-explorer/ExplorerItem.vue'

defineProps({
    functions: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <ul>
        <ExplorerItem v-for="item in functions" :key="item.id" :item="item" />
    </ul>
</template>

<style scoped></style>
