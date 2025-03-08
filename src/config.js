export const CACHE_TTL = 1000 * 60 * 60 * 24 // 1 day

export const ServiceProviderType = {
    zoho_crm: {
        name: 'zoho_crm',
        title: 'Zoho CRM',
    },
    zoho_creator: {
        name: 'zoho_creator',
        title: 'Zoho Creator',
    },
}

export const FunctionType = {
    button: 'button',
    standalone: 'standalone',
    dynamic: 'dynamic',
    automation: 'automation',
    scheduler: 'scheduler',
    unknown: 'unknown',
    //salessignals',
    // relatedlist,
    // validation,
    // validation_rule
}

export const FunctionTypeMeta = {
    [FunctionType.button]: {
        icon: 'mdi:button-pointer',
        color: '#5681ff',
    },
    [FunctionType.standalone]: {
        icon: 'ph:code-fill',
        color: '#3ea944',
    },
    [FunctionType.dynamic]: {
        icon: 'material-symbols:extension',
        color: '#d33bf1',
    },
    [FunctionType.automation]: {
        icon: 'mdi:workflow',
        color: '#5681ff',
    },
    [FunctionType.scheduler]: {
        icon: 'mingcute:time-fill',
        color: '#f6a800',
    },
    [FunctionType.unknown]: {
        icon: 'f7:question',
        color: '#919191',
    },
}
