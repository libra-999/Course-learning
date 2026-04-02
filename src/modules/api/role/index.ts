import apiRequest from "@/app/utils/request";

export async function rolePage(page?: number,size?: number ,sort?: string , keyword?: string, status?: number): Promise<any>{
    return await apiRequest.get("api/roles", {
       params: {
        page: page,
        size: size,
        query: keyword,
        sort: sort,
        status: status
       }
    })
}
export async function permissionList(): Promise<any>{
    const permissions = await apiRequest.get("api/permissions",{
        params: {
            page: 1,
            size: 10000,
            query: '',
            sort: 'desc',
        }
    })
    return permissions.data
}
export async function rolePermission(id: string): Promise<any>{
    const rolePermission = await apiRequest.get(`api/roles/assign/${id}`)
    return rolePermission.data
}