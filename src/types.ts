export type Maybe<T> = T | null | undefined

export const CRM_DOMAINS = [
    'crm.zoho.com.au',
    'crm.zoho.eu',
    'crm.zoho.in',
    'crm.zoho.com',
    'crm.zoho.com.cn',
    'crm.zoho.jp',
    'crmsandbox.zoho.com.au',
    'crmsandbox.zoho.eu',
    'crmsandbox.zoho.in',
    'crmsandbox.zoho.com.cn',
    'crmsandbox.zoho.jp',
]

export enum FunctionCategory {
    button = 'button',
    standalone = 'standalone',
    dynamic = 'dynamic',
    automation = 'automation',
    crmfundamentals = 'crmfundamentals',
    scheduler = 'scheduler',
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
