import { fetchMockCrmFunctionDetails, fetchMockCrmFunctions } from '@/api/mock.api.js'
import { requestWithCookieCsrf } from '@/api/zoho-api-client.js'

export async function fetchCrmFunctions(tabId, orgId, start = 0, limit = 50) {
    //TODO: remove mock api
    if (import.meta.env.VITE_MOCK_API === 'true') {
        return fetchMockCrmFunctions(start, limit)
    }

    const response = await requestWithCookieCsrf(tabId, {
        url: `/crm/v2/settings/functions?type=org&start=${start}&limit=${limit}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-crm-org': orgId,
        },
    }).then((result) => result[0])

    const { functions } = response?.result || {}
    if (!Array.isArray(functions) || !functions.length) {
        return []
    }

    return functions
}

const DefaultFetchDetailsQuery = { category: 'automation', source: 'crm', language: 'deluge' }

export async function fetchFunctionDetails(tabId, orgId, functionId, query = DefaultFetchDetailsQuery) {
    if (import.meta.env.VITE_MOCK_API === 'true') {
        return fetchMockCrmFunctionDetails(functionId)
    }

    const queryString = new URLSearchParams({
        ...DefaultFetchDetailsQuery,
        ...query,
    }).toString()

    const response = await requestWithCookieCsrf(tabId, {
        url: `/crm/v2/settings/functions/${functionId}?${queryString}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-crm-org': orgId,
        },
    }).then((result) => result[0])

    const { functions } = response?.result || {}
    if (!Array.isArray(functions) || !functions.length) {
        return null
    }

    return functions[0] || null
}
