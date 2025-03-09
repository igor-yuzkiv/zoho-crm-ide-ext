import primeVue from '@/plugins/prime-vue/prime-vue.plugin.js'
import monacoEditor from '@/plugins/monaco-editor/monaco-editor.plugin.js'

export default function (app) {
    primeVue(app)
    monacoEditor(app)
}
