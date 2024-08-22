import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const VIEW_LAYOUT_ICONS = [
    'fluent:layout-column-three-20-filled', //0 - all
    'fluent:layout-column-three-focus-center-20-filled', //1 - code only
    'fluent:layout-column-three-focus-left-20-filled', //2 - left menu and code
]

export const useAppStore = defineStore('app', () => {
    const isLoading = ref(false)
    const layoutView = ref<number>(0)
    const layoutViewIcon = computed(() => VIEW_LAYOUT_ICONS[layoutView.value])

    function toggleLoading() {
        isLoading.value = !isLoading.value
    }

    function toggleLayoutView() {
        layoutView.value = layoutView.value === 2 ? 0 : layoutView.value + 1
    }

    return {
        isLoading,
        layoutView,
        toggleLoading,
        toggleLayoutView,
        layoutViewIcon,
    }
})
