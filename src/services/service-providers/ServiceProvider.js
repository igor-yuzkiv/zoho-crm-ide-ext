export class ServiceProvider {
    tab = null
    metadata = {}
    isConnected = false

    constructor(metadata, tab) {
        this.metadata = metadata
        this.tab = tab

        this.isConnected = Boolean(tab?.id)
    }

    get type() {
        throw new Error('Not implemented')
    }

    get id() {
        throw new Error('Not implemented')
    }

    get title() {
        return this.type
    }

    disconnect() {
        this.tab = null
        this.isConnected = false
    }

    /**
     * @return ServiceProvider|undefined
     */
    //eslint-disable-next-line
    static resolveFromBrowserTab(tab) {
        throw new Error('Not implemented')
    }

    /**
     * @param page
     * @param per_page
     * @returns {Promise<{function: Array, has_more: Boolean}>}
     */
    async fetchFunctions(page = 1, per_page = 50) {
        console.warn(`ServiceProvider[${this.type}].fetchFunctions not implemented`, { page, per_page })
        return {
            functions: [],
            has_more: false,
        }
    }

    async fetchFunctionDetails(item) {
        console.warn(`ServiceProvider[${this.type}].fetchFunctionDetails not implemented`, { item })
        return item
    }
}
