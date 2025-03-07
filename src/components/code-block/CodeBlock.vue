<script setup>
import Prism from 'prismjs'
//import 'prismjs/themes/prism.css';
// import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/themes/prism-okaidia.css'

defineProps({
    code: {
        type: String,
        default: '',
    },
    languageClass: {
        type: String,
        default: 'language-js',
    },
})

function onElementMounted(element) {
    if (element) {
        Prism.highlightElement(element)
    }
}
</script>

<template>
    <pre class="code-block"><code :ref="onElementMounted" :class="languageClass">{{ code }}</code></pre>
</template>

<style scoped>
.code-block {
    margin: 0;
    padding: 5px;
    background-color: transparent;
}
</style>
