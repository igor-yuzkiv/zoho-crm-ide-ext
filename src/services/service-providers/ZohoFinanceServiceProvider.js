import { ServiceProviderType } from '@/config.js'
import { ServiceProvider } from '@/services/service-providers/ServiceProvider.js'
import { capitalize } from 'lodash'

export class ZohoFinanceServiceProvider extends ServiceProvider {
    get type() {
        return ServiceProviderType.zoho_finance.name
    }

    get id() {
        return `${this.type}-${this.metadata.finance_service}-${this.metadata.org_id}`
    }

    get title() {
        if (this.metadata?.name) {
            return this.metadata.name
        }
        return `Zoho ${capitalize(this.metadata.finance_service)} (${this.metadata.org_id})`
    }

    static resolveFromBrowserTab(tab) {
        if (!tab?.url) {
            return
        }

        const match = tab.url.match(/^(https:\/\/(books|inventory)\.zoho\.[a-z]{2,})\/app\/(\d+)/)
        if (!match || match?.length !== 4) {
            return
        }

        const [, host, finance_service, org_id] = match
        if (!['books', 'inventory'].includes(finance_service)) {
            return
        }

        return new ZohoFinanceServiceProvider({ host, finance_service, org_id }, tab)
    }

    /**
     * @param page
     * @param per_page
     * @returns {Promise<{function: Array, has_more: boolean}>}
     */
    async fetchFunctions(page = 1, per_page = 50) {
        console.warn('ZohoFinanceServiceProvider.fetchFunctions not implemented', { page, per_page })
        return {
            functions: [],
            has_more: false,
        }
    }

    async fetchFunctionDetails(item) {
        console.warn('ZohoFinanceServiceProvider.fetchFunctionDetails not implemented', { item })
        return item
    }
}
