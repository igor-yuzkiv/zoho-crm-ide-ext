<script setup>
import { computed } from 'vue'
import Select from 'primevue/select'
import { Icon } from '@iconify/vue'

const modelValue = defineModel()

const props = defineProps({
    providers: {
        type: Array,
        default: () => [],
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})

const options = computed(() => {
    const groupedBy = Object.groupBy(
        props.providers.map((item) => ({
            label: item.title,
            value: item.id,
            isConnected: item.isConnected,
        })),
        (i) => i.isConnected
    )

    return [
        {
            label: 'Connected',
            items: groupedBy.true,
        },
        {
            label: 'Not Connected',
            items: groupedBy.false,
        }
    ];
})
</script>

<template>
    <Select
        :options="options"
        v-model="modelValue"
        option-label="label"
        option-value="value"
        placeholder="-- Service Provider --"
        :disabled="disabled"
        optionGroupLabel="label"
        optionGroupChildren="items"
    >
        <template #value>
            <div class="flex items-center gap-x-1" v-if="modelValue">
                <Icon :icon="modelValue?.isConnected ? 'pajamas:connected' : 'hugeicons:connect'" />
                {{ modelValue.title }}
            </div>
        </template>

        <template #option="{ option }">
            <div class="flex items-center gap-x-1" :class="{ 'text-gray-500': !option.isConnected }">
                <Icon :icon="option?.isConnected ? 'pajamas:connected' : 'hugeicons:connect'" />
                {{ option.label }}
            </div>
        </template>
    </Select>
</template>

<style scoped></style>
