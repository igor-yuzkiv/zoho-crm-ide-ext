import { CrmFunction } from '@/types.ts'
import lodash from 'lodash'
import { Maybe } from '@/types.ts'

export async function fetchFunctions(tabId: number, start: number = 0, limit: number = 50): Promise<CrmFunction[]> {
    const result = await chrome.scripting.executeScript({
        target: { tabId },
        args: [start, limit],
        func: async (start, limit) => {
            const url = `${window.location.origin}/crm/v2/settings/functions?type=org&start=${start}&limit=${limit}`
            const cookieItems = Object.fromEntries(
                document.cookie
                    .split(';')
                    .map((item) => item.trim().split('='))
                    .filter((item) => item.length === 2)
            )

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: document.cookie,
                    'x-crm-org': localStorage.getItem('ext_zoho_crm_ide:orgId'),
                    'x-zcsrf-token': `crmcsrfparam=${cookieItems['CT_CSRF_TOKEN']}`,
                } as any,
            })

            return await response.json()
        },
    })

    return lodash.get(result, '0.result.functions', [])
}

export async function fetchFunctionDetail(tabId: number, functionId: string): Promise<Maybe<CrmFunction>> {
    const result = await chrome.scripting.executeScript({
        target: { tabId },
        args: [functionId],
        func: async (functionId) => {
            const url = `${window.location.origin}/crm/v2/settings/functions/${functionId}?category=automation&source=crm&language=deluge`
            const cookieItems = Object.fromEntries(
                document.cookie
                    .split(';')
                    .map((item) => item.trim().split('='))
                    .filter((item) => item.length === 2)
            )

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: document.cookie,
                    'x-crm-org': localStorage.getItem('ext_zoho_crm_ide:orgId'),
                    'x-zcsrf-token': `crmcsrfparam=${cookieItems['CT_CSRF_TOKEN']}`,
                } as any,
            })

            return await response.json()
        },
    })

    return lodash.get(result, '0.result.functions.0')
}
