<script setup>
import Button from 'primevue/button'
import { Icon } from '@iconify/vue'

defineProps({
    loading: {
        type: Boolean,
        required: true,
    },
})
</script>

<template>
    <Button text icon="" :disabled="loading">
        <template #icon>
            <Icon
                :icon="loading ? 'eos-icons:spinner' : 'ic:twotone-refresh'"
                class="h-5 w-5"
                :class="{ 'animate-spin': loading }"
            />
        </template>
    </Button>
</template>

<style scoped></style>
