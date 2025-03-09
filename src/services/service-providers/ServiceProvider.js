export class ServiceProvider {
    tab = null
    metadata = {}

    constructor(metadata, tab) {
        this.metadata = metadata
        this.tab = tab
    }

    /**
     * @return string
     */
    get type() {
        throw new Error('Not implemented')
    }

    /**
     * @return string
     */
    get id() {
        throw new Error('Not implemented')
    }

    get title() {
        return this.type
    }

    /**
     * @param tab - browser tab
     * @return ServiceProvider|undefined
     */
    //eslint-disable-next-line
    static resolveFromBrowserTab(tab) {
        throw new Error('Not implemented')
    }

    get isConnected() {
        return Boolean(this.tab?.id)
    }

    disconnect() {
        this.tab = null
    }

    isFunctionSyncRequired(item) {
        return !item?.script
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
