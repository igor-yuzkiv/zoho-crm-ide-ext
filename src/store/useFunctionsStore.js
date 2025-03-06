import localStorageUtil from '@/utils/local-storage.util.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CACHE_TTL } from '@/config/index.js'

export const useFunctionsStore = defineStore('functions', () => {
    const functionPerProvider = ref({})

    function setFunctions(providerId, data) {
        if (!providerId || !data.length) {
            return
        }

        functionPerProvider.value[providerId] = data
        cacheFunctions(providerId, data)
    }

    function hasFunctions(providerId) {
        return functionPerProvider.value[providerId]?.length > 0
    }

    function getFunctions(providerId) {
        return functionPerProvider.value[providerId] || []
    }

    function cacheFunctions(providerId, items) {
        if (!providerId || !items.length) {
            return
        }

        localStorageUtil.setItem(`functions:${providerId}`, JSON.stringify(items), CACHE_TTL)
    }

    function getCachedFunctions(providerId) {
        const cached = localStorageUtil.getItem(`functions:${providerId}`)
        return cached ? JSON.parse(cached) : []
    }

    async function loadProviderFunctionsList(provider, force = false) {
        const cached = getCachedFunctions(provider.id)
        if (cached.length && !force) {
            setFunctions(provider.id, cached)
            return
        }

        if (!provider.isConnected) {
            console.warn('functionsStore.load: provider is not connected', provider)
            return
        }

        try {
            let page = 1
            let has_mode = false
            const functions = []
            do {
                const response = await provider.fetchFunctions(page)
                if (response.functions.length) {
                    functions.push(...response.functions)
                }

                has_mode = response.has_more
                page++
            } while (has_mode)

            setFunctions(provider.id, functions)
        } catch (e) {
            console.error(e)
        }
    }

    return {
        functionPerProvider,
        setFunctions,
        getFunctions,
        hasFunctions,
        loadProviderFunctionsList,
    }
})
