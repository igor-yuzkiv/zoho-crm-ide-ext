<script setup>
import { ref } from 'vue';
import VueMarkdown from 'vue-markdown-render'
const text = ref('# Hello Editor \n## Test \n *italic* **bold** \n > Quote  \n --- \n');

</script>

<template>
    <div class="flex w-full h-full p-1">
        <div class="prose-invert lg:prose-xl w-full">
            <VueMarkdown :source="text"/>
        </div>
    </div>
</template>

<style scoped>

</style>
