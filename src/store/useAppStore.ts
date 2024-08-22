import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
    const isLoading = ref(false)
    /**
     * 0 - all
     * 1 - code only
     * 2 - left menu and code
     */
    const viewLayout = ref<number>(0)

    function toggleLoading() {
        isLoading.value = !isLoading.value
    }

    function toggleLayout() {
        viewLayout.value = viewLayout.value === 2 ? 0 : viewLayout.value + 1
    }

    return {
        isLoading,
        viewLayout,
        toggleLoading,
        toggleLayout,
    }
})
