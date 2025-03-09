<script setup>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';


const visible = defineModel('visible', {
    type: Boolean,
})
</script>

<template>
    <Dialog header="Global Search" v-model:visible="visible" :modal="true" :closable="true" :showHeader="true" :baseZIndex="10000">
        <div class="p-1">
            <InputText placeholder="Search..." />
        </div>
    </Dialog>
</template>

<style scoped></style>
