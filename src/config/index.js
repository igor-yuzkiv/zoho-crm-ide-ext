export const CACHE_TTL = 1000 * 60 * 60 * 24 // 1 day

export const ServiceProviderType = {
    zoho_crm: {
        name: 'zoho_crm',
        title: 'Zoho CRM',
    },
    zoho_finance: {
        name: 'zoho_finance', // books, inventory
        title: 'Zoho Finance',
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
        name: 'button',
        title: 'Button',
    },
    [FunctionType.standalone]: {
        icon: 'ph:code-fill',
        color: '#3ea944',
        name: 'standalone',
        title: 'Standalone',
    },
    [FunctionType.dynamic]: {
        icon: 'material-symbols:extension',
        color: '#d33bf1',
        name: 'dynamic',
        title: 'Dynamic',
    },
    [FunctionType.automation]: {
        icon: 'mdi:workflow',
        color: '#5681ff',
        name: 'automation',
        title: 'Automation',
    },
    [FunctionType.scheduler]: {
        icon: 'mingcute:time-fill',
        color: '#f6a800',
        name: 'scheduler',
        title: 'Scheduler',
    },
    [FunctionType.unknown]: {
        icon: 'f7:question',
        color: '#919191',
        name: 'unknown',
        title: 'Unknown',
    },
}
