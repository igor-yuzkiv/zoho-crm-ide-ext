import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useWorkspaceStore = defineStore('workspace', () => {
    const _serviceProvider = ref()
    const serviceProvider = computed(() => _serviceProvider.value)

    function setServiceProvider(serviceProvider) {
        _serviceProvider.value = serviceProvider
    }

    return {
        serviceProvider,
        setServiceProvider,
    }
})
