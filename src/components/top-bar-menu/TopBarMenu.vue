<script setup>
import { ref } from 'vue'
import Menubar from 'primevue/menubar'

const menuItems = ref([
    { label: 'Search' },
    { label: 'Commit' },
    { label: 'Export' },
    { label: 'Settings' },
    { label: 'Snippets' },
    { label: 'Documentation' },
])
</script>
<template>
    <Menubar :model="menuItems" class="p-0.5" style="border-radius: 0">
        <template #end>
            <slot name="end"></slot>
        </template>
    </Menubar>
</template>
