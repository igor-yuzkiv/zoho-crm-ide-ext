import { computed, ref } from 'vue'
import { useTabsStore } from '@/store/useTabsStore.ts'
import { fetchFunctionDetail, fetchFunctions } from '@/api/functionsApi.ts'
import { CrmFunction } from '@/types.ts'
import { Maybe } from '@/types.ts'
import { sleep } from '@/utils.ts'

export function useFunctionsStore() {
    const tabsStore = useTabsStore()
    const functions = ref<CrmFunction[]>([])
    const selectedFunction = computed<Maybe<CrmFunction>>(() => functions.value.find((item) => item.selected))

    function doSelectFunction(id: string) {
        functions.value = functions.value.map((item) => ({ ...item, selected: item.id === id }))
    }

    async function loadFunctions() {
        if (!tabsStore.targetTab || !tabsStore.targetTab.id) {
            return
        }

        functions.value = []

        let start = 1
        const limit = 50
        let hasMore = false

        let items: CrmFunction[] = []
        do {
            const response = await fetchFunctions(tabsStore.targetTab.id, start, limit).catch(() => [])
            if (!response.length) {
                break
            }

            items = [...items, ...response]
            hasMore = response.length === limit
            start += limit
        } while (hasMore)

        functions.value = items.sort((a, b) => a.display_name.localeCompare(b.display_name))

        await loadFunctionsDetail()
    }

    async function loadFunctionsDetail() {
        if (!tabsStore.targetTab || !tabsStore.targetTab.id) {
            return
        }

        for (let i = 0; i < functions.value.length; i++) {
            const functionId = functions.value[i]?.id
            if (!functionId) {
                continue
            }
            const { source, language } = functions.value[i] || { source: 'crm', language: 'deluge' }

            const response = await fetchFunctionDetail(tabsStore.targetTab.id, functionId, source, language).catch(
                console.error
            )
            if (!response) {
                continue
            }

            functions.value[i] = {
                ...functions.value[i],
                ...response,
            }

            await sleep(100)
        }
    }

    async function doRefreshSelectedFunction() {
        if (!tabsStore.targetTab || !tabsStore.targetTab.id || !selectedFunction.value) {
            return
        }

        const response = await fetchFunctionDetail(tabsStore.targetTab?.id, selectedFunction.value.id).catch(() => null)
        if (response) {
            functions.value = functions.value.map((item) =>
                item.id === selectedFunction.value?.id ? { ...item, ...response } : item
            )
        }
    }

    return {
        functions,
        selectedFunction,
        doSelectFunction,
        loadFunctions,
        doRefreshSelectedFunction,
    }
}
