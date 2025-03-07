import '@/plugins/monaco-edtior/monaco-editor-worker.js'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

export default function (app) {
    app.use(VueMonacoEditorPlugin)
}
