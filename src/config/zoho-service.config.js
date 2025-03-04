export const ZohoService = {
    crm: 'zoho_crm',
    creator: 'zoho_creator',
}

export const ZohoServiceConfig = {
    [ZohoService.crm]: {
        display: 'Zoho CRM',
        service: ZohoService.crm,
        resolve: (tab) => {
            if (!tab?.url) {
                return
            }

            const match = tab.url.match(/^(https:\/\/crm\.zoho\.[a-z]{2,})\/crm\/org(\d+)\//)
            if (!match || match?.length !== 3) {
                return
            }

            const [, host, org_id] = match

            return {
                host,
                org_id,
            }
        },
    },
    [ZohoService.creator]: {
        display: 'Zoho Creator',
        service: ZohoService.creator,
        resolve: (tab) => {
            if (!tab?.url) {
                return
            }

            const match = tab.url.match(/^(https:\/\/creatorapp\.zoho\.com)\/([^\/]+)\/([^\/]+)\//)
            if (!match || match?.length !== 4) {
                return
            }

            const [, host, owner_name, application_name] = match

            return {
                host,
                owner_name,
                application_name,
            }
        },
    },
}
