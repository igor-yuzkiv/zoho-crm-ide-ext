<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { FunctionTypeMeta } from '@/config.js'

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
})

const itemIcon = computed(() => FunctionTypeMeta[props.item.type]?.icon || FunctionTypeMeta.unknown.icon)
const itemColor = computed(() => FunctionTypeMeta[props.item.type]?.color || FunctionTypeMeta.unknown.color)
</script>

<template>
    <li
        :title="`${item.type} | ${item.api_name} | ${item.display_name}`"
        class="flex cursor-pointer items-center gap-x-1 p-1 text-black dark:text-white"
        :class="[item.is_active ? 'bg-gray-200 opacity-100 dark:bg-gray-700' : 'opacity-60 hover:opacity-100']"
    >
        <Icon :icon="itemIcon" class="h-5 w-5 shrink-0" :style="{ color: itemColor }" />
        {{ item.api_name }}
    </li>
</template>

<style scoped></style>
