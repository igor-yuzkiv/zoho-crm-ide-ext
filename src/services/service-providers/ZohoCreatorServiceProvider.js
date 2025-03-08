import { ServiceProvider } from '@/services/service-providers/ServiceProvider.js'
import { ServiceProviderType } from '@/config.js'

export class ZohoCreatorServiceProvider extends ServiceProvider {
    constructor(metadata, tab) {
        if (!metadata?.owner_name || !metadata?.application_name) {
            throw new Error('Invalid Zoho Creator metadata')
        }

        super(metadata, tab)
    }

    get type() {
        return ServiceProviderType.zoho_creator.name
    }

    get id() {
        return `${this.type}-${this.metadata.host}-${this.metadata.owner_name}-${this.metadata.application_name}`
    }

    get title() {
        if (this.metadata?.name) {
            return this.metadata.name
        }

        return `Zoho Creator (${this.metadata.owner_name}/${this.metadata.application_name})`
    }

    static resolveFromBrowserTab(tab) {
        if (!tab?.url) {
            return
        }

        const match = tab.url.match(/^(https:\/\/creator\.zoho\.[a-z]{2,})\/appbuilder\/([^/]+)\/([^/]+)\//)
        if (!match || match?.length !== 4) {
            return
        }

        const [, host, owner_name, application_name] = match

        return new ZohoCreatorServiceProvider({ host, owner_name, application_name }, tab)
    }

    /**
     * @param page
     * @param per_page
     * @returns {Promise<{function: Array, has_more: boolean}>}
     */
    async fetchFunctions(page = 1, per_page = 50) {
        console.warn('ZohoCreatorServiceProvider.fetchFunctions not implemented', { page, per_page })
        return {
            functions: [],
            has_more: false,
        }
    }
}
