import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('theme', () => {
    const isDarkTheme = ref(false)

    function toggleTheme(value) {
        isDarkTheme.value = typeof value === 'boolean' ? value : !isDarkTheme.value

        document.documentElement.classList.remove(isDarkTheme.value ? 'light-mode' : 'dark-mode')
        document.documentElement.classList.add(isDarkTheme.value ? 'dark-mode' : 'light-mode')

        localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light')
    }

    function initTheme() {
        let theme = localStorage.getItem('theme')
        if (!theme) {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        toggleTheme(theme === 'dark')
    }

    return {
        isDarkTheme,
        toggleTheme,
        initTheme,
    }
})
