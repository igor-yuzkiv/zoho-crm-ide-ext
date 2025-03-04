import { ZohoCreatorServiceProvider } from '@/services/providers/ZohoCreatorServiceProvider.js'
import { ZohoCrmServiceProvider } from '@/services/providers/ZohoCrmServiceProvider.js'

export const ZohoServiceType = {
    zoho_crm: 'zoho_crm',
    zoho_creator: 'zoho_creator',
}

export const ServiceProvidersConfig = {
    [ZohoServiceType.zoho_crm]: ZohoCrmServiceProvider,
    [ZohoServiceType.zoho_creator]: ZohoCreatorServiceProvider,
}
