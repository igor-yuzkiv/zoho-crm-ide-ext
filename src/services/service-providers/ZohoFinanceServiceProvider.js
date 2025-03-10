import { FunctionType, ServiceProviderType } from '@/config/index.js'
import { ServiceProvider } from '@/services/service-providers/ServiceProvider.js'
import { capitalize } from 'lodash'
import { fetchZohoFinanceFunctionDetails, fetchZohoFinanceFunctions } from '@/api/zoho-finance.api.js'

const FinanceServiceApiVersionMap = {
    books: 'v3',
    inventory: 'v1',
}

function normalizeFinanceFunctionData(item, provider_id) {
    const { customfunction_id, function_name, script, ...metadata } = item

    const result = {
        id: customfunction_id,
        type: FunctionType.automation,
        api_name: function_name,
        display_name: function_name,
        updated_time: null,
        metadata,
        provider_id
    }

    if (script !== undefined) {
        result.script = script
    }

    return result
}

export class ZohoFinanceServiceProvider extends ServiceProvider {
    get type() {
        return ServiceProviderType.zoho_finance.name
    }

    get serviceName() {
        return `Zoho ${capitalize(this.metadata.finance_service)}`
    }

    get id() {
        return `${this.type}-${this.metadata.finance_service}-${this.metadata.org_id}`
    }

    get title() {
        if (this.metadata?.provider_alias) {
            return this.metadata.provider_alias
        }
        return `${this.serviceName} (${this.metadata.org_id})`
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
     * @returns {Promise<{function: Array, has_more: Boolean}>}
     */
    async fetchFunctions(page = 1, per_page = 200) {
        if (!this.tab?.id || !this.metadata?.org_id) {
            return { functions: [], has_more: false }
        }

        const response = await fetchZohoFinanceFunctions(
            this.tab.id,
            this.metadata.org_id,
            {
                page,
                per_page,
            },
            FinanceServiceApiVersionMap[this.metadata.finance_service]
        )

        const { customfunctions, page_context } = response || {}

        if (!Array.isArray(customfunctions) || !customfunctions.length) {
            return { functions: [], has_more: false }
        }

        return {
            functions: customfunctions.map(i => normalizeFinanceFunctionData(i, this.id)),
            has_more: page_context?.has_more_page || false,
        }
    }

    async fetchFunctionDetails(item) {
        if (!this.tab?.id || !this.metadata?.org_id || !item?.id) {
            return item
        }

        const response = await fetchZohoFinanceFunctionDetails(
            this.tab.id,
            this.metadata.org_id,
            item.id,
            FinanceServiceApiVersionMap[this.metadata.finance_service]
        ).then(({ customfunction }) => customfunction)

        if (!response) {
            return item
        }
        const normalized = normalizeFinanceFunctionData(response, this.id)
        normalized.last_sync_at = Date.now()

        return normalized
    }
}
