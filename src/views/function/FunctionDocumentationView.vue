<script setup>
import { ref } from 'vue'

const text = ref('# Hello Editor \n## Test \n *italic* **bold** \n > Quote  \n --- \n')
</script>

<template>
    <div class="flex h-full w-full p-1">
        <div class="prose-invert w-full lg:prose-xl">
            <vue-monaco-editor
                v-model:value="text"
                language="markdown"
            />
        </div>
    </div>
</template>

<style scoped></style>
