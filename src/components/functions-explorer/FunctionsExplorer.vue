<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ExplorerItem from '@/components/functions-explorer/ExplorerItem.vue'
import InputText from 'primevue/inputtext'

defineEmits(['click'])
const props = defineProps({
    functions: {
        type: Array,
        default: () => [],
    },
})

const route = useRoute()
const searchQuery = ref()
const itemsForDisplay = computed(() => {
    return props.functions
        .filter((i) => {
            if (!searchQuery.value) {
                return true
            }
            return `${i.api_name} ${i.display_name}`.toLowerCase().includes(searchQuery.value.toLowerCase())
        })
        .map((i) => {
            return { ...i, is_active: route.params?.function_id === i.id }
        })
})
</script>

<template>
    <div class="flex h-full flex-col overflow-hidden">
        <div class="flex w-full border-b">
            <InputText class="w-full rounded-none" v-model.lazy="searchQuery" placeholder="Search"/>
        </div>
        <div class="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
            <ul>
                <ExplorerItem
                    v-for="item in itemsForDisplay"
                    :key="item.id"
                    :item="item"
                    @click="$emit('click', item)"
                />
            </ul>
        </div>
    </div>
</template>

<style scoped></style>
