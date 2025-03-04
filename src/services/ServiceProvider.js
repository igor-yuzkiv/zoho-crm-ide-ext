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

    getHost() {
        throw new Error('Not implemented')
    }

    //eslint-disable-next-line
    static resolve(tab) {
        throw new Error('Not implemented')
    }
}
