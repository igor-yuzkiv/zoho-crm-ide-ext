export async function fetchMockChromeTabsQuery() {
    const data = await import('@/data/chrome_tabs.json')
    return data.default
}

export async function fetchMockCrmFunction(start = 0, limit = 100) {
    const data = await import('@/data/crm_functions_list.json')
    return data.default.slice(start, start + limit)
}
