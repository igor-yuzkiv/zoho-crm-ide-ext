export async function fetchMockChromeTabsQuery() {
    const data = await import('@/mock_data/chrome_tabs.json')

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.default)
        }, 500)
    })
}

export async function fetchMockCrmFunctions(start = 0, limit = 100) {
    const data = await import('@/mock_data/crm_functions_list.json')
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.default.slice(start, start + limit))
        }, 500)
    })
}

export async function fetchMockCrmFunctionDetails(id) {
    const data = await import('@/mock_data/crm_functions_details.json')

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.default.find((item) => item.id === id) || null)
        }, 500)
    })
}

export async function fetchMockBooksFunctions() {
    const data = await import('@/mock_data/books_functions_details.json')
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                customfunctions: data.default.map(({ customfunction }) => customfunction),
                page_context: { has_more_page: false },
            })
        }, 500)
    })
}
