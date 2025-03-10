import { ServiceProvider } from './ServiceProvider.js'
import { FunctionType, ServiceProviderType } from '@/config/index.js'
import { snakeCase } from 'lodash'
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

function normalizeCrmFunctionData(item, provider_id) {
    const { id, api_name, category, display_name, script, updatedTime, ...metadata } = item

    const result = {
        id,
        type: FunctionType[category] || FunctionType.unknown,
        api_name: formatCrmFunctionApiName(api_name, display_name),
        display_name,
        updated_time: Number.isInteger(updatedTime) ? updatedTime : null,
        metadata,
        provider_id
    }

    if (script !== undefined) {
        result.script = script
    }

    return result
}

export class ZohoCrmServiceProvider extends ServiceProvider {
    get type() {
        return ServiceProviderType.zoho_crm.name
    }

    get id() {
        return `${this.type}-${this.metadata.org_id}`
    }

    get title() {
        if (this.metadata?.provider_alias) {
            return this.metadata.provider_alias
        }
        return `Zoho Crm ${this.metadata.is_sandbox ? 'Sandbox' : ''} (${this.metadata.org_id})`
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

    isFunctionSyncRequired(item) {
        return !item?.last_sync_at || item.updated_time !== item.last_sync_at
    }

    /**
     * @param page
     * @param per_page
     * @returns {Promise<{function: Array, has_more: Boolean}>}
     */
    async fetchFunctions(page = 1, per_page = 50) {
        if (!this.tab?.id || !this.metadata?.org_id) {
            return { functions: [], has_more: false }
        }

        let start = page <= 1 ? 0 : (page - 1) * per_page + 1

        const response = (await fetchCrmFunctions(this.tab.id, this.metadata.org_id, start, per_page)) || []

        return {
            functions: response.length ? response.map(i => normalizeCrmFunctionData(i, this.id)) : [],
            has_more: response.length >= per_page,
        }
    }

    /**
     * @param item
     * @returns {Promise<Object>}
     */
    async fetchFunctionDetails(item) {
        if (!this.tab?.id || !this.metadata?.org_id) {
            return item
        }

        const { id, metadata } = item
        if (!id) {
            return item
        }

        const response = await fetchFunctionDetails(this.tab.id, this.metadata.org_id, id, {
            category: metadata.category || 'automation',
            source: metadata.source || 'crm',
            language: metadata.language || 'deluge',
        })

        const normalized = normalizeCrmFunctionData(response, this.id)
        if (!normalized) {
            return item
        }

        const updated_time = normalized?.updated_time || item?.updated_time || null

        normalized.updated_time = updated_time
        normalized.last_sync_at = updated_time

        return normalized
    }
}
