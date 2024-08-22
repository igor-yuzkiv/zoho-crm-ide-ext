import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
    const appReady = ref(false)
    const showOverlay = ref(false)
    const isLoading = ref(false)

    function toggleOverlay() {
        showOverlay.value = !showOverlay.value
    }

    function toggleLoading() {
        isLoading.value = !isLoading.value
    }

    return {
        appReady,
        showOverlay,
        isLoading,
        toggleOverlay,
        toggleLoading,
    }
})
