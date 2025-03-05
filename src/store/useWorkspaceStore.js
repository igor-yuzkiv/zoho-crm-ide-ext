import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

/**
 * @return {
 *     serviceProvider: ServiceProvider
 * }
 */
export const useWorkspaceStore = defineStore('workspace', () => {
    const serviceProvider = shallowRef()
    const functionsStore = useFunctionsStore()

    function setServiceProvider(provider) {
        serviceProvider.value = provider
    }

    async function loadFunctions() {
        if (!serviceProvider.value) {
            return
        }

        if (functionsStore.hasFunctions(serviceProvider.value.id)) {
            return
        }

        let page = 1
        let has_mode = false
        const functions = []
        do {
            const response = await serviceProvider.value.fetchFunctions(page)
            if (response.functions.length) {
                functions.push(...response.functions)
            }

            has_mode = response.has_more
            page++
        } while (has_mode)

        functionsStore.setFunctions(serviceProvider.value.id, functions)
    }

    return {
        serviceProvider,
        setServiceProvider,
        loadFunctions,
        getFunctions: () => functionsStore.getFunctions(serviceProvider.value?.id),
    }
})
