<script setup>
import Button from 'primevue/button'
import { Icon } from '@iconify/vue'

defineProps({
    loading: {
        type: Boolean,
        required: true,
    },
    icon: {
        type: String,
        default: 'ic:twotone-refresh',
    },
    loadingIcon: {
        type: String,
        default: 'eos-icons:spinner',
    }
})
</script>

<template>
    <Button text icon="" :disabled="loading">
        <template #icon>
            <Icon
                :icon="loading ? loadingIcon : icon"
                class="h-5 w-5"
                :class="{ 'animate-spin': loading }"
            />
        </template>
    </Button>
</template>

<style scoped></style>
