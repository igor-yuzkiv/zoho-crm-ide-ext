import { ServiceProvider } from '../ServiceProvider.js'
import { ZohoServiceType } from '@/services/service-providers.config.js'

export class ZohoCrmServiceProvider extends ServiceProvider {
    get type() {
        return ZohoServiceType.zoho_crm
    }

    static resolve(tab) {
        if (!tab?.url) {
            return
        }

        const match = tab.url.match(/^(https:\/\/crm\.zoho\.[a-z]{2,})\/crm\/org(\d+)\//)
        if (!match || match?.length !== 3) {
            return
        }

        const [, host, org_id] = match

        return new ZohoCrmServiceProvider(tab, { host, org_id })
    }
}
