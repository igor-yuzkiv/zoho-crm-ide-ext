<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ExplorerItem from '@/components/functions-explorer/ExplorerItem.vue'

defineEmits(['click'])
const props = defineProps({
    functions: {
        type: Array,
        default: () => [],
    },
})

const route = useRoute()
const itemsForDisplay = computed(() => {
    return props.functions.map((i) => {
        return { ...i, is_active: route.params?.function_id === i.id }
    })
})
</script>

<template>
    <ul>
        <ExplorerItem v-for="item in itemsForDisplay" :key="item.id" :item="item" @click="$emit('click', item)" />
    </ul>
</template>

<style scoped></style>
