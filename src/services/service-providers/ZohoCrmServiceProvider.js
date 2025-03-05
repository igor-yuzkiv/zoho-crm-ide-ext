import { ServiceProvider } from './ServiceProvider.js'
import { ServiceType } from '@/constants/service-provers.constants.js'
import { fetchCrmFunctions } from '@/api/zoho-crm.api.js'

const REGULAR_REGEX = /^(https:\/\/crm\.zoho\.[a-z]{2,})\/crm\/org(\d+)\//
const SANDBOX_REGEX = /^(https:\/\/crmsandbox\.zoho\.[a-z]{2,})\/crm\/(\w+)\//

export class ZohoCrmServiceProvider extends ServiceProvider {
    get type() {
        return ServiceType.zoho_crm
    }

    get id() {
        return `${this.type}-${this.metadata.host}-${this.metadata.org_id}`
    }

    get title() {
        return `Zoho CRM ${this.metadata.is_sandbox ? 'Sandbox' : ''} (${this.metadata.org_id})`
    }

    static resolve(tab) {
        if (!tab?.url) {
            return
        }

        let is_sandbox = false

        let match = tab.url.match(REGULAR_REGEX)
        if (!match || match?.length !== 3) {
            match = tab.url.match(SANDBOX_REGEX)
            is_sandbox = true
        }

        if (match && match?.length === 3) {
            const [, host, org_id] = match
            return new ZohoCrmServiceProvider(tab, { host, org_id, is_sandbox })
        }
    }

    /**
     * @param page
     * @param per_page
     * @returns {Promise<{function: Array, has_more: boolean}>}
     */
    async fetchFunctions(page = 1, per_page = 50) {
        let start = page <= 1 ? 0 : (page - 1) * per_page + 1

        const response = (await fetchCrmFunctions(this.tab.id, start, per_page)) || []
        return {
            functions: response || [],
            has_more: response.length >= per_page,
        }
    }

    /**
     * @param item
     * @returns {Promise<{script: string, details: Object, modified_at: Date}>}
     */
    async fetchFunctionDetails(item) {
        console.log('ZohoCrmServiceProvider.fetchFunctionDetails not implemented', { tabId, item })
        return {
            script: '',
            details: {},
            modified_at: new Date(),
        }
    }
}
