import { ServiceProvider } from '../ServiceProvider.js'
import { ServiceType } from '@/services'

export class ZohoCrmServiceProvider extends ServiceProvider {
    get type() {
        return ServiceType.zoho_crm
    }

    get id() {
        return `${ServiceType.zoho_crm}-${this.metadata.host}-${this.metadata.org_id}`
    }

    get title() {
        return `Zoho CRM (${this.metadata.org_id})`
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
