import { fetchMockCrmFunctionDetails, fetchMockCrmFunctions } from '@/api/mock.api.js'

const DefaultFetchDetailsQuery = { category: 'automation', source: 'crm', language: 'deluge' }

export async function zohoCrmHttpRequest(tabId, url, method, requestOptions = {}) {
    if (!tabId || !url || !method) {
        throw new Error('Invalid arguments. tabId, url and method are required')
    }

    if (!url.startsWith('http') && !url.startsWith('/')) {
        url = `/${url}`
    }

    const options = {
        url,
        method,
        headers: requestOptions.headers || {},
    }

    return await chrome.scripting.executeScript({
        target: { tabId },
        args: [options],
        func: async (options) => {
            const { url, method, headers } = options || { headers: {} }

            const cookieItems = Object.fromEntries(
                document.cookie
                    .split(';')
                    .map((item) => item.trim().split('='))
                    .filter((item) => item.length === 2)
            )

            const orgId = localStorage.getItem('__ext_crmoz_zoho_ide:crm_organization_id')

            console.log('[--zoho-ide-ext] zohoCrmHttpRequest', { url, method, headers, orgId })

            const response = await fetch(url.startsWith('http') ? url : `${window.location.origin}${url}`, {
                method,
                headers: {
                    Cookie: document.cookie,
                    'x-crm-org': orgId,
                    'x-zcsrf-token': `crmcsrfparam=${cookieItems['CT_CSRF_TOKEN']}`,
                    ...headers,
                },
            })

            return await response.json()
        },
    })
}

export async function fetchCrmFunctions(tabId, start = 0, limit = 50) {
    //TODO: remove mock api
    if (import.meta.env.VITE_MOCK_API === 'true') {
        return fetchMockCrmFunctions(start, limit)
    }

    const response = await zohoCrmHttpRequest(
        tabId,
        `/crm/v2/settings/functions?type=org&start=${start}&limit=${limit}`,
        'GET',
        { headers: { 'Content-Type': 'application/json' } }
    ).then((result) => result[0])

    const { functions } = response?.result || {}
    if (!Array.isArray(functions) || !functions.length) {
        return []
    }

    return functions
}

export async function fetchFunctionDetails(tabId, functionId, query = DefaultFetchDetailsQuery) {
    if (import.meta.env.VITE_MOCK_API === 'true') {
        return fetchMockCrmFunctionDetails(functionId)
    }

    const queryString = new URLSearchParams({
        ...DefaultFetchDetailsQuery,
        ...query,
    }).toString()

    const response = await zohoCrmHttpRequest(tabId, `/crm/v2/settings/functions/${functionId}?${queryString}`, 'GET', {
        headers: { 'Content-Type': 'application/json' },
    }).then((result) => result[0])

    const { functions } = response?.result || {}
    if (!Array.isArray(functions) || !functions.length) {
        return null
    }

    return functions[0] || null
}
