<script setup>
import { FunctionTypeMeta } from '@/config/index.js'
import { Icon } from '@iconify/vue'

defineProps({ type: String })
</script>

<template>
    <Icon
        class="shrink-0"
        :title="FunctionTypeMeta[type]?.title || 'Unknown Function Type'"
        :icon="FunctionTypeMeta[type]?.icon || FunctionTypeMeta.unknown.icon"
        :style="{ color: FunctionTypeMeta[type]?.color || FunctionTypeMeta.unknown.color }"
    />
</template>

<style scoped></style>
