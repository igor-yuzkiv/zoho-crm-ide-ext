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
    category: string
    language: string
    updatedTime: number
    workflow: CrmFunctionWorkflow
    selected: boolean
    script?: string
}
