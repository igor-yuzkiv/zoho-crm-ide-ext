import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useServiceProvidersStore } from '@/store/useServiceProvidersStore.js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useToast } from 'primevue'

/**
 * @return {
 *     serviceProvider: ServiceProvider
 * }
 */
export const useWorkspaceStore = defineStore('workspace', () => {
    const toast = useToast()

    const functionsStore = useFunctionsStore()
    const providersStore = useServiceProvidersStore()

    const isLoading = ref(false)
    const currentProviderId = ref()
    const provider = computed(() => providersStore.providersMap[currentProviderId.value] || null)
    const functions = computed(() => functionsStore.getFunctions(currentProviderId.value))

    async function init() {
        try {
            isLoading.value = true
            await providersStore.loadProviders()

            for (const provider of providersStore.providers) {
                functionsStore.loadCachedFunction(provider.id)
            }

            if (!provider.value && providersStore.providers.length) {
                currentProviderId.value = providersStore.connected?.length
                    ? providersStore.connected[0].id
                    : providersStore.providers[0].id

                await functionsStore.loadFunctions(provider.value)
            }
        } catch (e) {
            toast.add({ summary: 'Failed to load workspace data', severity: 'error' })
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    async function refresh(clearCache = false) {
        if (!provider.value || !provider.value.isConnected) {
            return
        }

        if (clearCache) {
            functionsStore.clearCache(provider.value.id)
        }

        await providersStore.loadProviders()
        if (currentProviderId.value) {
            await functionsStore.loadFunctions(provider.value, true)
        }
    }

    function setProvider(providerId) {
        currentProviderId.value = providerId
        functionsStore.loadFunctions(provider.value).catch(console.error)
    }

    return {
        isLoading,
        provider,
        functions,
        init,
        setProvider,
        refresh,
    }
})
