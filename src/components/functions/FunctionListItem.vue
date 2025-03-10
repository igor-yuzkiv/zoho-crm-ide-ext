<script setup>
import FunctionIcon from '@/components/functions/FunctionIcon.vue'

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
})
</script>

<template>
    <div
        :title="`${item.type} | ${item.api_name} | ${item.display_name}`"
        class="flex cursor-pointer items-center gap-x-1 p-1 text-black dark:text-white"
        :class="[item.is_active ? 'bg-gray-200 opacity-100 dark:bg-gray-700' : 'opacity-60 hover:opacity-100']"
    >
        <FunctionIcon :type="props.item.type" class="h-5 w-5 shrink-0" />
        {{ item.api_name }}
    </div>
</template>

<style scoped></style>
