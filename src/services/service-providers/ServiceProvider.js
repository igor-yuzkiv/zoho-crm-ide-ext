export class ServiceProvider {
    tab = null
    metadata = {}

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

    constructor(tab, metadata = {}) {
        if (!tab) {
            throw new Error('Tab is required')
        }

        this.tab = tab
        this.metadata = metadata
    }

    //eslint-disable-next-line
    static resolve(tab) {
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
     * @returns {Promise<{
     *      script: string,
     *      details: Object,
     *      modified_at: Date
     * }>}
     */
    //eslint-disable-next-line
    async fetchFunctionDetails(item) {
        throw new Error('Not implemented')
    }
}
