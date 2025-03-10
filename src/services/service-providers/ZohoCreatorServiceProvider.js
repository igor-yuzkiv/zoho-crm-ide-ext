import { ServiceProviderType } from '@/config/index.js'
import { ServiceProvider } from '@/services/service-providers/ServiceProvider.js'

export class ZohoCreatorServiceProvider extends ServiceProvider {
    get type() {
        return ServiceProviderType.zoho_creator.name
    }

    get id() {
        return `${this.type}-${this.metadata.host}-${this.metadata.owner_name}-${this.metadata.application_name}`
    }

    get title() {
        if (this.metadata?.provider_alias) {
            return this.metadata.provider_alias
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
}
