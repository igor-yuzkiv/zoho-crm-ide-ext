<script setup lang="ts">
import { CrmFunction } from '@/types.ts'
import { get } from 'lodash'
import Divider from 'primevue/divider'
import Tag from 'primevue/tag'

defineProps<{ info: CrmFunction }>()

const displayFields = [
    { key: 'api_name', label: 'api_name' },
    { key: 'display_name', label: 'Display Name' },
    { key: 'category', label: 'Category' },
    { key: 'updatedTime', label: 'Modified On' },
    { key: 'modified_by', label: 'Modified By' },
]
</script>

<template>
    <div class="flex flex-col p-2">
        <div class="mb-2 flex flex-col">
            <Tag>{{ info.category }}</Tag>
            <h1 class="text-lg font-medium">{{ info.name }}</h1>
            <p v-if="info?.description">{{ info.description }}</p>
        </div>

        <template v-for="field in displayFields" :key="field.key">
            <div class="flex items-center gap-x-1" v-if="get(info, field.key)">
                <strong>{{ field.label }}:</strong>
                <span>{{ get(info, field.key) }}</span>
            </div>
        </template>

        <Divider v-if="info?.associated_place?.length">Associated Place</Divider>
        <div v-if="info?.associated_place?.length">
            <div
                class="my-1 flex flex-col rounded border p-1"
                v-for="item in info.associated_place"
                :key="`pram-${item.id}`"
            >
                <div class="flex gap-x-1">
                    <strong>Name:</strong>
                    <span>{{ item.name }}</span>
                </div>
                <div class="flex gap-x-1">
                    <strong>Module:</strong>
                    <span>{{ item.module }}</span>
                </div>
                <div class="flex gap-x-1">
                    <strong>Type:</strong>
                    <span>{{ item._type }}</span>
                </div>
            </div>
        </div>

        <Divider />
        <pre>{{ info }}</pre>
    </div>
</template>

<style scoped></style>
