import mockTabs from '@/data/chrome_tabs.json'

function chromeTabsQuery() {
    return Promise.resolve(mockTabs)
}

export default {
    chromeTabsQuery,
}
