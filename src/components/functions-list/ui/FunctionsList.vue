<script setup lang="ts">
import { CrmFunction } from '@/entities/function/types.ts'
import { Icon } from '@iconify/vue'

defineProps<{ items: CrmFunction[] }>()
defineEmits(['item:click'])
</script>

<template>
    <ul v-if="items?.length">
        <li
            v-for="item in items"
            :key="item.id"
            :title="item.display_name"
            class="flex cursor-pointer items-center gap-x-2 px-2 py-1"
            :class="{
                'bg-haze-200': item.selected,
                'hover:bg-haze-100': !item.selected,
            }"
            @click="$emit('item:click', item)"
        >
            <div>
                <Icon icon="charm:file-code" class="h-5 w-5" />
            </div>
            <div class="truncate">{{ item.display_name }}</div>
        </li>
    </ul>
</template>

<style scoped></style>
