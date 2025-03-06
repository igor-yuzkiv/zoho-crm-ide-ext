import { ServiceProvider } from './ServiceProvider.js'
import { snakeCase } from 'lodash'
import { FunctionType, ServiceProviderType } from '@/config/index.js'
import { fetchCrmFunctions } from '@/api/zoho-crm.api.js'

const REGULAR_REGEX = /^(https:\/\/crm\.zoho\.[a-z]{2,})\/crm\/org(\d+)\//
const SANDBOX_REGEX = /^(https:\/\/crmsandbox\.zoho\.[a-z]{2,})\/crm\/(\w+)\//

function normalizeCrmFunctionApiName(api_name, display_name) {
    api_name = typeof api_name === 'string' && api_name !== 'null' ? api_name.trim() : null

    if (!api_name && typeof display_name === 'string') {
        api_name = snakeCase(display_name.trim())
    }

    return api_name || 'unknown_function'
}

function normalizeCrmFunctionData(item) {
    const { id, api_name, category, display_name, updatedTime, ...metadata } = item

    return {
        id,
        api_name: normalizeCrmFunctionApiName(api_name, display_name),
        type: FunctionType[category] || FunctionType.unknown,
        category: category,
        display_name,
        updated_at: updatedTime ? new Date(updatedTime) : Date.now(),
        metadata,
    }
}

export class ZohoCrmServiceProvider extends ServiceProvider {
    get type() {
        return ServiceProviderType.zoho_crm
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
            functions: response.length ? response.map(normalizeCrmFunctionData) : [],
            has_more: response.length >= per_page,
        }
    }

    /**
     * @param item
     * @returns {Promise<{script: string, details: Object, modified_at: Date}>}
     */
    async fetchFunctionDetails(item) {
        console.log('ZohoCrmServiceProvider.fetchFunctionDetails not implemented', { item })
        return {
            script: '',
            details: {},
        }
    }
}
