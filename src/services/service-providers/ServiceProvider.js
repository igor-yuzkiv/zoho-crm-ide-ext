export class ServiceProvider {
    tab = null
    metadata = {}
    isConnected = false

    constructor(metadata, tab) {
        this.metadata = metadata
        this.tab = tab

        this.isConnected = Boolean(tab?.id)
    }

    /**
     * @returns {string}
     */
    get type() {
        throw new Error('Not implemented')
    }

    /**
     * @returns {string}
     */
    get id() {
        throw new Error('Not implemented')
    }

    get title() {
        return this.tab?.title || ''
    }

    disconnect() {
        this.tab = null
        this.isConnected = false
    }

    /**
     * @return ServiceProvider
     */
    //eslint-disable-next-line
    static resolveFromBrowserTab(tab) {
        throw new Error('Not implemented')
    }

    /**
     * @param page
     * @param per_page
     * @returns {Promise<{function: Array, has_more: boolean}>}
     */
    //eslint-disable-next-line
    async fetchFunctions(page = 1, per_page = 50) {
        throw new Error('Not implemented')
    }

    /**
     * @param item
     * @returns {Promise<Object>}
     */
    async fetchFunctionDetails(item) {
        console.warn('ServiceProvider.fetchFunctionDetails not implemented', {
            type: this.type,
            item,
        })
        return item
    }
}
