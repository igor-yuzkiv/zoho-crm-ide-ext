<script setup>
import { ref } from 'vue'
import Menubar from 'primevue/menubar'

const items = ref([
    {
        label: 'Export',
    },
    {
        label: 'Search',
    },
    {
        label: 'Commit',
    },
    {
        label: 'Some other menu',
    },
])
</script>
<template>
    <Menubar :model="items" class="p-0.5">
        <template #end> OrgIdDropDown </template>
    </Menubar>
</template>
