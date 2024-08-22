export enum FunctionCategory {
    button = 'button',
    standalone = 'standalone',
    dynamic = 'dynamic',
    automation = 'automation',
    crmfundamentals = 'crmfundamentals',
    scheduler = 'scheduler',
}

export const FunctionAppearances = {
    [FunctionCategory.button]: {
        icon: 'mdi:button-pointer',
        class: 'text-blue-500',
    },
    [FunctionCategory.automation]: {
        icon: 'mdi:workflow',
        class: 'text-green-500',
    },
    [FunctionCategory.scheduler]: {
        icon: 'mingcute:time-fill',

        class: 'text-yellow-500',
    },
    [FunctionCategory.standalone]: {
        icon: 'ph:code-fill',
        class: 'text-red-500',
    },
    [FunctionCategory.crmfundamentals]: {
        icon: 'f7:question',
        class: 'text-red-500',
    },
    [FunctionCategory.dynamic]: {
        icon: 'f7:question',
        class: 'text-red-500',
    },
    default: {
        icon: 'mdi:file-code',
        class: 'text-gray-500',
    },
}

export type CrmFunctionWorkflow = {
    name: string
    namespace: string
    params: any[]
    returnTypes: string
}

export type CrmFunction = {
    id: string
    display_name: string
    description: string
    category: FunctionCategory
    language: string
    updatedTime: number
    workflow: CrmFunctionWorkflow
    selected: boolean
    script?: string
}
