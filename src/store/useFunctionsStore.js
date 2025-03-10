import { CACHE_TTL } from '@/config.js'
import localStorageUtil from '@/utils/local-storage.util.js'
import { chunk } from 'lodash'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFunctionsStore = defineStore('functions', () => {
    const functionPerProvider = ref({})
    const isLoading = ref(false)

    const allFunction = computed(() => Object.values(functionPerProvider).flat())

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

    function hasFunctions(providerId) {
        return functionPerProvider.value[providerId]?.length > 0
    }

    function getFunctions(providerId) {
        return functionPerProvider.value[providerId] || []
    }

    function setFunctions(providerId, data, removeIfNotPresent = false) {
        if (!providerId || !data.length) {
            return
        }

        const updatedFunctions = new Map(getFunctions(providerId).map((item) => [item.id, item]))
        const newFunctionsIds = new Set(data.map((item) => item.id))

        for (const item of data) {
            updatedFunctions.set(item.id, { ...updatedFunctions.get(item.id), ...item })
        }

        functionPerProvider.value[providerId] = removeIfNotPresent
            ? [...updatedFunctions.values()].filter((item) => newFunctionsIds.has(item.id))
            : [...updatedFunctions.values()]

        cacheFunctions(providerId, functionPerProvider.value[providerId])
    }

    function clearCache(providerId) {
        localStorageUtil.removeItem(`functions:${providerId}`)
        functionPerProvider.value[providerId] = []
    }

    function loadCachedFunction(providerId) {
        if (!providerId) {
            return
        }

        const cached = getCachedFunctions(providerId)
        if (cached.length) {
            setFunctions(providerId, cached)
        }
    }

    async function fetchFunctionsList(provider) {
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

        return functions
    }

    async function loadFunctionsDetailsChunk(provider, chunk) {
        const data = []

        for (const item of chunk) {
            const response = await provider.fetchFunctionDetails(item)
            if (response) {
                data.push(response)
            }
        }

        return data
    }

    async function loadFunctions(provider, force = false) {
        if (!provider?.id || isLoading.value) {
            return
        }

        try {
            isLoading.value = true
            functionPerProvider.value[provider.id] = getCachedFunctions(provider.id)

            if (!hasFunctions(provider.id) || force) {
                setFunctions(provider.id, await fetchFunctionsList(provider), true)
            }

            const functions = getFunctions(provider.id)

            setFunctions(provider.id, functions, force)
            const forSync = functions.filter((item) => provider.isFunctionSyncRequired(item))

            if (forSync.length) {
                await Promise.all(chunk(forSync, 10).map((c) => loadFunctionsDetailsChunk(provider, c)))
                    .then((response) => setFunctions(provider.id, response.flat()))
                    .catch((e) => console.error('Failed to load functions details', e))
            }
        } catch (e) {
            console.error('Failed to load functions', e)
        } finally {
            isLoading.value = false
        }
    }

    async function refreshFunction(provider, functionObject) {
        try {
            isLoading.value = true
            const response = await provider.fetchFunctionDetails(functionObject)
            if (response) {
                setFunctions(provider.id, [response], false)
            }
        } catch (e) {
            console.error('Failed to refresh function', e)
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        functionPerProvider,
        allFunction,
        getFunctions,
        hasFunctions,
        clearCache,
        loadFunctions,
        loadCachedFunction,
        refreshFunction,
    }
})
