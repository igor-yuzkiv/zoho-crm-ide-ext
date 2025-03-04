import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,vue}'] },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                chrome: false,
            },
        },
    },
    pluginJs.configs.recommended,
    ...pluginVue.configs['flat/essential'],
]
