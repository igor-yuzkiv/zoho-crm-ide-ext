import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'

/**
 * @return {
 *     serviceProvider: ServiceProvider
 * }
 */
export const useWorkspaceStore = defineStore('workspace', () => {
    const serviceProvider = shallowRef()
    const functionsStore = useFunctionsStore()
    const functions = computed(() => functionsStore.getFunctions(serviceProvider.value?.id))
    const isLoading = ref(false)

    function setServiceProvider(provider) {
        serviceProvider.value = provider
    }

    async function loadFunctions() {
        if (!serviceProvider.value || isLoading.value) {
            return
        }

        if (functionsStore.hasFunctions(serviceProvider.value.id)) {
            return
        }

        try {
            isLoading.value = true
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
        } catch (e) {
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    return {
        serviceProvider,
        setServiceProvider,
        loadFunctions,
        functions,
    }
})
