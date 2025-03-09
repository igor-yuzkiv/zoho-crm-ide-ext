import { fetchMockBooksFunctions } from '@/api/mock.api.js'
import { requestWithCookieCsrf } from '@/api/zoho-api-client.js'

export async function fetchZohoFinanceFunctions(tabId, orgId, query = {}) {
    if (import.meta.env.VITE_MOCK_API === 'true') {
        return fetchMockBooksFunctions()
    }

    const queryString = new URLSearchParams({
        page: query?.page || 1,
        per_page: query?.per_page || 50,
        usestate: 'false',
        organization_id: orgId,
    }).toString()

    const response = await requestWithCookieCsrf(tabId, {
        url: `/api/v3/integrations/customfunctions?${queryString}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then((result) => result[0])

    return response?.result || {}
}

export async function fetchZohoFinanceFunctionDetails(tabId, orgId, functionId) {
    const queryString = new URLSearchParams({
        customfunction_id: functionId,
        // entity: '',
        organization_id: orgId,
    }).toString()

    const response= await requestWithCookieCsrf(tabId, {
        url: `/api/v3/integrations/customfunctions/editpage?${queryString}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then((result) => result[0])

    return response?.result || {}
}
