import { computed, ref } from 'vue'
import { useTabsStore } from '@/entities/tab/useTabsStore.ts'
import { fetchFunctionDetail, fetchFunctions } from '@/entities/function/api.ts'
import { CrmFunction } from '@/entities/function/types.ts'
import { Maybe } from '@/app/types.ts'
import { sleep } from '@/utils'

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
            const response = await fetchFunctionDetail(tabsStore.targetTab.id, functions.value[i].id).catch(() => null)
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

    return {
        functions,
        selectedFunction,
        doSelectFunction,
        loadFunctions,
    }
}
