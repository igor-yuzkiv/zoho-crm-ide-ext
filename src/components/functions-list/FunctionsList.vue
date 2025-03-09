<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import InputText from 'primevue/inputtext'
import FunctionListItem from '@/components/functions-list/FunctionListItem.vue'

defineEmits(['click'])
const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
})

const route = useRoute()
const searchQuery = ref()
const itemsForDisplay = computed(() => {
    if (!searchQuery.value) {
        return props.items.map((i) => ({ ...i, is_active: route.params?.function_id === i.id }))
    }

    return props.items
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
            <InputText class="w-full rounded-none" v-model.lazy="searchQuery" placeholder="Search" />
        </div>

        <div class="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
            <ul>
                <li v-for="item in itemsForDisplay" :key="item.id" @click="$emit('click', item)">
                    <slot name="item" :item="item">
                        <FunctionListItem :item="item" />
                    </slot>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>
