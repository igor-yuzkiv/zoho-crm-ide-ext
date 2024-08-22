<script setup lang="ts">
import { CrmFunction, FunctionCategory } from '@/types.ts'
import { Icon } from '@iconify/vue'

defineProps<{ items: CrmFunction[] }>()
const emit = defineEmits(['item:click'])

const FunctionAppearances = {
    [FunctionCategory.button]: {
        icon: 'mdi:button-pointer',
        class: 'text-blue-500',
    },
    [FunctionCategory.automation]: {
        icon: 'mdi:workflow',
        class: 'text-green-500',
    },
    [FunctionCategory.scheduler]: {
        icon: 'mingcute:time-fill',

        class: 'text-yellow-500',
    },
    [FunctionCategory.standalone]: {
        icon: 'ph:code-fill',
        class: 'text-red-500',
    },
    [FunctionCategory.crmfundamentals]: {
        icon: 'f7:question',
        class: 'text-red-500',
    },
    [FunctionCategory.dynamic]: {
        icon: 'f7:question',
        class: 'text-red-500',
    },
    default: {
        icon: 'mdi:file-code',
        class: 'text-gray-500',
    },
}

function getAppearances(item: CrmFunction) {
    if (!(item.category in FunctionAppearances)) {
        return FunctionAppearances.default
    }

    return FunctionAppearances[item.category]
}

function onClick(item: CrmFunction) {
    if (item.script) {
        emit('item:click', item)
    }
}
</script>

<template>
    <ul v-if="items?.length">
        <li
            v-for="item in items"
            :key="item.id"
            :title="item.display_name"
            class="flex cursor-pointer items-center gap-x-2 px-2 py-1"
            :class="{
                'opacity-50': !item?.script,
                'bg-base-200 dark:bg-base-900': item.selected,
                'hover:bg-base-200 dark:hover:bg-base-950': !item.selected,
            }"
            @click="onClick(item)"
        >
            <div>
                <Icon :icon="getAppearances(item).icon" class="h-5 w-5" :class="getAppearances(item).class" />
            </div>
            <div class="truncate">{{ item.display_name }}</div>
        </li>
    </ul>
</template>

<style scoped></style>
