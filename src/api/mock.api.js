export async function fetchMockChromeTabsQuery() {
    const data = await import('@/data/chrome_tabs.json')

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.default)
        }, 500)
    })
}

export async function fetchMockCrmFunctions(start = 0, limit = 100) {
    const data = await import('@/data/crm_functions_list.json')
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.default.slice(start, start + limit))
        }, 500)
    })
}

export async function fetchMockCrmFunctionDetails(id) {
    const data = await import('@/data/crm_functions_list.json')

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.default.find((item) => item.id === id) || null)
        }, 500)
    })
}
