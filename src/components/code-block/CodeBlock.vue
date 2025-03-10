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
    <pre><code :ref="onElementMounted" :class="languageClass">{{ code }}</code></pre>
</template>

<style scoped>

</style>
