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
    const provider = computed(() => providersStore.providersMap[currentProviderId.value])
    const functions = computed(() => functionsStore.getFunctions(currentProviderId.value))

    async function refresh() {
        await providersStore.loadProviders();
        if (currentProviderId.value) {
            await functionsStore.loadFunctions(provider.value, true)
        }
    }

    async function clearCache() {
        functionsStore.clearCache(provider.value.id)
        await functionsStore.loadFunctions(provider.value, false)
    }

    async function init() {
        try {
            isLoading.value = true
            await providersStore.loadProviders()
            if (!provider.value && providersStore.providers.length) {
                currentProviderId.value = providersStore.connected?.length
                    ? providersStore.connected[0].id
                    : providersStore.providers[0].id

                if (currentProviderId.value) {
                    functionsStore.loadFunctions(provider.value, true).catch(console.error)
                }
            }
        } catch (e) {
            toast.add({ summary: 'Failed to load workspace data', severity: 'error' })
            console.error(e)
        } finally {
            isLoading.value = false
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
        clearCache,
    }
})
