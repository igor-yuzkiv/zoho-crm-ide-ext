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

    async function init() {
        try {
            isLoading.value = true
            await providersStore.loadProviders()
            if (!provider.value && providersStore.providers.length) {
                providersStore.connected?.length
                    ? setProvider(providersStore.connected[0].id)
                    : setProvider(providersStore.providers[0].id)
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
        provider,
        functions,
        init,
        setProvider,
        isLoading,
    }
})
