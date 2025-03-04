import { ZohoServiceType } from '@/services/service-providers.config.js'
import { ServiceProvider } from '@/services/ServiceProvider.js'

export class ZohoCreatorServiceProvider extends ServiceProvider {
    get type() {
        return ZohoServiceType.zoho_creator
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
