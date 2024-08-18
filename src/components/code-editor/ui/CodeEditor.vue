<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'javascript' || label === 'typescript') {
            return new tsWorker()
        }
        return new editorWorker()
    },
}

const modelValue = defineModel<string>()
const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>()
const editorRef = ref<HTMLElement>()

function createEditor() {
    if (!editorRef.value) {
        return
    }

    const _editor = monaco.editor.create(editorRef.value, {
        theme: 'vs-light',
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

    editor.value = _editor
}

watch(modelValue, (value) => {
    if (editor.value && editor.value.getValue() !== value) {
        editor.value.setValue(value || '')
    }
})

onMounted(() => {
    createEditor()
})

onBeforeUnmount(() => {
    editor.value?.dispose()
})

defineExpose({ editor })
</script>

<template>
    <div ref="editorRef" class="h-full w-full"></div>
</template>

<style scoped></style>
