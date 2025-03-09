export async function requestWithCookieCsrf(tabId, requestOptions) {
    if (!tabId) {
        throw new Error('Invalid arguments. tabId is required')
    }

    if (!requestOptions?.url || !requestOptions?.method) {
        throw new Error('Invalid arguments. url and method are required')
    }

    if (!requestOptions.url.startsWith('http') && !requestOptions.url.startsWith('/')) {
        requestOptions.url = `/${requestOptions.url}`
    }

    return await chrome.scripting.executeScript({
        target: { tabId },
        args: [requestOptions],
        func: async (options) => {
            const { url, method, headers } = options || { headers: {} }

            const cookieItems = Object.fromEntries(
                document.cookie
                    .split(';')
                    .map((item) => item.trim().split('='))
                    .filter((item) => item.length === 2),
            )

            const response = await fetch(url.startsWith('http') ? url : `${window.location.origin}${url}`, {
                method,
                headers: {
                    Cookie: document.cookie,
                    'x-zcsrf-token': `crmcsrfparam=${cookieItems['CT_CSRF_TOKEN']}`,
                    ...headers,
                },
            })

            console.info('[--zoho-ide-ext] requestWithCookieCsrf', {
                origin: document.location.origin,
                options,
                cookieItems,
                response: response.status,
            })

            return await response.json()
        },
    })
}
