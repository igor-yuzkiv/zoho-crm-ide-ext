import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useServiceProvidersStore } from '@/store/useServiceProvidersStore.js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/**
 * @return {
 *     serviceProvider: ServiceProvider
 * }
 */
export const useWorkspaceStore = defineStore('workspace', () => {
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
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    function setProvider(providerId) {
        currentProviderId.value = providerId
        functionsStore.loadProviderFunctionsList(provider.value).catch(console.error)
    }

    async function loadFunctionsList(force = false) {
        if (!provider.value || isLoading.value) {
            return
        }

        try {
            isLoading.value = true
            await functionsStore.loadProviderFunctionsList(provider.value, force)
        } catch (e) {
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    return {
        provider,
        functions,
        init,
        setProvider,
        loadFunctionsList,
        isLoading,
    }
})
