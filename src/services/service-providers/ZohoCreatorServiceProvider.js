import { ServiceProvider } from '@/services/service-providers/ServiceProvider.js'
import { ServiceProviderType } from '@/config/index.js'

export class ZohoCreatorServiceProvider extends ServiceProvider {
    get type() {
        return ServiceProviderType.zoho_creator
    }

    get id() {
        return `${ServiceProviderType.zoho_creator}-${this.metadata.host}-${this.metadata.owner_name}-${this.metadata.application_name}`
    }

    get title() {
        return `Zoho Creator (${this.metadata.owner_name}/${this.metadata.application_name})`
    }

    static resolve(tab) {
        if (!tab?.url) {
            return
        }

        const match = tab.url.match(/^(https:\/\/creator\.zoho\.[a-z]{2,})\/appbuilder\/([^\/]+)\/([^\/]+)\//)
        if (!match || match?.length !== 4) {
            return
        }

        const [, host, owner_name, application_name] = match

        return new ZohoCreatorServiceProvider(tab, { host, owner_name, application_name })
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
