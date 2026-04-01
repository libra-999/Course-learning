export interface RoleQueryParam {
    keyword?: string,
    status: number | undefined
}
export interface RoleItem{
    id: string,
    code: string,
    name: string,
    createdAt: Date,
    createdBy: string
}
export interface QueryParams{
    page: number,
    size: number,
    sort: string
}

export interface PermissionItem {
    id: string,
    name: string,
    module: string
}
export interface RolePermissionItem {
    role: RoleItem,
    permissions: PermissionItem[]
}