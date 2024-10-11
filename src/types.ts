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

export type CrmFunctionAssociatedPlace = {
    id: string
    _type: string
    module: string
    name: string
}

export type CrmFunctionParam = {
    name: string
    type: string
}

export type CrmFunction = {
    id: string
    api_name: string
    display_name: string
    name: string
    nameSpace: string
    description: string
    category: FunctionCategory
    source: string
    language: string
    workflow: CrmFunctionWorkflow
    modified_on: string
    modified_by: string
    updatedTime: string
    selected: boolean
    script?: string
    associated_place?: CrmFunctionAssociatedPlace[]
    params: CrmFunctionParam[]
}
