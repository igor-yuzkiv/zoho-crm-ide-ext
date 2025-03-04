import { ServiceType } from '@/services'
import { ServiceProvider } from '@/services/ServiceProvider.js'

export class ZohoCreatorServiceProvider extends ServiceProvider {
    get type() {
        return ServiceType.zoho_creator
    }

    get id() {
        return `${ServiceType.zoho_creator}-${this.metadata.host}-${this.metadata.owner_name}-${this.metadata.application_name}`
    }

    static resolve(tab) {
        if (!tab?.url) {
            return
        }

        const match = tab.url.match(/^(https:\/\/creatorapp\.zoho\.com)\/([^\/]+)\/([^\/]+)\//)
        if (!match || match?.length !== 4) {
            return
        }

        const [, host, owner_name, application_name] = match

        return new ZohoCreatorServiceProvider(tab, { host, owner_name, application_name })
    }
}
