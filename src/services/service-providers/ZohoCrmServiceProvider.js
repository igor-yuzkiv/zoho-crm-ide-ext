import { ServiceProvider } from './ServiceProvider.js'
import { parse } from 'date-fns'
import { snakeCase } from 'lodash'
import { FunctionType, ServiceProviderType } from '@/config/index.js'
import { fetchCrmFunctions, fetchFunctionDetails } from '@/api/zoho-crm.api.js'

const REGULAR_REGEX = /^(https:\/\/crm\.zoho\.[a-z]{2,})\/crm\/org(\d+)\//
const SANDBOX_REGEX = /^(https:\/\/crmsandbox\.zoho\.[a-z]{2,})\/crm\/(\w+)\//

function formatCrmFunctionApiName(api_name, display_name) {
    api_name = typeof api_name === 'string' && api_name !== 'null' ? api_name.trim() : null

    if (!api_name && typeof display_name === 'string') {
        api_name = snakeCase(display_name.trim())
    }

    return api_name || 'unknown_function'
}

function normalizeCrmFunctionData(item) {
    const { id, api_name, category, display_name, script, updatedTime, ...metadata } = item

    return {
        id,
        type: FunctionType[category] || FunctionType.unknown,
        api_name: formatCrmFunctionApiName(api_name, display_name),
        display_name,
        metadata,
        updated_time: Number.isInteger(updatedTime) ? updatedTime : null,
        script,
    }
}

export class ZohoCrmServiceProvider extends ServiceProvider {
    constructor(metadata, tab) {
        if (!metadata?.org_id) {
            throw new Error('Invalid Zoho CRM metadata')
        }

        super(metadata, tab)
    }

    get type() {
        return ServiceProviderType.zoho_crm
    }

    get id() {
        return `${this.type}-${this.metadata.host}-${this.metadata.org_id}`
    }

    get title() {
        if (this.metadata?.name) {
            return this.metadata.name
        }
        return `${this.metadata.org_id} - CRM ${this.metadata.is_sandbox ? 'Sandbox' : ''}`
    }

    static resolveFromBrowserTab(tab) {
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
            return new ZohoCrmServiceProvider({ host, org_id, is_sandbox }, tab)
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
     * @returns {Promise<Object>}
     */
    async fetchFunctionDetails(item) {
        const { id, metadata } = item
        if (!id) {
            return item
        }

        const response = await fetchFunctionDetails(this.tab.id, id, {
            category: metadata.category || 'automation',
            source: metadata.source || 'crm',
            language: metadata.language || 'deluge',
        })

        const normalized = normalizeCrmFunctionData(response)
        if (!normalized) {
            return item
        }

        if (!normalized?.updated_time) {
            normalized.updated_time = item?.updated_time || null
        }

        return normalized
    }
}
