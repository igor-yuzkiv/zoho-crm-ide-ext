<script setup>
import ExplorerItem from '@/components/functions-explorer/ExplorerItem.vue'

defineEmits(['click'])
defineProps({
    functions: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <ul>
        <ExplorerItem v-for="item in functions" :key="item.id" :item="item" @click="$emit('click', item)" />
    </ul>
</template>

<style scoped></style>
