import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('/src', import.meta.url)),
        },
        extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    base: '',
    build: {
        outDir: './extension/dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vue-lite': ['vue', 'pinia', 'vue-router'],
                    'monaco-editor': ['monaco-editor'],
                }
            }
        }
    },
})
