export interface RoleQueryParam {
    keyword?: string,
    status: number | undefined
}

export interface RoleItem{
    id: string,
    code: string,
    name: string,
    status: number,
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
    module: string,
}

export interface PermissionTree {
    id: string,
    name: string,
    module?: string,
    children?: PermissionTree[]
}

export interface RolePermissionItem {
    role: RoleItem,
    permissions: PermissionItem[]
}

export interface RoleReq {
    code: string,
    name: string,
    createdBy?: string
}

export interface RoleUpdateReq {
    roleId: string,
    name: string,
    status: number
}
