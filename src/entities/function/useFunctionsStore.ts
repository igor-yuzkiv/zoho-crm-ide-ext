import { computed, ref } from 'vue'
import { useTabsStore } from '@/entities/tab/useTabsStore.ts'
import { fetchFunctionDetail, fetchFunctions } from '@/entities/function/api.ts'
import { CrmFunction } from '@/entities/function/types.ts'
import { Maybe } from '@/types.ts'

export function useFunctionsStore() {
    const tabsStore = useTabsStore()
    const functions = ref<CrmFunction[]>([])
    const selectedFunction = computed<Maybe<CrmFunction>>(() => {
        return functions.value.find((item) => item.selected)
    })

    function selectFunction(id: string) {
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
        console.log('functions', functions.value)
    }

    async function loadFunctionDetail(id: string): Promise<Maybe<CrmFunction>> {
        if (!tabsStore.targetTab?.id) {
            return
        }

        const response = await fetchFunctionDetail(tabsStore.targetTab.id, id).catch(() => null)
        if (!response) {
            return
        }

        const index = functions.value.findIndex((item) => item.id === id)
        if (index === -1) {
            functions.value.push(response)
        } else {
            functions.value[index] = {
                ...functions.value[index],
                ...response,
            }
        }

        return functions.value[index]
    }

    return {
        functions,
        selectedFunction,
        selectFunction,
        loadFunctionDetail,
        loadFunctions,
    }
}
