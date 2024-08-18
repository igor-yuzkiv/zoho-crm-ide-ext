import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
    const appReady = ref(false)
    const showLoader = ref(false)

    function toggleLoader() {
        showLoader.value = !showLoader.value
    }

    return {
        appReady,
        showLoader,
        toggleLoader,
    }
})
