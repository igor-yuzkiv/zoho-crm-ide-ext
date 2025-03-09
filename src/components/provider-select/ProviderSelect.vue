<script setup>
import { useProjectsStore } from '@/store/useProjectsStore'
import { computed } from 'vue'
import Select from 'primevue/select'
import { Icon } from '@iconify/vue'

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

const modelValue = defineModel()
const projectsStore = useProjectsStore()

const options = computed(() => {
    const projectsMap = Object.fromEntries(projectsStore.projects.map((i) => [i.id, i.name]))

    const groupedBy = Object.groupBy(
        props.providers.map((item) => ({
            label: item.title,
            value: item.id,
            isConnected: item.isConnected,
            project_id: item?.metadata?.project_id || null,
        })),
        (i) => i.project_id || 'unassigned'
    )

    return Object.entries(groupedBy).map(([projectId, items]) => {
        return {
            label: projectsMap[projectId] || 'Unassigned',
            items,
        }
    })
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
