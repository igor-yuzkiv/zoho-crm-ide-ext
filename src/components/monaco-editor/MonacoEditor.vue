<script setup>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { onMounted, ref, watch } from 'vue'

const modelValue = defineModel({
    type: String,
    default: '',
})
const editorElement = ref(null)
const editorInstance = ref(null)

onMounted(() => {
    const _editor = monaco.editor.create(editorElement.value, {
        // theme: 'vs-dark',
        language: 'typescript',
        value: modelValue.value,
        automaticLayout: true,
    })

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
    })

    _editor.onDidChangeModelContent(() => {
        modelValue.value = _editor.getValue()
    })

    editorInstance.value = _editor
})

watch(modelValue, (value) => {
    if (editorInstance.value && editorInstance.value.getValue() !== value) {
        console.log('setting value', value);
        // editorInstance.value.setValue(value || '');
    }
});
</script>

<template>
    <div ref="editorElement" class="h-full w-full"></div>
</template>

<style scoped></style>
